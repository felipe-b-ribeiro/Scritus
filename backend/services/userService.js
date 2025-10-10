import { criarUsuarioRepository } from '../repositories/userRepository.js'
import argon2 from 'argon2'
import { validarEmail, validarCNPJ, validarSenhaForte } from '../../common/util/validations.js'
import { CAMPOS} from '../../frontend/src/constants/userConstants.js'

export const criarUsuarioService = async (dadosFront) => {
    try {
        
        const { tipo, dados: dadosUsuario} = dadosFront;
        const { email, senha, confirmarSenha, nomeUsuario, nomeCompleto, pseudonimo, nomeFantasia, dataNascimento, cnpj, siteOficial } = dadosUsuario;
        // Validações simples
        const tiposValidos = ['Leitor', 'Autor', 'Editora'];
        if (!tipo || !tiposValidos.includes(tipo)) throw new Error('Tipo de usuário inválido.');

        if (!email) throw new Error('O email é obrigatório!');
        if (!senha) throw new Error('A senha é obrigatória!');
        if (!confirmarSenha) throw new Error('A confirmação de senha é obrigatória');
        
        if ((tipo === 'leitor' || tipo === 'autor') && dataNascimento) {
            const data = new Date(dataNascimento);
            if (isNaN(data.getTime()) || data > new Date())
                throw new Error('A data de nascimento é inválida ou está no futuro!');
        }

        switch(tipo) {
            case 'Leitor':
                if (!nomeUsuario) throw new Error('O nome de usuário é obrigatório!');
                if (!dataNascimento) throw new Error('A data de nascimento é obrigatória');
                break;
            case 'Autor':
                if (!nomeCompleto) throw new Error('O nome completo é obrigatório!');
                if (!dataNascimento) throw new Error('A data de nascimento é obrigatória');
                if (pseudonimo && pseudonimo.length < 3) throw new Error('O pseudônimo deve conter no mínimo 3 caracteres!')
                break;
            case 'Editora':
                if (!nomeFantasia) throw new Error('O nome fantasia é obrigatório!');
                if (!cnpj) throw new Error('O cnpj é obrigatório!');   
                if (!validarCNPJ(cnpj)) throw new Error('O cnpj é inválido!');     
                break;
            default:
                throw new Error("Tipo de usuário inválido!");
        }

        // Validações intermediárias

        if (!validarSenhaForte(senha)) throw new Error('A senha digitada não é forte.');
        if (senha.length > 30) throw new Error('A senha deve conter no máximo 30 caracteres!');
        if (!validarEmail(email)) throw new Error('O formato do email é inválido!');
        if (senha !== confirmarSenha) throw new Error('As senhas digitadas não são iguais!');

        const senhaCriptografada = await argon2.hash(senha);
        let dadosCriptografados = { ...dadosFront, "dados": {...dadosFront.dados, senha: senhaCriptografada } };

        if (cnpj) {
            const cnpjSemMascara = cnpj.replace(/\D/g, "");
            dadosCriptografados = { ...dadosCriptografados, "dados": { ...dadosCriptografados.dados, "cnpj": cnpjSemMascara }};
        }

        const dadosPraEnviar = {
            "tipo": tipo,
            "dados": CAMPOS[tipo].reduce((acc, campo) => {
            acc[campo] = dadosCriptografados.dados[campo]; 
            return acc;
            }, {})
        };
        
        console.log('[SERVICE -> REPO]:', dadosPraEnviar);

        const usuarioCriado = await criarUsuarioRepository(dadosPraEnviar);

        return usuarioCriado;
    }
    catch (err) {
        console.error('[SERVICE ERROR]: ', err);
        throw err;
    }
    }  