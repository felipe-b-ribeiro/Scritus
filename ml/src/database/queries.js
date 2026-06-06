const queries = {
  GET_INTERACTIONS: `
    SELECT 
      i.id_perfil,
      i.id_obra,
      i.tipo,
      o.id_autor,
      o.status_obra
    FROM interacoes i
    INNER JOIN obras o ON i.id_obra = o.id_obra
    WHERE o.status_obra = 'Público'
    ORDER BY i.id_perfil, i.id_obra
  `,

  GET_FOLLOWERS: `
    SELECT 
      s.id_seguidor as id_perfil,
      p.id_usuario as id_autor
    FROM seguidores s
    INNER JOIN perfis p ON s.id_seguido = p.id_perfil
    INNER JOIN usuarios u ON p.id_usuario = u.id_usuario
    WHERE u.tipo_usuario = 'Autor'
  `,

  GET_WORKS: `
    SELECT 
      id_obra,
      id_autor,
      titulo,
      sinopse,
      classificacao_indicativa
    FROM obras
    WHERE status_obra = 'Público'
    ORDER BY id_obra
  `,

  DELETE_RECOMMENDATIONS: `
    DELETE FROM recomendacoes_feed 
    WHERE id_perfil = $1
  `,

  INSERT_RECOMMENDATION: `
    INSERT INTO recomendacoes_feed 
      (id_perfil, id_obra, peso, algoritmo_versao, parametros)
    VALUES 
      ($1, $2, $3, $4, $5)
  `,
};

export default queries;
