import { useState } from "react";
import { useNavigateCustom } from "../../../hooks/useNavigateCustom";
import { FORMS_POR_USUARIO } from "../../../constants/userConstants";

export function useUserForm() {
    const [tipoUsuario, setTipoUsuario] = useState("");
    const [forms, setForms] = useState(FORMS_POR_USUARIO);
    const [senhaError, setSenhaError] = useState(false);
    const { goBack } = useNavigateCustom();

    // Atualiza o input de acordo com tipoUsuario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForms(prev => ({
            ...prev, [tipoUsuario]: { ...prev[tipoUsuario], [name]: value }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (forms[tipoUsuario].senha !== forms[tipoUsuario].confirmarSenha) {

            setForms(prev => ({
                ...prev, [tipoUsuario]: { ...prev[tipoUsuario], senha: "", confirmarSenha: "" }
            }));

            setSenhaError(true);

            setTimeout(() => {
                setSenhaError(false); // reseta após 5s
            }, 7000);

            return alert('As senhas não coincidem.')
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
        senhaError,
        handleChange,
        handleTipoUsuario,
        handleSubmit,
        cleanState,
        goBackIfUserNull
    };
}
