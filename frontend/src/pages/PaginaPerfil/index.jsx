import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useNavigateCustom from '../../hooks/useNavigateCustom';
import useTitulo from "../../hooks/useTitulo";
import Logo from '../../components/LogoScritus';
import Linha from '../../components/LinhaDegrade';
import TagList from '../../components/Tag';
import BotaoSimples from '../../components/BotaoSimples';
import { Cabecalho, CabecalhoCentro, CabecalhoEsquerda } from '../../components/Cabecalho';
import ArrowIcon from "../../components/icons/arrowIcon";
import Arrow2Icon from '../../components/icons/arrow2Icon';
import PlusIcon from '../../components/icons/plusIcon';
import Correct2Icon from '../../components/icons/correct2Icon';
import PaginaSplash from '../PaginaSplash';
import ContainerBasico from '../../components/ContainerBasico';
import livre from '../../assets/classificacao/livre.png';
import dez from '../../assets/classificacao/10.png';
import doze from '../../assets/classificacao/12.png';
import catorze from '../../assets/classificacao/14.png'
import dezesseis from '../../assets/classificacao/16.png';
import dezoito from '../../assets/classificacao/18.png';
import LivroHome from '../../components/LivroHome';
import decodificarJWT from '../../utils/decodificarJWT';
import { SC_FotoPerfil,
    SC_NomeUsuario,
    SC_Pseudonimo,
    SC_Biografia,
    SC_Tag,
    SC_BotaoSeguir,
    SC_Seguidores } from './styles';
import fotoPadrao from '../../assets/foto_perfil_padrao.png';

