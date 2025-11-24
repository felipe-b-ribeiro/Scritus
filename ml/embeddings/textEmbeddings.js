// Importa o TensorFlow.js e o Universal Sentence Encoder
const tf = require('@tensorflow/tfjs-node');
const use = require('@tensorflow-models/universal-sentence-encoder');

/**
 * Carrega o modelo de embeddings do TensorFlow.js
 * Modelo pré-treinado que transforma textos em vetores numéricos
 * @returns {Promise<use.UniversalSentenceEncoder>} modelo carregado
 */
async function loadModel() {
    const model = await use.load();
    return model;
}

/**
 * Gera embeddings para um array de textos
 * @param {use.UniversalSentenceEncoder} model - modelo carregado
 * @param {string[]} texts - array de textos
 * @returns {Promise<tf.Tensor>} tensor de embeddings
 */
async function getEmbeddings(model, texts) {
    // model.embed transforma cada texto em um vetor de números (512 dimensões)
    const embeddings = await model.embed(texts);
    return embeddings;
}

/**
 * Função utilitária para converter tensor de embeddings para array
 * @param {tf.Tensor} embeddingsTensor - tensor retornado pelo model.embed
 * @returns {Promise<number[][]>} array de arrays de números
 */
async function tensorToArray(embeddingsTensor) {
    const array = await embeddingsTensor.array();
    return array;
}

/**
 * Função principal para gerar embeddings de textos
 * Combina todas as etapas: carregar modelo, gerar embeddings e converter para array
 * @param {string[]} texts - array de textos
 * @returns {Promise<number[][]>} embeddings como array de arrays
 */
async function generateTextEmbeddings(texts) {
    const model = await loadModel();
    const embeddingsTensor = await getEmbeddings(model, texts);
    const embeddingsArray = await tensorToArray(embeddingsTensor);
    return embeddingsArray;
}

// Exporta as funções para usar em outros módulos
exports = {
    loadModel,
    getEmbeddings,
    tensorToArray,
    generateTextEmbeddings
};
