import { getPool, closePool } from '../src/database/connection.js';

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
      console.log(` Executando migração ${i + 1}/${migrations.length}...`);
      await pool.query(migrations[i]);
      console.log(` Migração ${i + 1} concluída\n`);
    }
    
    console.log('Todas as migrações foram executadas com sucesso!');
    console.log('Estrutura do banco de dados está atualizada\n');
    
  } catch (error) {
    console.error('\n Erro ao executar migrações:\n');
    console.error(error.message);
    process.exit(1);
  } finally {
    await closePool();
  }
}

runMigrations();