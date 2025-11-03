import { useState } from "react";
import { FORMS_POR_USUARIO_EDIT } from "../../../constants/userConstants";

const usePerfilHook = () => {

    const [tipoUsuario, setTipoUsuario] = useState("");
    const [dados, setDados] = useState({});

    const verificarErro = (campo) => {
        if (dados[campo].erro) return "Erro";
        if (dados[campo].validado) return "Sucesso";
        return null;
    }

    const puxarDados = async (email, tipoUsuarioParam) => {
        try {
            setTipoUsuario(tipoUsuarioParam)
            const body = {
                "tipoUsuario": tipoUsuarioParam,
                "email": email
            }
            const usuario = await fetch('http://localhost:5000/api/v1/usuarios/puxardados', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }
            );
            if (!usuario.ok) {
                throw new Error("Erro ao puxar dados do servidor!");
            }
            const resposta = await usuario.json();

            const camposBase = FORMS_POR_USUARIO_EDIT[tipoUsuarioParam];
            const dadosComValores = {};

            for (const campo in camposBase) {
                dadosComValores[campo] = {
                ...camposBase[campo],
                valor: resposta[campo] || "",
                erro: false,
                validado: false,
                erroMsg: "",
                };
            }

            setDados(dadosComValores);

            }
        catch (err) {
            console.error('Erro ao puxar dados:', err);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDados(prev => ({
            ...prev, [name]: { ...prev[name], "valor": value }
        }));
    };

    return {
        puxarDados,
        handleChange,
        verificarErro,
        dados
    }

    
}

export default usePerfilHook;