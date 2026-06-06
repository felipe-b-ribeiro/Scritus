import { closePool } from "../src/database/connection.js";
import { recommendForAllProfiles } from "../src/services/recommendationEngine;js";
import logger from "../src/utils/logger.js";

async function run() {
  const numRecommendations = parseInt(process.argv[2], 10) || 10;

  console.log("Iniciando processamento em BATCH...\n");
  console.log(`Número de recomendações por perfil: ${numRecommendations}`);
  console.log("ATENÇÃO: Este processo pode demorar vários minutos!\n");

  const readline = require("node:readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readline.question("Deseja continuar? (s/n): ", async (answer) => {
    readline.close();

    if (answer.toLowerCase() !== "s" && answer.toLowerCase() !== "sim") {
      console.log("Operação cancelada pelo usuário.");
      process.exit(0);
    }

    try {
      const startTime = Date.now();

      await recommendForAllProfiles(numRecommendations);

      const duration = ((Date.now() - startTime) / 1000).toFixed(2);

      console.log("\n Processamento em batch concluído com sucesso!");
      console.log(`⏱️  Tempo total: ${duration}s`);
      console.log("💾 Todas as recomendações foram salvas no banco de dados\n");
    } catch (error) {
      console.error("\n Erro no processamento batch:\n");
      console.error(error.message);
      logger.error("Erro no script runBatch", error);
      process.exit(1);
    } finally {
      await closePool();
    }
  });
}

run();
