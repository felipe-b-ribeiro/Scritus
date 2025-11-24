import * as interactionRepository from '../database/repositories/interactionRepository.js';
import * as workRepository from '../database/repositories/workRepository.js';
import * as recommendationRepository from '../database/repositories/recommendationRepository.js';


import { logger } from '../utils/logger.js';

import {
  K_NEIGHBORS,
  DEFAULT_RECOMMENDATIONS,
  WEIGHT_CURTIDA,
  WEIGHT_SALVO,
  WEIGHT_CLIQUE,
  WEIGHT_COMENTARIO,
  FOLLOWED_AUTHOR_BONUS
} from '../config/algorithm.js';

/* -----------------------------------------------------
   🔒 OBRAS BLOQUEADAS
   (já consumidas + recomendadas nos últimos 7 dias)
----------------------------------------------------- */
async function getBlockedWorkIds(profileId) {
  const pastInteractions = await interactionRepository.getInteractionsByProfile(profileId);
  const recentRecommendations = await recommendationRepository.getRecentRecommendations(profileId);

  const blocked = new Set();

  pastInteractions.forEach(i => blocked.add(i.id_obra));
  recentRecommendations.forEach(r => blocked.add(r));

  return blocked;
}

/* -----------------------------------------------------
   📐 SIMILARIDADE COSENO
----------------------------------------------------- */
function cosineSimilarity(a, b) {
  let dot = 0, normA = 0, normB = 0;

  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const key of keys) {
    const x = a[key] || 0;
    const y = b[key] || 0;

    dot += x * y;
    normA += x * x;
    normB += y * y;
  }

  return (normA && normB) ? dot / (Math.sqrt(normA) * Math.sqrt(normB)) : 0;
}

/* -----------------------------------------------------
   🎲 EMBARALHAMENTO REAL
----------------------------------------------------- */
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* -----------------------------------------------------
   🆘 FALLBACK (sem recomendar vistos)
----------------------------------------------------- */
async function fallbackRandomRecommendations(profileId, topN) {
  logger.warn(`⚠️ Fallback ativado para o perfil ${profileId}.`);

  const allWorks = await workRepository.getAllWorks();
  const blocked = await getBlockedWorkIds(profileId);

  let eligible = allWorks.filter(w => !blocked.has(w.id_obra));

  if (eligible.length < topN) {
    logger.warn(`⚠️ Poucas obras elegíveis. Expandindo pool.`);
    eligible = allWorks;
  }

  const shuffled = shuffle(eligible);

  const selected = shuffled.slice(0, topN).map(w => ({
    id_obra: w.id_obra,
    peso: Math.random()
  }));

  await recommendationRepository.saveRecommendations(profileId, selected, {
    version: 'fallback-v1.2'
  });

  return selected;
}

/* -----------------------------------------------------
   🔥 RECOMENDAÇÕES POR SIMILARIDADE
----------------------------------------------------- */
export async function recommendForProfile(profileId, topN = DEFAULT_RECOMMENDATIONS, customWeights = {}) {
  logger.info(`Iniciando recomendações para o perfil ${profileId}`);

  const weights = {
    curtida: customWeights.curtida ?? WEIGHT_CURTIDA,
    salvo: customWeights.salvo ?? WEIGHT_SALVO,
    clique: customWeights.clique ?? WEIGHT_CLIQUE,
    comentario: customWeights.comentario ?? WEIGHT_COMENTARIO,
    seguido: customWeights.seguido ?? FOLLOWED_AUTHOR_BONUS
  };

  const interactions = await interactionRepository.getAllInteractions();
  const works = await workRepository.getAllWorks();

  if (interactions.length === 0) {
    return fallbackRandomRecommendations(profileId, topN);
  }

  const blocked = await getBlockedWorkIds(profileId);
  const eligibleWorks = works.filter(w => !blocked.has(w.id_obra));

  if (eligibleWorks.length === 0) {
    logger.warn(`⚠️ Sem obras elegíveis para perfil ${profileId}. Fallback.`);
    return fallbackRandomRecommendations(profileId, topN);
  }

  // === MATRIZ PERFIL-OBRA ===
  const profileMatrix = {};

  for (const inter of interactions) {
    if (!profileMatrix[inter.id_perfil]) {
      profileMatrix[inter.id_perfil] = {};
    }

    const weightMap = {
      curtida: weights.curtida,
      salvo: weights.salvo,
      clique: weights.clique,
      comentario: weights.comentario
    };

    const value = weightMap[inter.tipo] || 0;
    profileMatrix[inter.id_perfil][inter.id_obra] =
      (profileMatrix[inter.id_perfil][inter.id_obra] || 0) + value;
  }

  // === SIMILARIDADES ===
  const targetVector = profileMatrix[profileId] || {};

  const similarities = Object.entries(profileMatrix)
    .filter(([id]) => Number(id) !== Number(profileId))
    .map(([id, vector]) => ({
      profileId: Number(id),
      similarity: cosineSimilarity(targetVector, vector)
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, K_NEIGHBORS);

  // === SCORE DOS VIZINHOS ===
  const scores = {};

  for (const neighbor of similarities) {
    const neighborVector = profileMatrix[neighbor.profileId];

    for (const [workId, val] of Object.entries(neighborVector)) {
      if (!blocked.has(Number(workId))) {
        scores[workId] = (scores[workId] || 0) + val * neighbor.similarity;
      }
    }
  }

  let recommendations = Object.entries(scores)
    .map(([id_obra, peso]) => ({ id_obra: Number(id_obra), peso }))
    .sort((a, b) => b.peso - a.peso)
    .slice(0, topN);

  if (recommendations.length === 0) {
    return fallbackRandomRecommendations(profileId, topN);
  }

  await recommendationRepository.saveRecommendations(profileId, recommendations, {
    version: 'v1.1'
  });

  return recommendations;
}

/* -----------------------------------------------------
   🌍 RECOMENDAR PARA TODOS OS PERFIS
----------------------------------------------------- */
export async function recommendForAllProfiles(topN = DEFAULT_RECOMMENDATIONS) {
  logger.info("🌍 Iniciando recomendações globais...");

  const profiles = await interactionRepository.getAllProfiles();

  if (!profiles.length) {
    logger.warn("⚠️ Nenhum perfil encontrado.");
    return;
  }

  for (const { id_perfil } of profiles) {
    logger.info(`➡️ Gerando recomendações para o perfil ${id_perfil}`);
    await recommendForProfile(id_perfil, topN);
  }

  logger.info("✅ Recomendações globais concluídas.");
}
