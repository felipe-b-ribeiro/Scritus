import { useEffect, useState } from "react";
import usePerfilHook from "./hooks/usePerfilHook";
import decodificarJWT from "../../utils/decodificarJWT";

import { Cabecalho, CabecalhoCentro, CabecalhoDireita, CabecalhoEsquerda } from "../../components/Cabecalho";
import Logo from "../../components/LogoScritus";
import ContainerBasico from "../../components/ContainerBasico";
import Linha from "../../components/LinhaDegrade";
import BotaoSimples from '../../components/BotaoSimples';
import InputBasico from "../../components/InputBasico";
import ArrowIcon from "../../components/icons/arrowIcon";
import TagTipoUsuario from "../../components/TagTipoUsuario";

import { CAMPOS_EDIT } from "../../constants/userConstants";

const PaginaPerfil = () => {

    const [tipoUsuario, setTipoUsuario] = useState('');
    const { puxarDados, verificarErro, handleChange, handleBlur, dados } = usePerfilHook();

    useEffect(() => {
    const carregarPerfil = async () => {

      if (document.fonts) await document.fonts.ready;

      // Espera dados iniciais
      const token = localStorage.getItem("accessToken");
      const payload = await decodificarJWT(token) || {};
      setTipoUsuario(payload.tipoUsuario);
      await puxarDados(payload.email, payload.tipoUsuario);
    };
    carregarPerfil();
    }, []);

    const renderInputs = () => {
         
        if (!tipoUsuario || !dados) return null;

        console.log(dados);
        
        const hoje = new Date().toISOString().split('T')[0];

        return Object.entries(CAMPOS_EDIT[tipoUsuario]).map(([campo, meta]) => {

        const erroMsg = dados[campo]?.erroMsg;

            return (
            <InputBasico
                key={campo}
                name={campo}
                value={dados[campo].valor}
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
            )
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
            <ContainerBasico text="Seu Perfil">
                <form>
                    {/* <img src={} alt="" /> */}
                    <TagTipoUsuario tipo={tipoUsuario} />
                    {dados && Object.keys(dados).length > 0 ? renderInputs() : <p>Carregando...</p>}
                    <div className="flx">
                        <BotaoSimples type='submit'>Salvar</BotaoSimples>
                        <BotaoSimples variant='cancel'>Cancelar</BotaoSimples>
                    </div>
                </form>
            </ContainerBasico>
        </>
    );

}

export default PaginaPerfil;