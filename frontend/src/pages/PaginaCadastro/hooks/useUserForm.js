import { useState } from "react";
import { useNavigateCustom } from "../../../hooks/useNavigateCustom";
import { FORMS_POR_USUARIO} from "../../../constants/userConstants";

export function useUserForm() {
    const [tipoUsuario, setTipoUsuario] = useState("");
    const [forms, setForms] = useState(FORMS_POR_USUARIO);
    const [inputs, setInputs] = useState({
        "nome_usuario": {'valor': "", 'erro': false, 'loading': false},
        "email": {'valor': "", 'erro': false, 'loading': false},
        "senha": {'valor': "", 'erro': false, 'loading': false},
        "cnpj": {'valor': "", 'erro': false, 'loading': false},
        "pseudonimo": {'valor': "", 'erro': false, 'loading': false}
    })
    const [loading, setLoading] = useState(false);
    const { goBack } = useNavigateCustom();

    // Atualiza o input de acordo com tipoUsuario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForms(prev => ({
            ...prev, [tipoUsuario]: { ...prev[tipoUsuario], [name]: { ...prev[tipoUsuario][name], "valor": value} }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (forms[tipoUsuario].senha !== forms[tipoUsuario].confirmarSenha) {

            setForms(prev => ({
                ...prev, [tipoUsuario]: { ...prev[tipoUsuario], senha: "", confirmarSenha: "" }
            }));

            setError(true);

            setTimeout(() => {
                setError(false); // reseta após 7s
            }, 7000);

            return alert('As senhas não coincidem.')
        }

        try {
           const body = {"tipo": tipoUsuario, "dados": { ...forms[tipoUsuario] } };
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
        error,
        handleChange,
        handleTipoUsuario,
        handleSubmit,
        cleanState,
        goBackIfUserNull
    };
}
