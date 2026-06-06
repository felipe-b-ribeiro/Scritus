import { useRef, useState } from "react";
import { verificarDisponibilidade } from "../../../../../common/util/validations";
import { FORMS_POR_USUARIO } from "../../../constants/userConstants";
import useNavigateCustom from "../../../hooks/useNavigateCustom";
import { FORM_ERROR_DURATION } from "../../../constants/systemConstants";

const useUserForm = () => {
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [forms, setForms] = useState(FORMS_POR_USUARIO);
  const [senhaVisivel, setSenhaVisivel] = useState({
    senha: false,
    confirmarSenha: false,
  });

  const { goTo, goBack } = useNavigateCustom();

  const criarContaRef = useRef(null);

  const scrollDelay = tipoUsuario ? 0 : 1100;

  const scrollarAteFinalContainer = () => {
    setTimeout(() => {
      if (criarContaRef.current) {
        criarContaRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, scrollDelay);
  };

  const setError = (campo, erro) => {
    setForms((prev) => ({
      ...prev,
      [tipoUsuario]: {
        ...prev[tipoUsuario],
        [campo]: { ...prev[tipoUsuario][campo], erro: true, erroMsg: erro },
      },
    }));

    setTimeout(() => {
      setForms((prev) => ({
        ...prev,
        [tipoUsuario]: {
          ...prev[tipoUsuario],
          [campo]: { ...prev[tipoUsuario][campo], erro: false, erroMsg: "" },
        },
      }));
    }, FORM_ERROR_DURATION);
  };

  const setSucess = (campo) => {
    setForms((prev) => ({
      ...prev,
      [tipoUsuario]: {
        ...prev[tipoUsuario],
        [campo]: { ...prev[tipoUsuario][campo], validado: true },
      },
    }));
  };

  const verificarErro = (campo) => {
    if (forms[tipoUsuario][campo].erro) return "Erro";
    if (forms[tipoUsuario][campo].validado) return "Sucesso";
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForms((prev) => ({
      ...prev,
      [tipoUsuario]: {
        ...prev[tipoUsuario],
        [name]: { ...prev[tipoUsuario][name], valor: value },
      },
    }));
  };

  let timeout;

  const handleBlur = (nomeCampo, valorCampo) => {
    if (valorCampo === "") return;
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      const verificacao = verificarDisponibilidade(nomeCampo, valorCampo);
      console.log(verificacao);
      verificacao ? setSucess(nomeCampo) : setError(nomeCampo, "Já em uso.");
    }, 600);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    Object.entries(forms[tipoUsuario]).forEach(([nomeCampo, campo]) => {
      if (campo.valor === "") {
        setError(nomeCampo, "");
      }
    });

    const temErro = Object.values(forms[tipoUsuario]).some(
      (campo) => campo.erro,
    );

    if (temErro) return null;

    if (
      forms[tipoUsuario].senha.valor !== forms[tipoUsuario].confirmarSenha.valor
    ) {
      setError("senha", "");
      setError("confirmarSenha", "As senhas digitadas não são iguais.");
      return null;
    }

    if (forms[tipoUsuario].dataNascimento) {
      const dataUsuario = new Date(forms[tipoUsuario].dataNascimento.valor);
      const hoje = new Date();
      if (dataUsuario > hoje) {
        setError(
          "dataNascimento",
          "A data de nascimento não pode estar no futuro.",
        );
        return null;
      }
    }

    try {
      const body = { tipo: tipoUsuario, dados: { ...forms[tipoUsuario] } };
      const resposta = await fetch(" /api/v1/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await resposta.json();

      if (resposta.ok) {
        if (data.token) localStorage.setItem("accessToken", data.token);
        alert("Usuário cadastrado com sucesso!");
        goTo("/home");
        return;
      } else {
        return alert("Erro ao cadastrar o usuário!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleTipoUsuario = (tipo) => {
    setTipoUsuario(tipo);
  };

  const cleanState = () => {
    if (!tipoUsuario) return;
    setForms((prev) => ({
      ...prev,
      [tipoUsuario]: { ...FORMS_POR_USUARIO[tipoUsuario] },
    }));
    setTipoUsuario("");
  };

  const goBackIfUserNull = () => {
    if (!tipoUsuario) {
      goBack();
    } else {
      setTipoUsuario("");
    }
  };

  return {
    tipoUsuario,
    forms,
    cleanState,
    criarContaRef,
    goBackIfUserNull,
    handleBlur,
    handleChange,
    handleSubmit,
    handleTipoUsuario,
    scrollarAteFinalContainer,
    senhaVisivel,
    setSenhaVisivel,
    verificarErro,
  };
};
export default useUserForm;
