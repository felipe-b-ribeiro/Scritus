import { criarObraRepository, listarObrasPorAutorRepository, deletarObraRepository, puxarTodasObrasRepository, puxarObraPorIdRepository } from "../repositories/obraRepository.js";

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
    const { autorId } = req.params;

    if (!autorId) {
      return res.status(400).json({ erro: "ID do autor não fornecido." });
    }

    const obras = await listarObrasPorAutorRepository(autorId);

    return res.status(200).json(obras);
  } catch (err) {
    console.error("Erro no listarObrasPorAutorController:", err);
    res.status(500).json({ erro: "Erro ao buscar obras do autor." });
  }
};

export const deletarObraController = async (req, res) => {
    try {
        const { obraId } = req.params;

        console.log(id);

        if (!id) return res.status(400).json({ mensagem: "ID da obra é obrigatório" });

        await deletarObraRepository(obraId);

        res.status(200).json({ mensagem: "Obra deletada com sucesso" });
    } catch (err) {
        console.error("Erro no controller ao deletar obra:", err);
        res.status(500).json({ mensagem: "Erro ao deletar obra" });
    }
};

export const puxarTodasObrasController = async (req, res) => {
  try {
    const obras = await puxarTodasObrasRepository();
    return res.status(200).json(obras);
  } catch (err) {
    console.error("[LISTAR TODAS OBRAS CONTROLLER ERROR]:", err);
    res.status(500).json({ erro: "Erro ao buscar obras." });
  }
};

export const puxarObraPorIdController = async (req, res) => {
  try {

    const { obraId } = req.params;

    const obra = await puxarObraPorIdRepository(obraId);
    console.log(obra);
    return res.status(200).json(obra);
  } catch (err) {
    console.error('[PUXAR OBRA POR ID CONTROLLER ERROR]:', err);
    res.status(500);
  }
}