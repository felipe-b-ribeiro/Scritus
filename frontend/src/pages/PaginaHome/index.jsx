import decodificarJWT from '../../utils/decodificarJWT.js';
import useHomeHook from './hooks/useHomeHook.js';
import { useState, useEffect } from 'react';
import puxarDadosHook from '../../hooks/puxarDadosHook.js';
import useNavigateCustom from '../../hooks/useNavigateCustom.js';
import useTitulo from '../../hooks/useTitulo.js';
import Logo from '../../components/LogoScritus/index.jsx';
import Linha from '../../components/LinhaDegrade/index.jsx';
import BotaoLogout from '../../components/BotaoLogout/index.jsx';
import SeparadorVertical from '../../components/separadorVertical/index.jsx';
import { Cabecalho, CabecalhoCentro, CabecalhoEsquerda } from '../../components/Cabecalho/index.jsx';
import TextoBemVindo from '../../components/TextoBemVindo/index.jsx';
import TagTipoUsuario from '../../components/TagTipoUsuario/index.jsx';
import TituloBasico from '../../components/TituloBasico/index.jsx';
import ContainerHome from '../../components/ContainerHome/index.jsx';
import ContainerCarrosel from '../../components/ContainerCarrosel/index.jsx';
import LivroHome from '../../components/LivroHome/index.jsx';
import Overlay from '../../components/Overlay/index.jsx';
import LogoutModal from '../../components/LogoutModal/index.jsx';
import PaginaSplash from '../PaginaSplash/index.jsx';
import FotoPadrao from '../../assets/foto_perfil_padrao.png';
import { SC_WrapperMenuHome, SC_ButtonMenuHome } from '../../components/MenuHome/styles.js';
import IconCadastrarObra from '../../assets/icons/plusIcon.svg';
import IconMeusLivros from '../../assets/icons/bookshelf-icon.svg';
import FeedIcon from '../../assets/icons/feedIcon.png'
import FollowHomeIcon from '../../assets/icons/followHomeIcon.png';
import HomeIcon from '../../assets/icons/homeIcon.png';
import { SC_MenuBarInferior, SC_MenuBarButton } from './styles.js';
import livre from '../../assets/classificacao/livre.png';
import dez from '../../assets/classificacao/10.png';
import doze from '../../assets/classificacao/12.png';
import catorze from '../../assets/classificacao/14.png'
import dezesseis from '../../assets/classificacao/16.png';
import dezoito from '../../assets/classificacao/18.png';
import SavedIcon from '../../components/icons/savedIcon/index.jsx';
import HeartIcon from '../../components/icons/heartIcon/index.jsx';
import RecentIcon from '../../components/icons/recentIcon/index.jsx';

