// trainCollaborative.js

import tf from '@tensorflow/tfjs-node';
import { extractInteractions, extractObras } from '../data/extract.js';
import { preprocessData } from '../data/preprocess.js';
import { buildModel, saveModel } from '../models/collaborative.js';
import { BATCH_SIZE, EPOCHS } from '../constants.js';

async function main() {
  try {
    // 1. Extrair dados do banco
    const interacoes = await extractInteractions(); // retorna array de interações
    const obras = await extractObras();            // retorna array de obras

    // 2. Pré-processar dados para criar X (features) e y (target)
    const { X, y } = preprocessData(interacoes, obras);

    // 3. Criar modelo
    const model = buildModel(X.shape[1]); // número de features

    // 4. Treinar modelo
    await model.fit(X, y, {
      epochs: EPOCHS,
      batchSize: BATCH_SIZE,
      shuffle: true,
      validationSplit: 0.1, // separa 10% para validação
      callbacks: tf.callbacks.earlyStopping({ monitor: 'val_loss', patience: 5 })
    });

    // 5. Salvar modelo treinado
    await saveModel(model, './models/collaborative-model');

    console.log('Treinamento concluído e modelo salvo!');
  } catch (err) {
    console.error('Erro no treino:', err);
  }
}

main();
