import { useEffect, useState } from "react";
import { FORMS_POR_USUARIO_EDIT } from "../../../constants/userConstants";
import puxarDadosHook from "../../../hooks/puxarDadosHook";
import decodificarJWT from "../../../utils/decodificarJWT";

const useEditarPerfil = () => {
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [dados, setDados] = useState({});
  const { puxarDados, handleBlur } = puxarDadosHook();
  const [preview, setPreview] = useState(null);
  const [foto, setFoto] = useState(null);
  const [overlayState, setOverlayState] = useState("closed");
  const [deleteModalState, setDeleteModalState] = useState("closed");

  useEffect(() => {
    const carregarPerfil = async () => {
      if (document.fonts) await document.fonts.ready;

      const token = localStorage.getItem("accessToken");
      const payload = (await decodificarJWT(token)) || {};
      setTipoUsuario(payload.tipoUsuario);
      setEmail(payload.email);

      const usuario = await puxarDados(payload.email, payload.tipoUsuario);
      const base = FORMS_POR_USUARIO_EDIT[payload.tipoUsuario];

      setDados(() => {
        const atualizado = Object.fromEntries(
          Object.entries(base).map(([campo, info]) => {
            const valor =
              campo === "data_nascimento"
                ? usuario.usuario[campo].split("T")[0]
                : usuario.usuario[campo];
            return [campo, { ...info, valor }];
          }),
        );
        return {
          ...atualizado,
          foto_perfil_url: usuario.usuario.foto_perfil_url,
        };
      });

      if (preview === null && usuario.usuario.foto_perfil_url) {
        setPreview(usuario.usuario.foto_perfil_url);
      }
    };

    carregarPerfil();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDados({
      ...dados,
      [name]: {
        ...dados[name],
        valor: value
      }
    });
  };

  const handleImagem = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFoto(file);
    }
  };

  const openModal = () => {
    setOverlayState("entering");
    setDeleteModalState("entering");
  };

  const handleCancelModal = () => {
    setOverlayState("leaving");
    setDeleteModalState("leaving");

    setTimeout(() => {
      setOverlayState("closed");
      setDeleteModalState("closed");
    }, 800);
  };

  const handleDeleteAccount = async () => {
    try {
      const resposta = await fetch(" /api/v1/usuarios", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (resposta.ok) {
        if (localStorage.getItem("accessToken"))
          localStorage.removeItem("accessToken");
        alert("Conta deletada com sucesso!");
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Erro ao deletar conta:", err);
    }
  };

  const verificarErro = (campo) => {
    if (dados[campo].erro) return "Erro";
    if (dados[campo].validado) return "Sucesso";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    if (dados.apelido) formData.append("nome_usuario", dados.apelido.valor);
    if (dados.nome_autor) formData.append("nome_autor", dados.nome_autor.valor);
    if (dados.nome_fantasia)
      formData.append("nome_fantasia", dados.nome_fantasia.valor);
    formData.append("bio", dados.bio.valor);
    if (dados.data_nascimento)
      formData.append("data_nascimento", dados.data_nascimento.valor);
    if (dados.pseudonimo) formData.append("pseudonimo", dados.pseudonimo.valor);
    if (dados.site_oficial)
      formData.append("site_oficial", dados.site_oficial.valor);
    formData.append("tipo_usuario", tipoUsuario);
    if (foto) formData.append("foto_perfil", foto);

    try {
      const resposta = await fetch("/api/v1/usuarios", {
        method: "PATCH",
        body: formData,
      });
      if (resposta.ok) {
        setOverlayState(true);
        setTimeout(() => {
          alert("Perfil de usuário atualizado com sucesso!");
          window.location.href = "/home";
        }, 200);
      }
    } catch (err) {
      console.error("Erro ao atualizar usuário:", err);
    }
  };

  return {
    tipoUsuario,
    email,
    dados,
    preview,
    handleChange,
    handleImagem,
    handleCancelModal,
    handleDeleteAccount,
    verificarErro,
    handleSubmit,
    handleBlur,
    overlayState,
    deleteModalState,
    openModal,
  };
};

export default useEditarPerfil;
