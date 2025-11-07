import { useState } from 'react';

import Logo from '../../components/LogoScritus';
import Linha from '../../components/LinhaDegrade';
import BotaoSimples from '../../components/BotaoSimples';
import { Cabecalho, CabecalhoCentro, CabecalhoDireita, CabecalhoEsquerda } from '../../components/Cabecalho';
import ArrowIcon from "../../components/icons/arrowIcon";
import { CAMPOS_OBRA } from '../../constants/userConstants';
import ContainerBasico from '../../components/ContainerBasico';
import InputBasico from '../../components/InputBasico';

function PaginaCadastroObras() {

  const [dados, setDados] = useState({
    obras: { valor: "", erro: false, erroMsg: "" },
    titulo: { valor: "", erro: false, erroMsg: "" },
    sinopse: { valor: "", erro: false, erroMsg: "" },
    trecho_de_amostra: { valor: "", erro: false, erroMsg: "" },
    status_obra: { valor: "", erro: false, erroMsg: "" },
    classificacao_indicativa: { valor: "", erro: false, erroMsg: "" }
  });

  const [capa, setCapa] = useState();
  const [pdf, setPdf] = useState();

  const handleChange = (e) => {
        const { name, value } = e.target;
        setDados(prev => ({
            ...prev, [name]: { ...prev[name], "valor": value }
        }));
    };
  
  const verificarErro = (campo) => {
        if (dados[campo].erro) return "Erro";
        if (dados[campo].validado) return "Sucesso";
        return null;
    }

  const renderInputs = () => {
  
          return Object.entries(CAMPOS_OBRA).map(([campo, meta]) => {
          
          const erroMsg = dados[campo]?.erroMsg;
          
          if (meta.tipo === "textarea") {
              return <InputTextarea 
                      onChange={handleChange} 
                      text={meta.label}
                      cols='20' 
                      rows='8'
                      key={campo}
                      name={campo}
                      value={dados[campo]?.valor ?? ""}
                       />
          } 
          else {
              return (
              <InputBasico
                  key={campo}
                  name={campo}
                  value={dados[campo].valor || ""}
                  onChange={handleChange}
                  onBlur={campo === 'email' || campo === 'nomeUsuario' || campo === 'cnpj' ? (e) => handleBlur(campo, e.target.value) : undefined}
                  onInvalid={(e) => e.preventDefault()}
                  text={meta.label}
                  type={meta.tipo}
                  required={meta.required}
                  className={verificarErro(campo) === "Erro" ? "input-error" : verificarErro(campo) === "Sucesso" ? "input-success" : ""}
                  max={meta.data ? hoje : undefined}
                  minLength={meta.minlength}
                  maxLength={meta.maxlength}
                  >
                  {verificarErro(campo) && erroMsg ? <ErrorHelper text={erroMsg}/> : null}
              </InputBasico>
              );
          }
  
          })
      }

  return (
    <>
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
      <ContainerBasico text='Cadastrar Obra'>
        <form >
          <label htmlFor="">
            <img src="" alt="Capa da Obra" />
          </label>
          { renderInputs() }
        </form>
      </ContainerBasico>
    </>
  );
}

export default PaginaCadastroObras;