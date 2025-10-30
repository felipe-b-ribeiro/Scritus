import { recommendForProfile } from '../src/services/recommendationEngine.js';
import { logger } from '../src/utils/logger.js';

async function main() {
    const args = process.argv.slice(2);
    if (args.length < 1) {
        console.log("Uso: node runSingleProfile.js <id_perfil> [num_recomendacoes]");
        process.exit(1);
    }

    const profileId = parseInt(args[0]);
    const numRecommendations = args[1] ? parseInt(args[1]) : undefined;

    try {
        logger.info(`Gerando recomendações para o perfil ${profileId}...`);
        const recommendations = await recommendForProfile(profileId, numRecommendations);
        console.log('Recomendações:', recommendations);
    } catch (err) {
        console.error('Erro ao gerar recomendações:', err);
    } finally {
        process.exit(0);
    }
}

main();
