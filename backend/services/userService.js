import { criarUsuarioRepository, encontrarUsuarioPorInfoRepository  } from '../repositories/userRepository.js'
import argon2 from 'argon2'
import { validarEmail, validarCNPJ, validarSenhaForte } from '../../common/util/validations.js'
import { CAMPOS } from '../../frontend/src/constants/userConstants.js'

export const criarUsuarioService = async (dadosFront) => {
    try {
        
        const { tipo, dados: dadosUsuario} = dadosFront;
        const { email, senha, confirmarSenha, nomeUsuario, nomeCompleto, pseudonimo, nomeFantasia, dataNascimento, cnpj, siteOficial } = dadosUsuario;

        Object.values(dadosUsuario).forEach(campo => {
            if (!campo || !campo.hasOwnProperty('valor')) {
                throw new Error('Dados do usuário estão em formato inválido.');
            }
            if (typeof campo.valor !== 'string') {
                throw new Error('Todos os campos devem ser do tipo string.');
            }
            if (campo.erro === true) {
                throw new Error('Há dados inválidos. Verifique e tente novamente.');
            }
        });

        // Validações simples
        const tiposValidos = ['Leitor', 'Autor', 'Editora'];
        if (!tipo || !tiposValidos.includes(tipo)) throw new Error('Tipo de usuário inválido.');

        if (!email.valor) throw new Error('O email é obrigatório!');
        if (!senha.valor) throw new Error('A senha é obrigatória!');
        if (!confirmarSenha.valor) throw new Error('A confirmação de senha é obrigatória');
        
        if ((tipo.valor === 'leitor' || tipo.valor === 'autor') && dataNascimento.valor) {
            const data = new Date(dataNascimento.valor);
            if (isNaN(data.getTime()) || data > new Date())
                throw new Error('A data de nascimento é inválida ou está no futuro!');
        }

        switch(tipo) {
            case 'Leitor':
                if (!nomeUsuario.valor) throw new Error('O nome de usuário é obrigatório!');
                if (!dataNascimento.valor) throw new Error('A data de nascimento é obrigatória');
                break;
            case 'Autor':
                if (!nomeCompleto.valor) throw new Error('O nome completo é obrigatório!');
                if (!dataNascimento.valor) throw new Error('A data de nascimento é obrigatória');
                if (pseudonimo.valor && pseudonimo.valor.length < 3) throw new Error('O pseudônimo deve conter no mínimo 3 caracteres!')
                break;
            case 'Editora':
                if (!nomeFantasia.valor) throw new Error('O nome fantasia é obrigatório!');
                if (!cnpj.valor) throw new Error('O cnpj é obrigatório!');   
                if (!validarCNPJ(cnpj.valor)) throw new Error('O cnpj é inválido!');     
                break;
            default:
                throw new Error("Tipo de usuário inválido!");
        }

        // Validações intermediárias
        if (!validarSenhaForte(senha.valor)) throw new Error('A senha digitada não é forte.');
        if (senha.valor.length > 30) throw new Error('A senha deve conter no máximo 30 caracteres!');
        if (!validarEmail(email.valor)) throw new Error('O formato do email é inválido!');
        if (senha.valor !== confirmarSenha.valor) throw new Error('As senhas digitadas não são iguais!');

        const senhaCriptografada = await argon2.hash(senha.valor);

        let dadosCriptografados = { "tipo": tipo, dados: Object.fromEntries(
            Object.entries(dadosUsuario)
            .filter(([key]) => key !== 'confirmarSenha')
            .map(([key, campos]) => [key, key === 'senha' ? senhaCriptografada : campos.valor])
        )};

        if (cnpj) {
            const cnpjSemMascara = cnpj.valor.replace(/\D/g, "");
            dadosCriptografados = { ...dadosCriptografados, "dados": { ...dadosCriptografados.dados, "cnpj": cnpjSemMascara }};
        }

        const dadosPraEnviar = {
            "tipo": tipo,
            "dados": Object.keys(CAMPOS[tipo]).reduce((acc, campo) => {
            acc[campo] = dadosCriptografados.dados[campo]; 
            return acc;
            }, {})
        };

        const usuarioCriado = await criarUsuarioRepository(dadosPraEnviar);

        return usuarioCriado;
    }
    catch (err) {
        console.error('[USER SERVICE ERROR]: ', err);
        throw err;
    }
}

export const encontrarUsuarioPorInfoService = async (info) => {
    try {

        if (info.cnpj) {
            const cnpjSemMascara = info.cnpj.replace(/\D/g, "");
            info.cnpj = cnpjSemMascara;
        }

        const validacao = await encontrarUsuarioPorInfoRepository(info);

        return validacao;
    }
    catch (err) {
        console.error('[SERVICE ERROR]: ', err);
        throw err;
    }
}
