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
import Spinner from "../../components/Spinner";


import { CAMPOS_EDIT, FORMS_POR_USUARIO_EDIT } from "../../constants/userConstants";
import InputTextarea from "../../components/InputTextarea";

const PaginaPerfil = () => {

    const [tipoUsuario, setTipoUsuario] = useState('');
    const [dados, setDados] = useState({});
    const { puxarDados, verificarErro, handleBlur} = usePerfilHook();

    useEffect(() => {
    const carregarPerfil = async () => {

      if (document.fonts) await document.fonts.ready;

      const token = localStorage.getItem("accessToken");
      const payload = await decodificarJWT(token) || {};
      setTipoUsuario(payload.tipoUsuario);
      const usuario = await puxarDados(payload.email, payload.tipoUsuario);

      const base = FORMS_POR_USUARIO_EDIT[payload.tipoUsuario];

      setDados(() => {
        const atualizado = Object.fromEntries(
            Object.entries(base).map(([campo, info]) =>  {
                const valor = campo === "data_nascimento" ? usuario.usuario[campo].split('T')[0] : usuario.usuario[campo];
                return [campo, { ...info, 'valor': valor }];
            }
            ));
        return atualizado;
      });
    };
    carregarPerfil();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDados(prev => ({
            ...prev, [name]: { ...prev[name], "valor": value }
        }));
    };

    const renderInputs = () => {
         
        if (!tipoUsuario || !dados) return null;

        
        const hoje = new Date().toISOString().split('T')[0];

        return Object.entries(CAMPOS_EDIT[tipoUsuario]).map(([campo, meta]) => {
        
        const erroMsg = dados[campo]?.erroMsg;
        
        if (meta.tipo === "textarea") {
            return <InputTextarea text='Biografia' cols='20' rows='8' />
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
                // className={verificarErro(campo) === "Erro" ? "input-error" : verificarErro(campo) === "Sucesso" ? "input-success" : ""}
                max={meta.data ? hoje : undefined}
                minLength={meta.minlength}
                maxLength={meta.maxlength}
                >
                {/*verificarErro(campo) && erroMsg ? <ErrorHelper text={erroMsg}/> : null*/}
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
            <ContainerBasico text="Seu Perfil">
                <form>
                    {dados && Object.keys(dados).length > 0 ? (
                        <>
                            <TagTipoUsuario tipo={tipoUsuario} />
                            {renderInputs()}
                        </>
                        ) : (
                        <Spinner />
                    )}

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