/**
 * Normaliza valores para escala 0-1
 * @param {Array} values
 * @returns {Array}
 */
function normalize(values) {
  const max = Math.max(...values);
  if (max === 0) return values.map(() => 0);
  return values.map((v) => v / max);
}

/**
 * @param {Array} items
 * @returns {Map}
 */
function createIndexMap(items) {
  return new Map(items.map((item, idx) => [item, idx]));
}

export { createIndexMap, normalize };
