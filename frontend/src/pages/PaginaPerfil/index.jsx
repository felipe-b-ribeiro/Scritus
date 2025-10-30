import { useEffect } from "react";
import usePerfilHook from "./hooks/usePerfilHook";
import decodificarJWT from "../../utils/decodificarJWT";

import { Cabecalho, CabecalhoCentro, CabecalhoDireita, CabecalhoEsquerda } from "../../components/Cabecalho";
import Logo from "../../components/LogoScritus";
import ContainerBasico from "../../components/ContainerBasico";
import Linha from "../../components/LinhaDegrade";
import BotaoSimples from '../../components/BotaoSimples';
import InputBasico from "../../components/InputBasico";
import ArrowIcon from "../../components/icons/arrowIcon";
import { CAMPOS } from "../../constants/userConstants";
import { useState } from "react";

const PaginaPerfil = () => {

    const [dados, setDados] = useState({});

    const { puxarDados } = usePerfilHook();

    useEffect(() => {
    const carregarPerfil = async () => {
      // Espera fontes
      if (document.fonts) await document.fonts.ready;

      // Espera dados iniciais
      const token = localStorage.getItem("accessToken");
      const payload = await decodificarJWT(token) || {};
      const dados = await puxarDados(payload.email, payload.tipoUsuario);
      setDados({dados});
    };
    carregarPerfil();
    }, []);

    const renderInputs = () => {
         
        if (!dados.tipoUsuario) return null;

        return Object.entries(CAMPOS[tipoUsuario]).map(([campo, meta]) => {

            return (
            <InputBasico
                key={campo}
                name={campo}
                value={dados[campo]}
                // onChange={handleChange}
                // onFocus={() => handleFocus(campo)}
                // onBlur={campo === 'email' || campo === 'nomeUsuario' || campo === 'cnpj' ? (e) => handleBlur(campo, e.target.value) : undefined}
                // onInvalid={(e) => e.preventDefault()}
                // text={meta.label}
                type={meta.senha && senhaVisivel[campo] ? 'text' : meta.tipo}
                // required={meta.required}
                // className={verificarErro(campo) === "Erro" ? "input-error" : verificarErro(campo) === "Sucesso" ? "input-success" : ""}
                // max={meta.data ? hoje : undefined}
                // minLength={meta.minlength}
                >
                {/* // {meta.senha && <EyeIcon aberto={!senhaVisivel[campo]} onClick={() => setSenhaVisivel(prev => ({ ...prev, [campo]: !prev[campo] }))} />}
                // {verificarErro(campo) && erroMsg ? <ErrorHelper text={erroMsg}/> : null} */}
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
        <div>
        {renderInputs()}
        </div>
        </ContainerBasico>
        </>
    );

}

export default PaginaPerfil;