// ================================
// Pesos para cada tipo de interação
// ================================
const INTERACTION_WEIGHTS = {
  curtida: 1,        // Uma curtida simples
  salvo: 2,          // Salvar indica interesse forte
  clique: 0.5,       // Apenas visualização
  comentario: 1      // Comentário vale mais se for maior, ponderar depois
};

// ================================
// Hiperparâmetros do modelo
// ================================
const MODEL_PARAMS = {
  collaborative: {
    inputUnits: 64,      // Neurônios na primeira camada
    hiddenUnits: 32,     // Neurônios na segunda camada
    outputUnits: 1,      // Score previsto
    learningRate: 0.001,
    epochs: 50,
    batchSize: 32
  },
  hybrid: {
    inputUnits: 128,     // Para futuro modelo híbrido
    hiddenUnits: 64,
    outputUnits: 1,
    learningRate: 0.001,
    epochs: 100,
    batchSize: 32
  }
};

// ================================
// Configurações gerais
// ================================
const TOP_N_RECOMMENDATIONS = 10; // Quantas obras retornar por usuário

// ================================
// Exportações
// ================================
export { INTERACTION_WEIGHTS, MODEL_PARAMS, TOP_N_RECOMMENDATIONS };
