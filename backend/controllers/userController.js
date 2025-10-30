import { criarUsuarioService, encontrarUsuarioPorInfoService, pullDataUserService } from '../services/userService.js'


export const createUser = async (req, res) => {
    try {
        const resposta = await criarUsuarioService(req.body);
        res.status(201).json(resposta);
    } 
    catch (err) {
        console.error('[USER CONTROLLER ERROR]: ', err);
        res.status(400).json({error: err.message});
    }
}

export const findUserbyInfo = async (req, res) => {
    try {
        const { email, nomeUsuario, cnpj } = req.body;

        if (!email && !nomeUsuario && !cnpj) throw new Error('Nenhuma informação foi enviada para verificação!');

        let info = {};

        if (email) info.email = email;
        if (nomeUsuario) info.nomeUsuario = nomeUsuario;
        if (cnpj) info.cnpj = cnpj;

        const resposta = await encontrarUsuarioPorInfoService(info);
        
        return res.status(200).json({ "campo": Object.keys(info)[0], "valor": Object.values(info)[0], "disponivel": resposta }); 

    } catch (err) {
        console.error('[USER CONTROLLER ERROR]:', err);
        res.status(400).json({ error: err.message });
    }
};

export const pullDataUser = async (req, res) => {
    try {
        
        const { tipoUsuario, email } = req.body;

        if (!email || !tipoUsuario) throw new Error('Nenhuma informação foi enviada para verificação!');

        let info = {}

        if (email) info.email = email;
        if (tipoUsuario) info.tipoUsuario = tipoUsuario;

        const usuario = await pullDataUserService(info);

        return res.status(200).json({usuario});

    } catch (err) {
        console.error('[PULL DATA USER CONTROLLER ERROR]:', err);
        req.status(400).json({ error: err.message });
    }
}