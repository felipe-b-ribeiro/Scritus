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

/**
 * Calcula similaridade do cosseno entre dois perfis
 * @param {Object} a - objeto { idObra: peso }
 * @param {Object} b - objeto { idObra: peso }
 * @returns {Number} similaridade (0 a 1)
 */
function cosineSimilarity(a, b) {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  const allKeys = new Set([...Object.keys(a), ...Object.keys(b)]);
  allKeys.forEach(key => {
    const valA = a[key] || 0;
    const valB = b[key] || 0;
    dot += valA * valB;
    normA += valA ** 2;
    normB += valB ** 2;
  });
  return (normA && normB) ? dot / (Math.sqrt(normA) * Math.sqrt(normB)) : 0;
}

/**
 * Gera recomendações para um perfil específico
 * @param {number} profileId
 * @param {number} topN
 * @param {Object} customWeights
 */
export async function recommendForProfile(profileId, topN = DEFAULT_RECOMMENDATIONS, customWeights = {}) {
  const weights = {
    curtida: customWeights.curtida ?? WEIGHT_CURTIDA,
    salvo: customWeights.salvo ?? WEIGHT_SALVO,
    clique: customWeights.clique ?? WEIGHT_CLIQUE,
    comentario: customWeights.comentario ?? WEIGHT_COMENTARIO,
    seguido: customWeights.seguido ?? FOLLOWED_AUTHOR_BONUS
  };

  logger.info(`Iniciando recomendações para perfil ${profileId}`);

  // 1️⃣ Buscar interações e obras públicas
  const interactions = await interactionRepository.getAllInteractions();
  const works = await workRepository.getAllWorks();

  // 2️⃣ Construir matriz perfil -> obras com pesos
  const profileMatrix = {};
  interactions.forEach(inter => {
    const profile = inter.id_perfil;
    const work = inter.id_obra;
    if (!profileMatrix[profile]) profileMatrix[profile] = {};

    // Converter tipo de interação para peso
    const typeWeights = {
      curtida: weights.curtida,
      salvo: weights.salvo,
      clique: weights.clique,
      comentario: weights.comentario
    };
    const score = typeWeights[inter.tipo] || 0;

    // Somar caso já exista alguma interação sobre a mesma obra
    profileMatrix[profile][work] = (profileMatrix[profile][work] || 0) + score;
  });

  // 3️⃣ Calcular similaridade com outros perfis
  const targetProfile = profileMatrix[profileId] || {};
  const similarities = Object.entries(profileMatrix)
    .filter(([otherId]) => Number(otherId) !== Number(profileId))
    .map(([otherId, otherWorks]) => ({
      profileId: Number(otherId),
      similarity: cosineSimilarity(targetProfile, otherWorks)
    }))
    .sort((a, b) => b.similarity - a.similarity);

  const neighbors = similarities.slice(0, K_NEIGHBORS);

  // 4️⃣ Calcular scores finais de recomendação
  const recommendationScores = {};
  neighbors.forEach(neighbor => {
    const neighborWorks = profileMatrix[neighbor.profileId];
    for (const [workId, score] of Object.entries(neighborWorks)) {
      if (targetProfile[workId]) continue; // já consumido
      recommendationScores[workId] = (recommendationScores[workId] || 0) + score * neighbor.similarity;
    }
  });

  // 5️⃣ Ordenar por peso e limitar topN
  const recommendations = Object.entries(recommendationScores)
    .map(([id_obra, peso]) => ({ id_obra: Number(id_obra), peso }))
    .sort((a, b) => b.peso - a.peso)
    .slice(0, topN);

  // 6️⃣ Salvar recomendações no banco
  await recommendationRepository.saveRecommendations(profileId, recommendations, { version: 'v1.0' });

  logger.info(`✅ ${recommendations.length} recomendações geradas para perfil ${profileId}`);
  return recommendations;
}

/**
 * Gera recomendações para todos os perfis
 */
export async function recommendForAllProfiles() {
  const interactions = await interactionRepository.getAllInteractions();
  const profileIds = [...new Set(interactions.map(i => i.id_perfil))];

  for (const profileId of profileIds) {
    await recommendForProfile(profileId);
  }

  logger.info(`Recomendações geradas para todos os perfis (${profileIds.length})`);
}
