import { gerarRecomendacao } from "../../ml/scripts/runSingleProfile.js";
import {
  criarObraRepository,
  deletarObraRepository,
  listarObrasPorAutorRepository,
  listarObrasPorInteracaoEIdPerfilRepository,
  puxarObraPorIdRepository,
  puxarObrasPorNomeTagRepository,
  puxarTodasObrasRepository,
} from "../repositories/obraRepository.js";
import {
  deletarRecomendacoesPorIdRepository,
  puxarIdObraRecomendacoesRepository,
} from "../repositories/recomendacaoRepository.js";
import { buscarTagPorNomeRepository } from "../repositories/tagsRepository.js";

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
    return res
      .status(500)
      .json({ message: "Erro ao cadastrar obra.", erro: err.message });
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

    if (!obraId)
      return res.status(400).json({ mensagem: "ID da obra é obrigatório" });

    await deletarObraRepository(obraId);

    res.status(200).json({ mensagem: "Obra deletada com sucesso" });
  } catch (err) {
    console.error("Erro no controller ao deletar obra:", err);
    res.status(500).json({ mensagem: "Erro ao deletar obra" });
  }
};

export const puxarTodasObrasController = async (_req, res) => {
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
    let { id_obra } = req.body;

    if (!id_obra) {
      return res.status(400).json({ erro: "Envie um ID ou uma lista de IDs." });
    }

    if (!Array.isArray(id_obra)) {
      id_obra = [id_obra];
    }

    const obra = await puxarObraPorIdRepository(id_obra);
    return res.status(200).json(obra);
  } catch (err) {
    console.error("[PUXAR OBRA POR ID CONTROLLER ERROR]:", err);
    res.status(500);
  }
};

export const puxarObrasPorNomeTagController = async (req, res) => {
  try {
    const { nomeTag } = req.params;
    if (!nomeTag) {
      return res.status(400).json({ erro: "Nome da tag não fornecido." });
    }
    const tag = await buscarTagPorNomeRepository(nomeTag);
    if (!tag) {
      return res.status(404).json({ erro: "Tag não encontrada" });
    }
    const obras = await puxarObrasPorNomeTagRepository(nomeTag);
    return res.status(200).json(obras);
  } catch (err) {
    console.error("[PUXAR OBRAS POR TAG CONTROLLER ERROR]:", err);
    res.status(500);
  }
};

export const gerarRecomendacaoController = async (req, res) => {
  try {
    const idPerfil = Number(req.query.idPerfil);
    const quantidade = Number(req.query.quantidade);

    const _recomendacoes = await gerarRecomendacao(idPerfil, quantidade);
    const listaIds = await puxarIdObraRecomendacoesRepository(idPerfil);
    res.status(200).json({ listaIds });
  } catch (err) {
    console.error("[GERAR RECOMENDAÇÃO CONTROLLER ERROR]: ", err);
    res.status(500).json({ err });
  }
};

export const deletarRecomendacoesPorIdController = async (req, res) => {
  try {
    const idPerfil = Number(req.query.idPerfil);

    const deletou = await deletarRecomendacoesPorIdRepository(idPerfil);
    if (deletou) return res.status(200).json({ deletou });
  } catch (err) {
    console.error("[DELETAR RECOMENDACOES CONTROLLER ERROR]: ", err);
    res.status(500).json({ err });
  }
};

export const listarObrasPorInteracaoEIdPerfilController = async (req, res) => {
  try {
    const { idPerfil, tipoInteracao } = req.query;

    const obras = await listarObrasPorInteracaoEIdPerfilRepository(
      idPerfil,
      tipoInteracao,
    );
    res.status(200).json(obras);
  } catch (err) {
    console.error("[LISTAR OBRAS SALVAS CONTROLLER ERROR]: ", err);
    res.status(500).json(err.message);
  }
};
