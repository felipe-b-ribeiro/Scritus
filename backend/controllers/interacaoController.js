import { criarInteracaoRepository, deletarInteracaoRepository } from "../repositories/interacaoRepository.js";

export const criarInteracaoController = async (req, res) => {
    try {
        const { id_perfil, id_obra, tipo_interacao } = req.body;

        const obj = {
            "id_perfil": id_perfil,
            "id_obra": id_obra,
            "tipo_interacao": tipo_interacao
        }

        const interacao = await criarInteracaoRepository(obj);

        if (!interacao) throw new Error('Erro ao cadastrar interação.');
        return res.status(200).json({interacao});
    } catch (err) {
        console.error("[CREATE INTERACAO CONTROLLER ERROR]: ", err);
        res.status(500).json({error: err.message});
    }
};

export const deletarInteracaoController = async (req, res) => {
    try {
        const { id_perfil, id_obra, tipo_interacao } = req.body;

        const obj = {
            "id_perfil": id_perfil,
            "id_obra": id_obra,
            "tipo_interacao": tipo_interacao
        }

        const interacao = await deletarInteracaoRepository(obj);

        if (!interacao) throw new Error('Erro ao deletar interação.');
    } catch (err) {
      console.error("[DELETE INTERAÇÃO CONTROLLER ERROR]: ", err);
        res.status(500).json({error: err.message});  
    }
}