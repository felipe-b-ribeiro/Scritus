import { recommendForProfile, recommendForAllProfiles } from './services/recommendationEngine';
import { closePool } from './database/connection';
import logger from './utils/logger';

async function main() {
  try {
    // Exemplo de uso: node src/index.js <id_perfil> <num_recomendacoes>
    const profileId = parseInt(process.argv[2]);
    const numRecommendations = parseInt(process.argv[3]) || 10;
    
    if (!profileId) {
      logger.error('Uso: node src/index.js <id_perfil> [num_recomendacoes]');
      process.exit(1);
    }
    
    logger.info(`Gerando ${numRecommendations} recomendações para perfil ${profileId}...`);
    
    const recommendations = await recommendForProfile(profileId, numRecommendations);
    
    console.log('\n========== RECOMENDAÇÕES ==========');
    recommendations.forEach((rec, idx) => {
      console.log(`${idx + 1}. ${rec.titulo} (peso: ${rec.peso.toFixed(4)})`);
    });
    console.log('===================================\n');
    
  } catch (error) {
    logger.error('Erro na execução', error);
    process.exit(1);
  } finally {
    await closePool();
  }
}

// Executar se for chamado diretamente
if (require.main === module) {
  main();
}

module.exports = {
  recommendForProfile,
  recommendForAllProfiles,
};