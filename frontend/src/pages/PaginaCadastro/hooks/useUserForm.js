import { useState } from "react";
import { useNavigateCustom } from "../../../hooks/useNavigateCustom";
import { FORMS_POR_USUARIO } from "../../../constants/userConstants";

export function useUserForm() {
    const [tipoUsuario, setTipoUsuario] = useState("");
    const [forms, setForms] = useState(FORMS_POR_USUARIO);
    const [loading, setLoading] = useState(false);
    const { goBack } = useNavigateCustom();

    const setError = (campo, erro) => {

        setForms(prev => ({
            ...prev, [tipoUsuario]: {
                ...prev[tipoUsuario], [campo]: { ...prev[tipoUsuario][campo], 'erro': true, 'erroMsg': erro }
            }
        }));

        setTimeout(() => {
            setForms(prev => ({
                ...prev, [tipoUsuario]: {
                    ...prev[tipoUsuario], [campo]: { ...prev[tipoUsuario][campo], 'erro': false, 'erroMsg': "" }
                }
            }));
        }, 6000);
    }

    const verificarErro = (campo) => {
        return forms[tipoUsuario][campo].erro;
    }

    // Atualiza o input de acordo com tipoUsuario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForms(prev => ({
            ...prev, [tipoUsuario]: { ...prev[tipoUsuario], [name]: { ...prev[tipoUsuario][name], "valor": value } }
        }));
    };

    const handleFocus = (campo) => {
        verificarErro(campo) && setError(campo, "");
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        Object.entries(forms[tipoUsuario]).forEach(([nomeCampo, campo]) => {
            if (campo.valor == "") {
                setError(nomeCampo, ""); 
            }
        }); 

        const temErro = Object.values(forms[tipoUsuario]).some(campo => campo.erro)
        
        if (temErro) { return null; }

        if (forms[tipoUsuario].senha.valor !== forms[tipoUsuario].confirmarSenha.valor) {

            setError("senha", "");
            setError("confirmarSenha", "As senhas digitadas não são iguais.");

            return null;
        }

        const dataUsuario = new Date(forms[tipoUsuario].dataNascimento.valor);
        const hoje = new Date();

        if (dataUsuario > hoje) {

            setError("dataNascimento", "A data de nascimento não pode estar no futuro.");

            return null;
        }

        try {

            const body = { "tipo": tipoUsuario, "dados": { ...forms[tipoUsuario] } };
            const resposta = await fetch('http://localhost:5000/api/v1/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (resposta.ok) {

                return alert('Usuário cadastrado com sucesso!')

            }
            else {

                return alert('Erro ao cadastrar o usuário!')
            }
        }
        catch (err) {
            console.error(err);
        }

    }

    // Seleciona tipo de usuário
    const handleTipoUsuario = (tipo) => {
        setTipoUsuario(tipo);
    };

    // Limpa tipo de usuário
    const cleanState = () => {
        if (!tipoUsuario) return;
        setForms(prev => ({
            ...prev,
            [tipoUsuario]: { ...FORMS_POR_USUARIO[tipoUsuario] }
        }));
        setTipoUsuario("");
    };

    const goBackIfUserNull = () => {
        if (!tipoUsuario) {
            goBack(); // navega pra tela anterior
        } else {
            setTipoUsuario(""); // volta pro “menu de escolha” sem perder forms
        }
    }

    return {
        tipoUsuario,
        forms,
        verificarErro,
        handleChange,
        handleFocus,
        handleTipoUsuario,
        handleSubmit,
        cleanState,
        goBackIfUserNull
    };
}
