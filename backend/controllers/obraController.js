import { criarObraRepository, listarObrasPorAutorRepository, deletarObraRepository, puxarPdfPorIdRepository } from "../repositories/obraRepository.js";

export const criarObraController = async (req, res) => {
  try {
    const {
      id_autor,
      titulo,
      sinopse,
      trecho_de_amostra,
      status_obra,
      classificacao_indicativa,
      tags,
    } = req.body;

    // Converte tags de JSON para array
    const tagsArray = tags ? JSON.parse(tags) : [];

    // Arquivos
    const capa = req.files?.capa?.[0];
    const pdf = req.files?.pdf?.[0];

    // Monta objeto da obra
    const novaObra = {
      id_autor,
      titulo,
      sinopse,
      trecho_de_amostra,
      status_obra,
      classificacao_indicativa,
      capa_url: capa ? `/uploads/capas/${capa.filename}` : null,
      pdf_url: pdf ? `/uploads/pdfs/${pdf.filename}` : null,
      tags: tagsArray,
    };

    // Salva no banco
    const obraCriada = await criarObraRepository(novaObra);

    return res.status(201).json({
      message: "Obra cadastrada com sucesso!",
      obra: obraCriada,
    });
  } catch (err) {
    console.error("Erro no criarObraController:", err);
    return res.status(500).json({ message: "Erro ao cadastrar obra.", erro: err.message });
  }
};

export const listarObrasPorAutorController = async (req, res) => {
  try {
    const { id_autor } = req.params;

    if (!id_autor) {
      return res.status(400).json({ erro: "ID do autor não fornecido." });
    }

    const obras = await listarObrasPorAutorRepository(id_autor);

    return res.status(200).json(obras);
  } catch (err) {
    console.error("Erro no listarObrasPorAutorController:", err);
    res.status(500).json({ erro: "Erro ao buscar obras do autor." });
  }
};

export const deletarObraController = async (req, res) => {
    try {
        const { id } = req.params;

        console.log(id);

        if (!id) return res.status(400).json({ mensagem: "ID da obra é obrigatório" });

        await deletarObraRepository(id);

        res.status(200).json({ mensagem: "Obra deletada com sucesso" });
    } catch (err) {
        console.error("Erro no controller ao deletar obra:", err);
        res.status(500).json({ mensagem: "Erro ao deletar obra" });
    }
};

export const puxarPdfObraPorIdController = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const resultado = await puxarPdfPorIdRepository(id);

    if (!resultado) {
      return res.status(404).json({ mensagem: "Obra não encontrada" });
    }

    res.json({ pdf_url: resultado.pdf_url });
  } catch (err) {
    console.error("Erro ao buscar PDF:", err);
    res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};