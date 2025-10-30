import 'dotenv';

export const K_NEIGHBORS = parseInt(process.env.K_NEIGHBORS) || 5;
export const DEFAULT_RECOMMENDATIONS = parseInt(process.env.DEFAULT_RECOMMENDATIONS) || 10;
export const WEIGHT_CURTIDA = parseFloat(process.env.WEIGHT_CURTIDA) || 3;
export const WEIGHT_SALVO = parseFloat(process.env.WEIGHT_SALVO) || 4;
export const WEIGHT_CLIQUE = parseFloat(process.env.WEIGHT_CLIQUE) || 1;
export const WEIGHT_COMENTARIO = parseFloat(process.env.WEIGHT_COMENTARIO) || 5;
export const FOLLOWED_AUTHOR_BONUS = parseFloat(process.env.FOLLOWED_AUTHOR_BONUS) || 2;
