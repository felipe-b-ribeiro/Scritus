import { useState } from "react";
import { FORMS_POR_USUARIO_EDIT } from "../../../constants/userConstants";

const usePerfilHook = () => {

    // const verificarErro = (campo) => {
    //     if (dados[campo].erro) return "Erro";
    //     if (dados[campo].validado) return "Sucesso";
    //     return null;
    // }

    const puxarDados = async (email, tipoUsuarioParam) => {
        try {
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

            return resposta;

            }
        catch (err) {
            console.error('Erro ao puxar dados:', err);
        }
    }

    return {
        puxarDados,
        // verificarErro
    }

    
}

export default usePerfilHook;