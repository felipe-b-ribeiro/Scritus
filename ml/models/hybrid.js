import * as tf from '@tensorflow/tfjs-Node';
import fs from 'fs';

/**
 * @param {number} numUserFeatures - número de features do usuário (ex: histórico de interações)
 * @param {number} numContentFeatures - número de features da obra (tags, classificação, embeddings)
 * @returns modelo compilado do TensorFlow
 */

export function buildHybridModel(numUserFeatures, numContentFeatures){

    const userInput = tf.input({shape: [numUserFeatures], name: 'user_input'});

    let userDense = tf.layers.dense({units: 32, activation: 'relu'}).apply(userInput);
    userDense = tf.layers.dense({units: 16, activation: 'relu'}).apply(userDense);

    const contentInput = tf.input({shape: [numContentFeatures], name: 'content_input'});

    let contentDense = tf.layers.dense({units: 32, activation: 'relu'}).apply(contentInput);
    contentDense = tf.layers.dense({units: 16, activation: 'relu'}).apply(contentDense);

    const concatenated = tf.layers.concatenate().apply([userDense, contentDense]);

    let output = tf.layers.dense({units: 16, activation: 'relu'}).apply(concatenated);
    output = tf.layers.dense({units: 1, activation: 'linear', name: 'score_output'}).apply(output);

    const model = tf.model({
    inputs: [userInput, contentInput],
    outputs: output,
    name: 'hybrid_recommender'
  });

    model.compile({
    optimizer: tf.train.adam(0.001),
    loss: 'meanSquaredError',
    metrics: ['mse']
  });
  
  return model;
}
/**
 * Função para salvar o modelo
 * @param {tf.LayersModel} model
 * @param {string} path - caminho onde salvar
 */
export async function saveModel(model, path) {
  await model.save(`file://${path}`);
}
/**
 * Função para carregar o modelo
 * @param {string} path - caminho do modelo salvo
 * @returns tf.LayersModel
 */
export async function loadModel(path) {
  return await tf.loadLayersModel(`file:/model/${path}/model.json`);
}