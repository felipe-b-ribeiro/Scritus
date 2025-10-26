import { useState } from "react";
import { validarEmail } from '../../../../../common/util/validations.js'

export const useLoginHook = () => {
  const [campos, setCampos] = useState({
    email: { valor: "", erro: false, erroMsg: '' },
    senha: { valor: "", erro: false, erroMsg: '' },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampos((prev) => ({
      ...prev,
      [name]: { ...prev[name], valor: value },
    }));
  };

  const verificarErro = (campo) => {
    return campos[campo].erro;
  };

  const setError = (campo, bool) => {
    setCampos((prev) => ({
      ...prev,
      [campo]: { ...prev[campo], erro: bool },
    }));
  };

  const setErroMsg = (campo, msg) => {
    setCampos(prev =>({
        ...prev,
        [campo]: { ...prev[campo], erroMsg: msg}
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErroMsg('email', '');
    setErroMsg('senha', '');
    setError('email', false);
    setError('senha', false);

    try {
      if (campos.email.valor === "") {
        setError("email", true);
        setTimeout(() => {
          setError("email", false);
        }, 6000);
        setErroMsg('email', 'O campo email é obrigatório!');
        return;
      } 
      if (campos.senha.valor === "") {
        setError("senha", true);
        setTimeout(() => {
          setError("senha", false);
        }, 6000);
        setErroMsg('senha', 'O campo senha é obrigatório!');
        return;
      }

      if (!validarEmail(campos.email.valor)) {
        setError("email", true);
        setTimeout(() => {
          setError("email", false);
        }, 6000);
        setErroMsg('email', 'O formato do email digitado é inválido!');
        return;
      }

      const temErro = Object.values(campos).filter(campo => campo.erro).length;

      if (temErro > 0) return;

      const body = {
        email: campos.email.valor,
        senha: campos.senha.valor,
      };

      const resposta = await fetch("http://localhost:5000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const dados = await resposta.json();
      const token = dados.token;

      if (resposta.ok) {
        localStorage.setItem('accessToken', token);
        alert("Usuário logado com sucesso!");
        window.location.href = "/home";
      } 
      else {
        setError('email', true);
        setError('senha', true);
        setTimeout(() => {
            setError('email', false);
            setError('senha', false);
        }, 6000);
        setErroMsg('senha', 'Email ou senha incorretos!')
        return;
      }
    } catch (err) {
      console.error(err);
    }
  };

  return {
    handleChange,
    handleSubmit,
    campos,
    verificarErro,
  };
};
