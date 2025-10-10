const tf = require('@tensorflow/tfjs-node');

// Função para criar o modelo de filtragem colaborativa
function buildModel(numFeatures) {
  
  const model = tf.sequential();

  // Primeira camada densa
  model.add(tf.layers.dense({
    inputShape: [numFeatures], // cada exemplo tem 'numFeatures' entradas
    units: 64,                 // número de neurônios na camada
    activation: 'relu'         // função de ativação ReLU
  }));

  // Segunda camada densa
  model.add(tf.layers.dense({
    units: 32,                 // menos neurônios que a primeira camada
    activation: 'relu'
  }));

  // Camada de saída
  model.add(tf.layers.dense({
    units: 1,                  // saída única: peso de interação previsto
    activation: 'linear'       // linear porque queremos regressão contínua
  }));

  // Compila o modelo definindo otimizador e função de perda
  model.compile({
    optimizer: tf.train.adam(),        // algoritmo Adam para otimização
    loss: 'meanSquaredError',           // função de perda para regressão
    metrics: ['mse']                    // métrica de avaliação
  });

  return model;
}

// Função para treinar o modelo
async function trainModel(model, X_train, y_train, epochs = 50, batchSize = 32) {
  /*
    model: modelo criado por buildModel
    X_train: Tensor 2D das features
    y_train: Tensor 1D ou 2D com o target (peso de interação)
    epochs: número de vezes que passamos por todo o dataset
    batchSize: número de exemplos por batch
  */
  const history = await model.fit(X_train, y_train, {
    epochs,
    batchSize,
    shuffle: true,      // embaralha os dados a cada época
    validationSplit: 0.2 // usa 20% dos dados para validação
  });

  return history;
}

// Função para fazer previsões
function predict(model, X_input) {
  // X_input: tensor 2D com os exemplos que queremos prever
  return model.predict(X_input);
}

// Exporta as funções para uso em outros arquivos
module.exports = {
  buildModel,
  trainModel,
  predict
};
