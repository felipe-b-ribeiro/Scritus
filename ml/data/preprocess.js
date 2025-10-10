
import _ from 'lodash';

export function mapTipoInteracao(interacao) {
  switch (interacao.tipo) {
    case 'curtida':
      return 1;
    case 'salvo':
      return 2;
    case 'clique':
      return 0.5;
    case 'comentario':
      return interacao.conteudo ? interacao.conteudo.split(' ').length * 0.2 : 1;
    default:
      return 0;
  }
}

/**
 @param {Array} interacoes
 @param {Array} obras
 @param {Array} usuarios
 @returns {Object}
 */
export function preprocess(interacoes, obras, usuarios) {
 
  const userIds = usuarios.map(u => u.id_perfil);
  const obraIds = obras.map(o => o.id_obra);

  const userIndex = _.fromPairs(userIds.map((id, i) => [id, i]));
  const obraIndex = _.fromPairs(obraIds.map((id, i) => [id, i]));


  const X = []; 
  const y = []; 

  interacoes.forEach(interacao => {
    const uIdx = userIndex[interacao.id_perfil];
    const oIdx = obraIndex[interacao.id_obra];
    const peso = mapTipoInteracao(interacao);

    
    const feature = Array(obraIds.length).fill(0);
    feature[oIdx] = 1;

    

    X.push(feature);
    y.push(peso);
  });

  return { X, y, userIndex, obraIndex };
}
