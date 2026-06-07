import Choices from "choices.js";
import { useEffect, useRef, useState } from "react";
import usePuxarDados from "../../../hooks/puxarDadosHook";
import useNavigateCustom from "../../../hooks/useNavigateCustom";
import decodificarJWT from "../../../utils/decodificarJWT";

const useCadastroObras = () => {
  const { puxarDados } = usePuxarDados();
  const { goTo } = useNavigateCustom();

  const [dados, setDados] = useState({
    obras: { valor: "", erro: false, erroMsg: "" },
    titulo: { valor: "", erro: false, erroMsg: "" },
    sinopse: { valor: "", erro: false, erroMsg: "" },
    trecho_de_amostra: { valor: "", erro: false, erroMsg: "" },
    status_obra: { valor: "", erro: false, erroMsg: "" },
    classificacao_indicativa: { valor: "", erro: false, erroMsg: "" },
  });

  const [preview, setPreview] = useState(
    "/uploads/padrao/capa_livro_padrao.webp",
  );
  const [capa, setCapa] = useState();
  const [pdf, setPdf] = useState();
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);
  const [idAutor, setIdAutor] = useState();
  const [overlayState, setOverlayState] = useState("closed");

  const selectRef = useRef(null);
  const choicesRef = useRef(null);

  useEffect(() => {
    const carregarTags = async () => {
      try {
        const resp = await fetch("/api/v1/tags");
        if (!resp.ok) {
          throw new Error(`Erro HTTP: ${resp.status}`);
        }

        const data = await resp.json();
        const lista = Array.isArray(data.tags) ? data.tags : [];
        setTags(lista);

        const token = localStorage.getItem("accessToken");
        const payload = (await decodificarJWT(token)) || {};

        const usuario = await puxarDados(payload.email, payload.tipoUsuario);
        setIdAutor(usuario.usuario.id_autor);
      } catch (err) {
        console.error("Erro ao buscar tags:", err);
        setTags([]);
      } finally {
        setLoading(false);
      }
    };

    carregarTags();
  }, [puxarDados]);

  useEffect(() => {
  if (!loading && tags.length > 0 && selectRef.current) {
    if (!choicesRef.current) {
      choicesRef.current = new Choices(selectRef.current, {
        removeItemButton: true,
        maxItemCount: 5,
        searchEnabled: true,
        placeholderValue: "Selecione até 5 tags",
        itemSelectText: "",
        maxItemText: (maxItemCount) =>
          `Você só pode selecionar até ${maxItemCount} tags.`,
      });

      setTimeout(() => {
      const searchInput = document.querySelector('.choices__input--cloned');
      if (searchInput && !searchInput.hasAttribute('name')) {
        searchInput.setAttribute('name', 'buscaTags');
        searchInput.setAttribute('id', 'buscaTags');
      }
    }, 100);
    }
  }

  return () => {
    if (choicesRef.current) {
      choicesRef.current.destroy();
      choicesRef.current = null;
    }
  };
}, [loading, tags]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDados((prev) => ({
      ...prev,
      [name]: { ...prev[name], valor: value },
    }));
  };

  const handleImagem = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setCapa(file);
    }
  };

  const verificarErro = (campo) => {
    if (dados[campo].erro) return "Erro";
    if (dados[campo].validado) return "Sucesso";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("id_autor", idAutor);

      Object.entries(dados).forEach(([campo, valorObj]) => {
        if (campo !== "status_obra" && campo !== "classificacao_indicativa") {
          formData.append(campo, valorObj.valor);
        }
      });

      if (capa) {
        formData.append("capa", capa);
      }

      if (pdf) {
        formData.append("pdf", pdf);
      }

      const tagsSelecionadas = Array.from(
        selectRef.current.selectedOptions,
      ).map((opt) => opt.value);

      formData.append("tags", JSON.stringify(tagsSelecionadas));

      const privacidade = document.getElementById("privaObra").value;
      const classificacao = document.getElementById("classInd").value;
      formData.append("status_obra", privacidade);
      formData.append("classificacao_indicativa", classificacao);

      const resposta = await fetch(" /api/v1/obra", {
        method: "POST",
        body: formData,
      });

      if (resposta.ok) {
        setOverlayState("entering");
        setTimeout(() => {
          alert("Obra cadastrada com sucesso!");
          setOverlayState("leaving");
          goTo("/minhas-obras");
        }, 500);
      }
    } catch (err) {
      console.error("Erro no envio:", err);
      alert("Erro ao enviar os dados. Veja o console para mais detalhes.");
    }
  };

  return {
    dados,
    preview,
    loading,
    tags,
    idAutor,
    overlayState,
    selectRef,
    handleChange,
    handleImagem,
    verificarErro,
    handleSubmit,
    setPdf,
  };
};

export default useCadastroObras;
