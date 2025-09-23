import { criarUsuarioService } from '../services/userService.js'


export const createUser = async (req, res) => {
    try {
        const resposta = await criarUsuarioService(req.body);
        res.status(201).json(resposta);
    } 
    catch (err) {
        console.error('[CONTROLLER ERROR]: ', err);
        res.status(400).json({error: err.message});
    }
}
