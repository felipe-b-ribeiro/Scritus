// src/index.js
console.log("Iniciando index.js...");

console.log("Importando recommendationEngine...");
import { recommendForProfile, recommendForAllProfiles } from './services/recommendationEngine.js';
console.log("recommendationEngine importado!");

console.log("Importando logger...");
import { logger } from './utils/logger.js';
console.log("logger importado!");

console.log("Importando conexão...");
import { closePool } from './database/connection.js';

async function main() {
  try {
    const command = process.argv[2]; 
    const numRecommendations = parseInt(process.argv[3]) || 10;

    
    if (command === "all") {
      logger.info(`Gerando recomendações para todos os perfis...`);
      await recommendForAllProfiles(numRecommendations);
      logger.info("Recomendações para todos os perfis concluídas!");
    } 
    else {
      const profileId = parseInt(command);
      if (!profileId) {
        logger.error('Uso: node src/index.js <id_perfil> [num_recomendacoes] OU node src/index.js all');
        process.exit(1);
      }

      logger.info(`Gerando ${numRecommendations} recomendações para o perfil ${profileId}...`);

      const recommendations = await recommendForProfile(profileId, numRecommendations);

      console.log('\n========== RECOMENDAÇÕES ==========');
      recommendations.forEach((rec, idx) => {
        const titulo = rec.titulo || `Obra #${rec.id_obra}`;
        console.log(`${idx + 1}. ${titulo} (peso: ${rec.peso.toFixed(4)})`);
      });
      console.log('===================================\n');
    }
  } catch (error) {
    logger.error('Erro na execução', error);
    process.exit(1);
  } finally {
    await closePool();
  }
}

main();

export { recommendForProfile, recommendForAllProfiles };
