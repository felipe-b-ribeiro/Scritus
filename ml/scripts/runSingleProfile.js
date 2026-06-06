import { recommendForProfile } from "../src/services/recommendationEngine.js";
import { logger } from "../src/utils/logger.js";

export async function gerarRecomendacao(id_perfil, num_recomendacoes) {
  const profileId = id_perfil;
  const numRecommendations = num_recomendacoes;
  try {
    logger.info(`Gerando recomendações para o perfil ${profileId}...`);
    const recommendations = await recommendForProfile(
      profileId,
      numRecommendations,
    );
    console.log("Recomendações:", recommendations);
  } catch (err) {
    console.error("Erro ao gerar recomendações:", err);
  }
}
