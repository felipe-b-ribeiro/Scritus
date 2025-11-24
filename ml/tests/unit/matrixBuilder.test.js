// ==================== src/index.js ====================
const { recommendForProfile, recommendForAllProfiles } = require('./services/recommendationEngine');
const { closePool } = require('./database/connection');
const logger = require('./utils/logger');

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

// ==================== scripts/runSingleProfile.js ====================
/**
 * Script para gerar recomendações para um perfil específico
 * 
 * Uso: node scripts/runSingleProfile.js <id_perfil> [num_recomendacoes]
 * 
 * Exemplo:
 *   node scripts/runSingleProfile.js 123 15
 */

const { recommendForProfile } = require('../src/services/recommendationEngine');
const { closePool } = require('../../src/database/connection');
const logger = require('../src/utils/logger');

async function run() {
  const profileId = parseInt(process.argv[2]);
  const numRecommendations = parseInt(process.argv[3]) || 10;
  
  if (!profileId || isNaN(profileId)) {
    console.error('❌ Erro: ID do perfil é obrigatório e deve ser um número válido');
    console.error('');
    console.error('Uso: node scripts/runSingleProfile.js <id_perfil> [num_recomendacoes]');
    console.error('');
    console.error('Exemplo:');
    console.error('  node scripts/runSingleProfile.js 123 15');
    process.exit(1);
  }
  
  try {
    console.log('🚀 Iniciando geração de recomendações...\n');
    console.log(`📊 Perfil: ${profileId}`);
    console.log(`🎯 Número de recomendações: ${numRecommendations}\n`);
    
    const startTime = Date.now();
    const recommendations = await recommendForProfile(profileId, numRecommendations);
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    if (recommendations.length === 0) {
      console.log('⚠️  Nenhuma recomendação foi gerada para este perfil.');
      console.log('   Possíveis razões:');
      console.log('   - Perfil não tem interações registradas');
      console.log('   - Não há perfis similares no sistema');
      console.log('   - Todas as obras já foram vistas pelo usuário');
    } else {
      console.log('\n✅ Recomendações geradas com sucesso!\n');
      console.log('═══════════════════════════════════════════════════════════');
      recommendations.forEach((rec, idx) => {
        console.log(`${String(idx + 1).padStart(2, ' ')}. ${rec.titulo}`);
        console.log(`    Peso: ${rec.peso.toFixed(4)} | ID: ${rec.id_obra}`);
        console.log('───────────────────────────────────────────────────────────');
      });
      console.log('═══════════════════════════════════════════════════════════');
      console.log(`\n⏱️  Tempo de execução: ${duration}s`);
      console.log(`💾 ${recommendations.length} recomendações salvas no banco de dados\n`);
    }
    
  } catch (error) {
    console.error('\n❌ Erro ao gerar recomendações:\n');
    console.error(error.message);
    logger.error('Erro no script runSingleProfile', error);
    process.exit(1);
  } finally {
    await closePool();
  }
}

run();

// ==================== scripts/runBatch.js ====================
/**
 * Script para gerar recomendações em batch para todos os perfis
 * 
 * Uso: node scripts/runBatch.js [num_recomendacoes]
 * 
 * Exemplo:
 *   node scripts/runBatch.js 20
 */

const { recommendForAllProfiles } = require('../src/services/recommendationEngine');
const { closePool } = require('../../src/database/connection');
const logger = require('../src/utils/logger');

async function run() {
  const numRecommendations = parseInt(process.argv[2]) || 10;
  
  console.log('🚀 Iniciando processamento em BATCH...\n');
  console.log(`🎯 Número de recomendações por perfil: ${numRecommendations}`);
  console.log('⚠️  ATENÇÃO: Este processo pode demorar vários minutos!\n');
  
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  readline.question('Deseja continuar? (s/n): ', async (answer) => {
    readline.close();
    
    if (answer.toLowerCase() !== 's' && answer.toLowerCase() !== 'sim') {
      console.log('❌ Operação cancelada pelo usuário.');
      process.exit(0);
    }
    
    try {
      const startTime = Date.now();
      
      await recommendForAllProfiles(numRecommendations);
      
      const duration = ((Date.now() - startTime) / 1000).toFixed(2);
      
      console.log('\n✅ Processamento em batch concluído com sucesso!');
      console.log(`⏱️  Tempo total: ${duration}s`);
      console.log('💾 Todas as recomendações foram salvas no banco de dados\n');
      
    } catch (error) {
      console.error('\n❌ Erro no processamento batch:\n');
      console.error(error.message);
      logger.error('Erro no script runBatch', error);
      process.exit(1);
    } finally {
      await closePool();
    }
  });
}