function PaginaPerfil() {

    const { id_perfil_autor } = useParams();
    const [perfil, setPerfil] = useState();
    const [idPerfilSeguidor, setIdPerfilSeguidor] = useState();
    const [loading, setLoading] = useState(true);
    const [seguindo, setSeguindo] = useState(false);
    const [obras, setObras] = useState([]);

    const { goTo } = useNavigateCustom();

    useEffect(() => {
        const carregarPagina = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const { id_perfil } = await decodificarJWT(token);
                setIdPerfilSeguidor(id_perfil);
                if (id_perfil_autor !== id_perfil) {
                    const resposta = await fetch(`http://localhost:5000/api/v1/seguidor/verificar`, {
                        method: 'POST',
                        headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({"id_seguidor": id_perfil, "id_seguido": id_perfil_autor})
                    })
                    const jaSegue = await resposta.json();
                    if (jaSegue) setSeguindo(true);
                }
                const perfil = await fetch(`http://localhost:5000/api/v1/usuarios/perfil/${id_perfil_autor}`);
                if (!perfil.ok) throw new Error('Erro ao buscar perfil.');
                const dataPerfil = await perfil.json();
                setPerfil(dataPerfil);
                if (dataPerfil.tipo_usuario === 'Autor') {
                    const resp = await fetch(
                    `http://localhost:5000/api/v1/obra/autor/${dataPerfil.id_autor}`
                    );
                    if (!resp.ok) throw new Error("Erro ao buscar obras");

                    const data = await resp.json();
                    setObras(data);
                }
            } catch (err) {
                console.error('Erro ao carregar perfil: ', err);
            } finally {
                setLoading(false);
            }
        }
        carregarPagina();
    }, [id_perfil_autor] );

    useTitulo(`Perfil - Scritus`);

    const imgClassificacao = (idade) => {
      
          let imagem;
      
          switch (idade) {
            case 'Livre': imagem = livre; break;
            case '10': imagem = dez; break;
            case '12': imagem = doze; break;
            case '14': imagem = catorze; break;
            case '16': imagem = dezesseis; break;
            case '18': imagem = dezoito; break;
          }
      
          return imagem;
        }

    const criarSeguidor = async (seguidorObj) => {
    try {
        await fetch("http://localhost:5000/api/v1/seguidor", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(seguidorObj),
        });
    } catch (err) {
        console.error("Erro ao enviar interação:", err);
    }
    };

    let timerCriar;
    const criarSeguidorDebounced = (obj) => {
        return () => {
            clearTimeout(timerCriar);
            timerCriar = setTimeout(() => criarSeguidor(obj), 500);
        };
    }

    const excluirSeguidor = async (seguidorObj) => {
        try {
            await fetch("http://localhost:5000/api/v1/seguidor", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(seguidorObj),
            });
        } catch (err) {
            console.error("Erro ao deletar seguidor:", err);
        }
    }

    let timerExcluir;
    const excluirSeguidorDebounced = (obj) => {
        return () => {
            clearTimeout(timerExcluir);
            timerExcluir = setTimeout(() => excluirSeguidor(obj), 1000);
        };
    }

    const handleSeguidor = () => {

            if (!seguindo) {
                criarSeguidorDebounced({
                    id_perfil: id_perfil_autor,
                    id_perfil_seguidor: idPerfilSeguidor,
                })();
            } else {
                excluirSeguidorDebounced({
                    id_perfil: id_perfil_autor,
                    id_perfil_seguidor: idPerfilSeguidor,
                })();
            }     
            setSeguindo(!seguindo);
    };

    if (loading) return <PaginaSplash />;

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
        <ContainerBasico width='90vw' direction='row' align='normal' padding='20px'>
            <div className='flx' style={{alignItems:' center'}}>
                <SC_FotoPerfil src={perfil.foto_perfil_url ? `http://localhost:5000${perfil.foto_perfil_url}` : fotoPadrao} />
                <div>
                <SC_Tag tipo={perfil.tipo_usuario}>
                {perfil.tipo_usuario}
                </SC_Tag>
                <SC_NomeUsuario>{perfil.nome_usuario}</SC_NomeUsuario>
                {perfil.tipo_usuario === 'Autor' && perfil.pseudonimo ? <SC_Pseudonimo>{perfil.pseudonimo}</SC_Pseudonimo> : null}
                <div className='flx' style={{alignItems: 'center', gap: '8px', marginTop: '10px'}}>
                <div className='flx' style={{marginLeft: '50px', gap: '8px'}}>
                {perfil.tipo_usuario === 'Autor' ? (
                    <>
                        {Number(id_perfil_autor) === Number(idPerfilSeguidor) ? null : (
                            <SC_BotaoSeguir onClick={handleSeguidor}>
                                {seguindo ? 'Seguindo' : 'Seguir'}
                                {seguindo ? <Correct2Icon /> : <PlusIcon />}
                            </SC_BotaoSeguir>
                        )}

                        <SC_Seguidores>
                            {`${perfil.seguidores} ${perfil.seguidores > 1 ? 'seguidores' : 'seguidor'}`}
                        </SC_Seguidores>
                    </>
                ) : null}
        
                </div>
                </div>
                </div>
                <div className='flx'>
                    <SC_Biografia>
                        {perfil.bio ? perfil.bio : 'Esse usuário não tem biografia.'}
                    </SC_Biografia>
                </div>
            </div>
        </ContainerBasico>
        { perfil.tipo_usuario === 'Autor' ?
        <ContainerBasico width='90vw' direction='row' align='normal' padding='20px'>
            {Array.from({ length: Math.ceil(obras.length / 3) }).map((_, i) => {
            const grupo = obras.slice(i * 3, i * 3 + 3);
            return ( obras.length === 0 ? <p>Esse usuário não possui obras cadastradas</p> :
              <div
                key={i}
                className="flx"
                style={{
                  marginBottom: "20px",
                  justifyContent: "center",
                  gap: '8px'
                }}
              >
                {grupo.map((obra) => (
                  <div
                    key={obra.id_obra}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      cursor: "pointer",
                      width: "fit-content",
                    }}
                  >
                    <LivroHome
                      src={obra.capa_url}
                      onClick={() => goTo(`/obra/${obra.id_obra}`)}
                    >
                      <img style={{ zIndex: '5', position: 'relative', top: '-50px', left: '6px'}} width='40' height='40' src={imgClassificacao(obra.classificacao_indicativa)} alt="Classificação Indicativa" />
                    </LivroHome>
                    <h4
                      style={{
                        color: "var(--cor-principal)",
                        fontFamily: "Cinzel",
                        marginTop: "10px",
                        textAlign: "center",
                        maxWidth: '200px'
                      }}
                    >
                      {obra.titulo}
                    </h4>
                    <h6 style={{fontWeight: 'normal', fontFamily: 'Raleway', marginTop: '3px'}}>
                      {obra.status_obra}
                    </h6>
                  </div>
                ))}
              </div>
            );
          })}
        </ContainerBasico>
        : null}
        </>
        
    );
}

export default PaginaPerfil;