function PaginaHome() {

  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState({ "tipoUsuario": "", "nome": ""});
  const { btnSair, sairConfirm, sairCancel, showOverlay, showLogoutModal } = useHomeHook();
  const [foto, setFoto] = useState(FotoPadrao);
  const [obras, setObras] = useState([]);

  const { puxarDados } = puxarDadosHook();
  const { goTo } = useNavigateCustom();

  useTitulo('Home - Scritus');

  useEffect(() => {
    const carregarHome = async () => {
      try {
        if (document.fonts) await document.fonts.ready;

        const token = localStorage.getItem("accessToken");
        const payload = await decodificarJWT(token) || {};
        const { tipoUsuario } = payload;

        const usuario = await puxarDados(payload.email, payload.tipoUsuario);

        let nome;
        switch (tipoUsuario) {
          case 'Leitor':
            nome = usuario.usuario.apelido;
            break;
          case 'Autor':
            nome = usuario.usuario.pseudonimo ?? usuario.usuario.nome_autor;
            break;
          case 'Editora':
            nome = usuario.usuario.nome_fantasia;
            break;
        }

        setUsuario({"tipoUsuario": tipoUsuario, "nome": nome});

        if (usuario.usuario.foto_perfil_url === null) {
          setFoto(FotoPadrao);
        } else {
          setFoto(`http://localhost:5000${usuario.usuario.foto_perfil_url}`);
        }

        const resp = await fetch(`http://localhost:5000/api/v1/obra`);
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
  }, []);

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

  if (loading) return <PaginaSplash />;

  return (
    <> 
      { showOverlay && <Overlay />}
      { showLogoutModal && <LogoutModal confirmClick={sairConfirm} cancelClick={sairCancel}/> }
      <SC_MenuBarInferior onClick={() => goTo('/feed')}>
        <SC_MenuBarButton>
          <img width='22' height='22' src={FeedIcon} alt="Ícone do feed" />
        </SC_MenuBarButton>
        <SC_MenuBarButton onClick={(e) => {
          e.stopPropagation();
          window.location.reload()
          }}>
          <img width='36' height='36' src={HomeIcon} alt="Ícone do feed" />
        </SC_MenuBarButton>
        <SC_MenuBarButton onClick={(e) => {
          e.stopPropagation();
          goTo('/recentes')
          }}>
          <RecentIcon />
        </SC_MenuBarButton>
      </SC_MenuBarInferior>
      <Cabecalho>
        <CabecalhoEsquerda>
          <TextoBemVindo src={foto} usuario={usuario.nome} />
          <SeparadorVertical />
          <TagTipoUsuario tipo={usuario.tipoUsuario} />
          <BotaoLogout onClick={btnSair} />
        </CabecalhoEsquerda>
        <CabecalhoCentro>
          <Logo goTo={'/home'} />
        </CabecalhoCentro>
      </Cabecalho>

      <Linha />

      <SC_WrapperMenuHome>
      { usuario.tipoUsuario === 'Autor' &&
          <>
          <SC_ButtonMenuHome onClick={() => goTo('/cadastrar-obra')}>
            <img width='26' height='26' src={IconCadastrarObra} alt="Cadastrar Obras" />
          </SC_ButtonMenuHome> 
          <SC_ButtonMenuHome onClick={() => goTo('/minhas-obras')}>
            <img width='26' height='26' src={IconMeusLivros} alt="Meus Livros" />
          </SC_ButtonMenuHome>
          </> 
      }
      <SC_ButtonMenuHome onClick={() => goTo('/meus-salvos')}>
            <SavedIcon cor='#000000' height='30' width='30'/>
      </SC_ButtonMenuHome>
      <SC_ButtonMenuHome onClick={() => goTo('/minhas-curtidas')}>
            <HeartIcon cor='#000000' height='30' width='30'/>
      </SC_ButtonMenuHome>
      </SC_WrapperMenuHome>

      <ContainerHome>
        <TituloBasico>Navegue no Mundo Literário:</TituloBasico>

        {obras.length === 0 ? (
          <p style={{ textAlign: "center", fontFamily: "Cinzel", color: "var(--cor-principal)" }}>
            Nenhuma obra disponível no momento.
          </p>
        ) : (
          Array.from({ length: Math.ceil(obras.length / 5) }).map((_, i) => {
            const grupo = obras.slice(i * 5, i * 5 + 5);
            return (
              <ContainerCarrosel key={i}>
                {grupo.map((obra) => (
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                  <LivroHome
                    key={obra.id_obra}
                    src={obra.capa_url}
                    onClick={() => goTo(`/obra/${obra.id_obra}`)}
                  >
                    {console.log(obra.capa_url)}
                  <img style={{ zIndex: '5', position: 'relative', top: '-50px', left: '6px'}} width='40' height='40' src={imgClassificacao(obra.classificacao_indicativa)} alt="Classificação Indicativa" />
                  </LivroHome>
                  <h4 style={{marginTop: '7px', fontFamily: 'Cinzel', width: '200px', textAlign: 'center'}}>{obra.titulo}</h4>
                  <h6 style={{fontFamily: 'Cinzel', marginTop: '5px', color: 'var(--cor-principal)'}}>Escrito por {obra.pseudonimo || obra.nome_autor.split('')}</h6>
                  </div>
                ))}
              </ContainerCarrosel>
            );
          })
        )}
      </ContainerHome>
    </>
  );
}

export default PaginaHome;
