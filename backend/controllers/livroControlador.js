// recebe req, usa multer para arquivos, envia para S3, salva no DB
const { enviarArquivo, apagarLocal } = require('../servicos/servicoArmazenamento');
const Livro = require('../modelos/livroModelo');

async function criarLivroHandler(req, res) {
  try {
    const { titulo, descricao } = req.body;
    if (!titulo) return res.status(400).json({ erro: 'Titulo é obrigatório' });

    const capa = req.files?.capa?.[0];
    const arquivo = req.files?.arquivo?.[0];

    let urlCapa = null;
    let urlArquivo = null;

    if (capa) {
      const chave = `capas/${Date.now()}_${capa.originalname}`;
      urlCapa = await enviarArquivo(capa.path, chave);
      await apagarLocal(capa.path);
    }

    if (arquivo) {
      const chave = `pdfs/${Date.now()}_${arquivo.originalname}`;
      urlArquivo = await enviarArquivo(arquivo.path, chave);
      await apagarLocal(arquivo.path);
    }

    const novoLivro = await Livro.criarLivro({
      titulo,
      descricao,
      url_capa: urlCapa,
      url_arquivo: urlArquivo,
      autor_id: req.usuario?.id || null
    });

    return res.status(201).json(novoLivro);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro interno' });
  }
}

module.exports = { criarLivroHandler };
