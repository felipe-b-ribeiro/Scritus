import { useEffect, useState } from "react";
import puxarDadosHook from "../../../hooks/puxarDadosHook.js";
import useNavigateCustom from "../../../hooks/useNavigateCustom.js";
import decodificarJWT from "../../../utils/decodificarJWT.js";

const useHomeHook = () => {
  const [overlay, setOverlay] = useState({
    state: "closed",
    action: null,
  });
  const [logoutModalState, setLogoutModalState] = useState("closed");
  const [menuState, setMenuState] = useState("closed");
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState({ tipoUsuario: "", nome: "" });
  const [foto, setFoto] = useState(null);
  const [obras, setObras] = useState([]);

  const { puxarDados } = puxarDadosHook();

  useEffect(() => {
    const carregarHome = async () => {
      try {
        if (document.fonts) await document.fonts.ready;

        const token = localStorage.getItem("accessToken");
        const payload = (await decodificarJWT(token)) || {};
        const { tipoUsuario } = payload;

        const usuario = await puxarDados(payload.email, payload.tipoUsuario);

        let nome;
        switch (tipoUsuario) {
          case "Leitor":
            nome = usuario.usuario.apelido;
            break;
          case "Autor":
            nome = usuario.usuario.pseudonimo ?? usuario.usuario.nome_autor;
            break;
          case "Editora":
            nome = usuario.usuario.nome_fantasia;
            break;
          default: break; 
        }

        setUsuario({ tipoUsuario: tipoUsuario, nome: nome });

        if (foto === null) setFoto(`${usuario.usuario.foto_perfil_url}`);

        const resp = await fetch(`/api/v1/obra`);
        if (!resp.ok) throw new Error("Erro ao buscar obras");
        const data = await resp.json();
        setObras(data);
      } catch (err) {
        console.error("Erro ao carregar home:", err);
      } finally {
        setLoading(false);
      }
    };
    carregarHome();
  }, [foto, puxarDados]);

  useEffect(() => {
    if (overlay.state === "entering") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [overlay.state]);

  const { goTo } = useNavigateCustom();

  const btnSair = () => {
    setOverlay({ state: "entering", action: sairCancel });
    setLogoutModalState("entering");
  };

  const sairConfirm = () => {
    setOverlay({ ...overlay, state: "leaving" });
    setLogoutModalState("leaving");
    localStorage.removeItem("accessToken");
    goTo("/");
  };

  const sairCancel = () => {
    setLogoutModalState("leaving");
    menuState === "closed"
      ? setOverlay({ ...overlay, state: "leaving" })
      : setOverlay({ ...overlay, action: closeMenu });
    setTimeout(() => {
      setLogoutModalState("closed");
      menuState === "closed" && setOverlay({ ...overlay, state: "closed" });
    }, 500);
  };

  const closeMenu = () => {
    setMenuState("leaving");
    setOverlay({ ...overlay, state: "leaving" });
    setTimeout(() => {
      setMenuState("closed");
      setOverlay({ ...overlay, state: "closed" });
    }, 500);
  };

  const openMenu = () => {
    setOverlay({ state: "entering", action: closeMenu });
    setMenuState("entering");
  };

  return {
    logoutModalState,
    btnSair,
    sairConfirm,
    sairCancel,
    menuState,
    openMenu,
    closeMenu,
    overlayState: overlay.state,
    overlayAction: overlay.action,
    obras,
    usuario,
    loading,
    foto,
  };
};

export default useHomeHook;
