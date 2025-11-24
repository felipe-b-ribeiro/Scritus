const tf = require('@tensorflow/tfjs-node');
const { calculateCosineSimilarity, findKNeighbors } = require('../../src/services/similarityCalculator');

describe('SimilarityCalculator', () => {
  afterEach(() => {
    // Limpar memória de tensores
    tf.disposeVariables();
  });
  
  test('deve calcular similaridade de cosseno', async () => {
    const matrix = [
      [1, 0, 1],
      [1, 1, 0],
      [0, 1, 1],
    ];
    
    const similarity = calculateCosineSimilarity(matrix);
    const result = await similarity.array();
    
    // Diagonal deve ser ~1 (perfil consigo mesmo)
    expect(result[0][0]).toBeCloseTo(1, 5);
    expect(result[1][1]).toBeCloseTo(1, 5);
    
    // Similaridade entre perfis diferentes deve estar entre 0 e 1
    expect(result[0][1]).toBeGreaterThanOrEqual(0);
    expect(result[0][1]).toBeLessThanOrEqual(1);
    
    similarity.dispose();
  });
  
  test('deve encontrar K vizinhos mais próximos', async () => {
    const matrix = [
      [1, 1, 1],
      [1, 1, 0],
      [1, 0, 1],
    ];
    
    const similarity = calculateCosineSimilarity(matrix);
    const neighbors = await findKNeighbors(similarity, 2);
    
    // Deve retornar array com 3 perfis
    expect(neighbors.length).toBe(3);
    
    // Cada perfil deve ter até 2 vizinhos
    neighbors.forEach(n => {
      expect(n.neighbors.length).toBeLessThanOrEqual(2);
    });
    
    // Vizinhos devem estar ordenados por similaridade (maior primeiro)
    const firstProfileNeighbors = neighbors[0].neighbors;
    if (firstProfileNeighbors.length > 1) {
      expect(firstProfileNeighbors[0].sim).toBeGreaterThanOrEqual(firstProfileNeighbors[1].sim);
    }
    
    similarity.dispose();
  });
  
  test('não deve incluir o próprio perfil como vizinho', async () => {
    const matrix = [
      [1, 1],
      [1, 0],
    ];
    
    const similarity = calculateCosineSimilarity(matrix);
    const neighbors = await findKNeighbors(similarity, 1);
    
    // Perfil 0 não deve ter ele mesmo como vizinho
    const profile0Neighbors = neighbors[0].neighbors;
    expect(profile0Neighbors.every(n => n.idx !== 0)).toBe(true);
    
    similarity.dispose();
  });
});
