import { useEffect, useRef, useState } from "react";
import {
  FORM_ERROR_ANIMATION_DURATION,
  FORM_ERROR_DURATION,
} from "../../../constants/systemConstants";

export const useLoginHook = () => {
  const [campos, setCampos] = useState({
    email: { valor: "", erro: false, erroMsg: "" },
    senha: { valor: "", erro: false, erroMsg: "" },
  });
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [errorHelperState, setErrorHelperState] = useState("closed");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const timeoutsRef = useRef([]);

  useEffect(() => {
    const currentTimeouts = timeoutsRef.current;
    return () => {
      currentTimeouts.forEach(clearTimeout);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampos((prev) => ({
      ...prev,
      [name]: { ...prev[name], valor: value },
    }));
  };

  const handleErrorHelperLeave = (imediato = false) => {
    setTimeout(
      () => {
        setErrorHelperState("leaving");
        setTimeout(() => {
          setErrorHelperState("closed");
        }, FORM_ERROR_ANIMATION_DURATION);
      },
      imediato ? 0 : FORM_ERROR_DURATION - FORM_ERROR_ANIMATION_DURATION,
    );
  };

  const verificarErro = (campo) => campos[campo].erro;

  const limparErros = (campo) => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    handleErrorHelperLeave(true);
    setCampos((prev) => ({
      ...prev,
      [campo]: { ...prev[campo], erro: false, erroMsg: "" },
    }));
  };

  const setError = (campo, erro, msg = "") => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    if (!erro) {
      limparErros(campo);
      return;
    }

    if (erro) {
      setCampos((prev) => ({
        ...prev,
        [campo]: { ...prev[campo], erro: true, erroMsg: msg },
      }));

      setTimeout(() => {
        limparErros(campo);
      }, FORM_ERROR_DURATION);

      if (msg) {
        setErrorHelperState("entering");
        handleErrorHelperLeave(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    Object.keys(campos).forEach((campo) => {
      limparErros(campo);
    });

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      if (!campos.email.valor) {
        setError("email", true, "O campo email é obrigatório!");
        return;
      }
      if (!campos.senha.valor) {
        setError("senha", true, "O campo senha é obrigatório!");
        return;
      }

      const temErro = Object.values(campos).some((campo) => campo.erro);

      if (temErro > 0) return;

      const emailVerificar = campos.email.valor.endsWith("@gmail.com")
        ? campos.email.valor
        : `${campos.email.valor}@gmail.com`;

      const body = {
        email: emailVerificar,
        senha: campos.senha.valor,
      };

      const resposta = await fetch("/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const dados = await resposta.json();
      const token = dados.token;

      if (resposta.ok) {
        localStorage.setItem("accessToken", token);
        alert("Usuário logado com sucesso!");
        window.location.href = "/home";
      } else {
        setError("email", true);
        setError("senha", true, "Email ou senha incorretos!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleChange,
    handleSubmit,
    campos,
    verificarErro,
    senhaVisivel,
    setSenhaVisivel,
    errorHelperState,
    limparErros,
  };
};
