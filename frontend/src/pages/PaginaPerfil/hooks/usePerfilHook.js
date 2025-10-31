import { useState } from "react";
import { FORMS_POR_USUARIO_EDIT } from "../../../constants/userConstants";

const usePerfilHook = async () => {

    const [tipoUsuario, setTipoUsuario] = useState("");
    const [dados, setDados] = useState(FORMS_POR_USUARIO_EDIT[tipoUsuario]);

    const verificarErro = (campo) => {
        if (dados[campo].erro) return "Erro";
        if (dados[campo].validado) return "Sucesso";
        return null;
    }

    const puxarDados = (email, tipoUsuario) => {
        try {
            setTipoUsuario(tipoUsuario)
            const body = {
                "tipoUsuario": tipoUsuarioFront,
                "email": email
            }
            const usuario = fetch('http://localhost:5000/api/v1/usuarios/puxardados', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }
            );
            if (usuario.ok) {
                setDados(usuario.json());
            }
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