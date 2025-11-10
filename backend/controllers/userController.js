import { criarUsuarioService, encontrarUsuarioPorInfoService, pullDataUserService, updateUserService } from '../services/userService.js';
import { deleteUserRepository } from '../repositories/userRepository.js';

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

export const updateUser = async (req, res) => {
    try {
       
        const { email, nome_usuario, nome_autor, nome_fantasia, bio, tipo_usuario, data_nascimento, pseudonimo, site_oficial} = req.body;

        const foto_perfil = req.file ? `/uploads/fotos_perfis/${req.file.filename}` : null;
        
        let info = {'tipo_usuario': tipo_usuario, 'email': email};

        switch (tipo_usuario) {
            case 'Leitor':
                info = { ...info, nome_usuario, bio, data_nascimento, foto_perfil};
                break;
            case 'Editora':
                info = { ...info, nome_fantasia, bio, site_oficial, foto_perfil};
                break;
            case 'Autor':
                info = { ...info, nome_autor, bio, data_nascimento, pseudonimo, foto_perfil};
        }

        const usuario = await updateUserService(info);

        return res.status(200).json({usuario});

    } catch (err) {
        console.error('[UPDATE USER CONTROLLER ERROR]: ', err)
        res.status(400).json({ error: err.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { email } = req.user; // vem do token decodificado
        await deleteUserRepository(email);
        res.status(200).json({ mensagem: "Conta deletada com sucesso!" });
    } catch (err) {
        console.error("[DELETE USER CONTROLLER ERROR]: ", err);
        res.status(400).json({error: err.message});
    }
}