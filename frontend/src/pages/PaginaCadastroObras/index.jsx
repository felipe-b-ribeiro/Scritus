import { useState, useEffect, useRef } from 'react';
import decodificarJWT from '../../utils/decodificarJWT';
import usePuxarDados from '../../hooks/puxarDadosHook';

import Logo from '../../components/LogoScritus';
import Linha from '../../components/LinhaDegrade';
import BotaoSimples from '../../components/BotaoSimples';
import { Cabecalho, CabecalhoCentro, CabecalhoEsquerda } from '../../components/Cabecalho';
import ArrowIcon from "../../components/icons/arrowIcon";
import { CAMPOS_OBRA } from '../../constants/userConstants';
import ContainerBasico from '../../components/ContainerBasico';
import InputBasico from '../../components/InputBasico';
import InputTextarea from '../../components/InputTextarea';
import CapaPadrao from '../../assets/foto_capa_padrao.png';
import Choices from "choices.js";
import "choices.js/public/assets/styles/choices.min.css";
import PaginaSplash from "../PaginaSplash";
import './choicesChoices.css';
import './selectEstilization.css';
import Folder from '../../components/Folder';
import Overlay from '../../components/Overlay';

function PaginaCadastroObras() {
  const [dados, setDados] = useState({
    obras: { valor: "", erro: false, erroMsg: "" },
    titulo: { valor: "", erro: false, erroMsg: "" },
    sinopse: { valor: "", erro: false, erroMsg: "" },
    trecho_de_amostra: { valor: "", erro: false, erroMsg: "" },
    status_obra: { valor: "", erro: false, erroMsg: "" },
    classificacao_indicativa: { valor: "", erro: false, erroMsg: "" },
  });

  const [preview, setPreview] = useState(CapaPadrao);
  const [capa, setCapa] = useState();
  const [pdf, setPdf] = useState();
  const [carregando, setCarregando] = useState(true);
  const [tags, setTags] = useState([]);
  const [idAutor, setIdAutor] = useState();
  const [overlay, setOverlay] = useState(false);

  const selectRef = useRef(null);
  const choicesRef = useRef(null);

  const { puxarDados } = usePuxarDados();

  // Busca as tags do back-end
useEffect(() => {
  const carregarTags = async () => {
    try {
      const resp = await fetch("http://localhost:5000/api/v1/tags");
      if (!resp.ok) {
        throw new Error(`Erro HTTP: ${resp.status}`);
      }

      const data = await resp.json();
      // Se vier dentro de um objeto (ex: { tags: [...] })
      const lista = Array.isArray(data.tags) ? data.tags :  [];
      setTags(lista);

      const token = localStorage.getItem("accessToken");
      const payload = await decodificarJWT(token) || {};

      const usuario = await puxarDados(payload.email, payload.tipoUsuario);
      setIdAutor(usuario.usuario.id_autor);

    } catch (err) {
      console.error("Erro ao buscar tags:", err);
      setTags([]); // Fallback pra evitar loop infinito
    } finally {
      setCarregando(false); // Sempre sai do loading, mesmo com erro
    }
  };

  carregarTags();
}, []);

// Inicializa o Choices.js quando as tags estiverem carregadas
useEffect(() => {
  if (!carregando && tags.length > 0 && selectRef.current) {
    choicesRef.current = new Choices(selectRef.current, {
      removeItemButton: true,
      maxItemCount: 5,
      searchEnabled: true,
      placeholderValue: "Selecione até 5 tags",
      itemSelectText: '',
      maxItemText: (maxItemCount) => `Você só pode selecionar até ${maxItemCount} tags.`
    });
  }
}, [carregando, tags]);


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

    formData.append('id_autor', idAutor);

    // Adiciona todos os campos de texto, exceto os selects tratados separadamente
    Object.entries(dados).forEach(([campo, valorObj]) => {
      if (campo !== "status_obra" && campo !== "classificacao_indicativa") {
        formData.append(campo, valorObj.valor);
      }
    });

    // Adiciona o arquivo da capa, se existir
    if (capa) {
      formData.append("capa", capa);
    }

    // Adiciona o PDF, se existir
    if (pdf) {
      formData.append("pdf", pdf);
    }

    // Adiciona as tags selecionadas (Choices.js)
    const tagsSelecionadas = Array.from(
      selectRef.current.selectedOptions
    ).map(opt => opt.value);

    formData.append("tags", JSON.stringify(tagsSelecionadas));

    // Adiciona as opções de selects simples
    const privacidade = document.getElementById("privaObra").value;
    const classificacao = document.getElementById("classInd").value;
    formData.append("status_obra", privacidade);
    formData.append("classificacao_indicativa", classificacao);

    // Envia via fetch
    const resposta = await fetch("http://localhost:5000/api/v1/obra", {
      method: "POST",
      body: formData,
    });


    if (resposta.ok) {
      setOverlay(true);
      setTimeout(() => {
        alert("Obra cadastrada com sucesso!");
        window.location.href = '/minhasobras';
      }, 200);
      
    }


  } catch (err) {
    console.error("Erro no envio:", err);
    alert("Erro ao enviar os dados. Veja o console para mais detalhes.");
  }
};

  const renderInputs = () => {
    return Object.entries(CAMPOS_OBRA).map(([campo, meta]) => {
      const erroMsg = dados[campo]?.erroMsg;

      if (meta.tipo === "textarea") {
        return (
          <InputTextarea
            onChange={handleChange}
            text={meta.label}
            cols="20"
            rows="8"
            key={campo}
            name={campo}
            value={dados[campo]?.valor ?? ""}
            required
          />
        );
      } else {
        return (
          <InputBasico
            key={campo}
            name={campo}
            value={dados[campo].valor || ""}
            onChange={handleChange}
            onInvalid={(e) => e.preventDefault()}
            text={meta.label}
            type={meta.tipo}
            required={meta.required}
            className={
              verificarErro(campo) === "Erro"
                ? "input-error"
                : verificarErro(campo) === "Sucesso"
                ? "input-success"
                : ""
            }
            minLength={meta.minlength}
            maxLength={meta.maxlength}
          >
            {verificarErro(campo) && erroMsg ? <ErrorHelper text={erroMsg} /> : null}
          </InputBasico>
        );
      }
    });
  };

  if (carregando) {
    return <PaginaSplash />;
  }

  return (
    <>
      { overlay && <Overlay />}
      <Cabecalho>
        <CabecalhoEsquerda>
          <BotaoSimples back variant="secondary" className="btn-icone">
            <ArrowIcon />
            <span>Voltar</span>
          </BotaoSimples>
        </CabecalhoEsquerda>
        <CabecalhoCentro>
          <Logo />
        </CabecalhoCentro>
      </Cabecalho>
      <Linha />
      <ContainerBasico width="50vw" text="Cadastrar Obra">
        <form onSubmit={handleSubmit}>
          <div style={{position: 'relative', right: '30px'}} className='flx'>
            <label htmlFor="capa">
              <img
                width="200"
                height="300"
                src={preview}
                alt="Capa da Obra"
                style={{
                  borderRadius: "20px",
                  marginBottom: "20px",
                  cursor: "pointer",
                }}
              />
            </label>
            <Folder size={1.5} color="#cb8446" setPdf={setPdf} pdf={pdf} />
          </div>
          <input
            type="file"
            id="capa"
            style={{ display: "none" }}
            onChange={handleImagem}
          /> 

          {renderInputs()}

          <label htmlFor="tags">Quais as tags da sua Obra?</label>
          <select ref={selectRef} id="tags" name="tags" multiple>
            {tags.map((tag) => (
              <option key={tag.nome_tag} value={tag.nome_tag}>
                {tag.nome_tag}
              </option>
            ))}
          </select>
          <label htmlFor="privaObra">Qual a privacidade da sua obra?</label>
          <select name="privaObra" id="privaObra">
            <option value="Rascunho">Rascunho</option>
            <option value="Privado">Privado</option>
            <option value="Público">Público</option>
          </select>
          <label htmlFor="classInd">Qual a classificação indicativa da sua obra?</label>
          <select name="classInd" id="classInd">
            <option value="Livre">Livre</option>
            <option value="10">10 Anos</option>
            <option value="12">12 Anos</option>
            <option value="14">14 Anos</option>
            <option value="16">16 Anos</option>
            <option value="18">18 Anos</option>
          </select>
          <div className='flx'>
            <BotaoSimples type='submit'>Cadastrar</BotaoSimples>
            <BotaoSimples type='button' variant='cancel' onClick={() => history.back()}>Cancelar</BotaoSimples>
          </div>
        </form>
      </ContainerBasico>
    </>
  );
}

export default PaginaCadastroObras;
