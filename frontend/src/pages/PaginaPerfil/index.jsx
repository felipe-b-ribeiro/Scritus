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
import FotoPadrao from "../../assets/foto_perfil_padrao.png";

import { CAMPOS_EDIT, FORMS_POR_USUARIO_EDIT } from "../../constants/userConstants";
import InputTextarea from "../../components/InputTextarea";

const PaginaPerfil = () => {

    const [tipoUsuario, setTipoUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [dados, setDados] = useState({});
    const { puxarDados, handleBlur} = usePerfilHook();
    const [preview, setPreview] = useState(FotoPadrao);
    const [foto, setFoto] = useState(null);


    useEffect(() => {
    const carregarPerfil = async () => {

      if (document.fonts) await document.fonts.ready;

      const token = localStorage.getItem("accessToken");
      const payload = await decodificarJWT(token) || {};
      setTipoUsuario(payload.tipoUsuario);
      setEmail(payload.email);
      const usuario = await puxarDados(payload.email, payload.tipoUsuario);
    
      const base = FORMS_POR_USUARIO_EDIT[payload.tipoUsuario];

      setDados(() => {
        const atualizado = Object.fromEntries(
            Object.entries(base).map(([campo, info]) =>  {
                const valor = campo === "data_nascimento" ? usuario.usuario[campo].split('T')[0] : usuario.usuario[campo];
                return [campo, { ...info, 'valor': valor }];
            }
            ));
        return { ...atualizado, foto_perfil_url: usuario.usuario.foto_perfil_url }
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

    function handleImagem(e) {
        const file = e.target.files[0];
        if (file) {
        setPreview(URL.createObjectURL(file));
        setFoto(file);
        }
    }

    
    const verificarErro = (campo) => {
        if (dados[campo].erro) return "Erro";
        if (dados[campo].validado) return "Sucesso";
        return null;
    }

    const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    if (dados.nome_usuario) formData.append("nome_usuario", dados.nome_usuario.valor);
    if (dados.nome_autor) formData.append("nome_autor", dados.nome_autor.valor);
    if (dados.nome_fantasia) formData.append("nome_fantasia", dados.nome_fantasia.valor);
    formData.append("bio", dados.bio.valor);
    if (dados.data_nascimento) formData.append("data_nascimento", dados.data_nascimento.valor);
    if (dados.pseudonimo) formData.append("pseudonimo", dados.pseudonimo.valor);
    if (dados.site_oficial) formData.append("site_oficial", dados.site_oficial.valor);
    formData.append("tipo_usuario", tipoUsuario);
    if (foto) formData.append("foto_perfil", foto);

    try {
        const resposta = await fetch("http://localhost:5000/api/v1/usuarios", {
            method: "PATCH",
            body: formData, // não precisa de headers Content-Type
        });
        const data = await resposta.json();
        if (resposta.ok) {
            alert('Usuário atualizado com sucesso');
        }
    } catch (err) {
        console.error("Erro:", err);
    }
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
            <ContainerBasico text="Seu Perfil">
                <form onSubmit={handleSubmit}>
                    {dados && Object.keys(dados).length > 0 ? (
                        <>  <label htmlFor="upload">
                                <img style={{ borderRadius: '50%', zIndex: 1, cursor: 'pointer'}} width="100" height="100" src={preview} alt="Foto de Perfil" />
                            </label>
                            <input type="file" id="upload" accept="image/*" style={{display: 'none'}} onChange={handleImagem} />
                            <TagTipoUsuario marginLeft='0px' marginTop='0px' marginBottom='15px' tipo={tipoUsuario} />
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