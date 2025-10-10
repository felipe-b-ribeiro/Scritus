import * as tf from '@tensorflow/tfjs-node';
import path from 'path';
import fs from 'fs';

/**
 * Salva um modelo TensorFlow.js no caminho especificado.
 * @param {tf.LayersModel} model - Modelo treinado a ser salvo
 * @param {string} modelName - Nome da pasta do modelo
 */
export async function saveModel(model, modelName) {
  const savePath = path.resolve(`./ml/models/saved/${modelName}`);
    
  // Cria a pasta se não existir
  if (!fs.existsSync(savePath)) {
    fs.mkdirSync(savePath, { recursive: true });
  }
  
  // Salva o modelo no formato TensorFlow.js
  await model.save(`file://${savePath}`);
  console.log(`Modelo salvo em: ${savePath}`);
}

/**
 * Carrega um modelo TensorFlow.js do caminho especificado.
 * @param {string} modelName - Nome da pasta do modelo
 * @returns {tf.LayersModel} - Modelo carregado
 */
export async function loadModel(modelName) {
  const loadPath = path.resolve(`./ml/models/saved/${modelName}/model.json`);
  
  // Verifica se o arquivo existe
  if (!fs.existsSync(loadPath)) {
    throw new Error(`Modelo não encontrado em: ${loadPath}`);
  }
  
  // Carrega o modelo
  const model = await tf.loadLayersModel(`file://${loadPath}`);
  console.log(`Modelo carregado de: ${loadPath}`);
  return model;
}