run();

// ==================== scripts/migrate.js ====================
/**
 * Script para criar/atualizar estrutura de tabelas no banco
 * 
 * Uso: node scripts/migrate.js
 */

const { getPool, closePool } = require('../../src/database/connection');

const migrations = [
  // Criar tabela de recomendações se não existir
  `
  CREATE TABLE IF NOT EXISTS recomendacoes_feed (
    id_recomendacao SERIAL PRIMARY KEY,
    id_perfil INTEGER NOT NULL,
    id_obra INTEGER NOT NULL,
    peso DECIMAL(5, 4) NOT NULL,
    algoritmo_versao VARCHAR(20) NOT NULL,
    parametros JSONB,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_perfil FOREIGN KEY (id_perfil) REFERENCES perfis(id_perfil) ON DELETE CASCADE,
    CONSTRAINT fk_obra FOREIGN KEY (id_obra) REFERENCES obras(id_obra) ON DELETE CASCADE,
    CONSTRAINT unique_perfil_obra UNIQUE (id_perfil, id_obra)
  );
  `,
  
  // Criar índices para performance
  `
  CREATE INDEX IF NOT EXISTS idx_recomendacoes_perfil 
  ON recomendacoes_feed(id_perfil);
  `,
  
  `
  CREATE INDEX IF NOT EXISTS idx_recomendacoes_peso 
  ON recomendacoes_feed(id_perfil, peso DESC);
  `,
  
  `
  CREATE INDEX IF NOT EXISTS idx_recomendacoes_versao 
  ON recomendacoes_feed(algoritmo_versao);
  `,
];

async function runMigrations() {
  const pool = getPool();
  
  console.log('🔧 Iniciando migrações do banco de dados...\n');
  
  try {
    for (let i = 0; i < migrations.length; i++) {
      console.log(`📝 Executando migração ${i + 1}/${migrations.length}...`);
      await pool.query(migrations[i]);
      console.log(`✅ Migração ${i + 1} concluída\n`);
    }
    
    console.log('✅ Todas as migrações foram executadas com sucesso!');
    console.log('💾 Estrutura do banco de dados está atualizada\n');
    
  } catch (error) {
    console.error('\n❌ Erro ao executar migrações:\n');
    console.error(error.message);
    process.exit(1);
  } finally {
    await closePool();
  }
}

runMigrations();

// ==================== tests/unit/matrixBuilder.test.js ====================
const { buildInteractionMatrix } = require('../../src/services/matrixBuilder');

describe('MatrixBuilder', () => {
  const mockInteractions = [
    { id_perfil: 1, id_obra: 10, tipo: 'curtida' },
    { id_perfil: 1, id_obra: 10, tipo: 'salvo' },
    { id_perfil: 1, id_obra: 20, tipo: 'clique' },
    { id_perfil: 2, id_obra: 10, tipo: 'comentario' },
    { id_perfil: 2, id_obra: 30, tipo: 'curtida' },
  ];
  
  const mockWeights = {
    curtida: 3,
    salvo: 4,
    clique: 1,
    comentario: 5,
  };
  
  test('deve criar matriz com dimensões corretas', () => {
    const result = buildInteractionMatrix(mockInteractions, mockWeights);
    
    expect(result.matrix.length).toBe(2); // 2 perfis únicos
    expect(result.matrix[0].length).toBe(3); // 3 obras únicas
  });
  
  test('deve calcular pesos corretamente', () => {
    const result = buildInteractionMatrix(mockInteractions, mockWeights);
    
    // Perfil 1, Obra 10: curtida (3) + salvo (4) = 7
    expect(result.matrix[0][0]).toBe(7);
    
    // Perfil 1, Obra 20: clique (1) = 1
    expect(result.matrix[0][1]).toBe(1);
    
    // Perfil 2, Obra 10: comentario (5) = 5
    expect(result.matrix[1][0]).toBe(5);
  });
  
  test('deve retornar IDs ordenados', () => {
    const result = buildInteractionMatrix(mockInteractions, mockWeights);
    
    expect(result.profileIds).toEqual([1, 2]);
    expect(result.workIds).toEqual([10, 20, 30]);
  });
  
  test('deve criar índices corretos', () => {
    const result = buildInteractionMatrix(mockInteractions, mockWeights);
    
    expect(result.profileIndex.get(1)).toBe(0);
    expect(result.profileIndex.get(2)).toBe(1);
    expect(result.workIndex.get(10)).toBe(0);
    expect(result.workIndex.get(30)).toBe(2);
  });
});

