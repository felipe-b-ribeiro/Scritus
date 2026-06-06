import {
  criarSeguidorRepository,
  deletarSeguidorRepository,
  verificarSeSegueRepository,
} from "../repositories/seguidorRepository.js";

export const criarSeguidorController = async (req, res) => {
  try {
    const { id_perfil, id_perfil_seguidor } = req.body;
    const seguidor = await criarSeguidorRepository(
      id_perfil_seguidor,
      id_perfil,
    );
    res.status(200).json(seguidor);
  } catch (err) {
    console.error("[CRIAR SEGUIDOR CONTROLLER ERROR]: ", err);
    res.status(500).json(err.message);
  }
};

export const deletarSeguidorController = async (req, res) => {
  try {
    const { id_perfil, id_perfil_seguidor } = req.body;
    const seguidor = await deletarSeguidorRepository(
      id_perfil_seguidor,
      id_perfil,
    );
    res.status(200).json(seguidor);
  } catch (err) {
    console.error("[DELETAR SEGUIDOR CONTROLLER ERROR]: ", err);
    res.status(500).json(err.message);
  }
};

export const verificarSeSegueController = async (req, res) => {
  try {
    const { id_seguidor, id_seguido } = req.body;
    const jaSegue = await verificarSeSegueRepository(id_seguidor, id_seguido);
    res.status(200).json(jaSegue);
  } catch (err) {
    console.error("[VER SE JA SEGUE CONTROLLER ERROR]: ", err);
    res.status(500).json(err.message);
  }
};
