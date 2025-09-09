import { useState } from "react";
import { FORMS_INICIAIS } from "../../../constants/userConstants";

export function useUserForm() {
    const [tipoUsuario, setTipoUsuario] = useState("");
    const [forms, setForms] = useState(FORMS_INICIAIS);

    const camposAtuais = forms[tipoUsuario] || {};

    // Atualiza o input de acordo com tipoUsuario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForms((prev) => ({
            ...prev,
            [tipoUsuario]: {
                ...prev[tipoUsuario],
                [name]: value,
            },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Enviou form');
        if (camposAtuais.senha !== camposAtuais.confirmarSenha) {
            return alert('As senhas não coincidem.')
        }
    }

    // Seleciona tipo de usuário
    const handleTipoUsuario = (tipo) => {
        setTipoUsuario(tipo);
    };

    // Limpa tipo de usuário (ex: cancelar)
    const cleanState = () => {
        if (!tipoUsuario) return;
        setForms(prev => ({
            ...prev,
            [tipoUsuario]: { ...FORMS_INICIAIS[tipoUsuario] }
        }));
        setTipoUsuario("");
    };

    return {
        tipoUsuario,
        camposAtuais,
        handleChange,
        handleTipoUsuario,
        handleSubmit,
        cleanState,
    };
}
