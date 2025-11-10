import decodificarJWT from '../../utils/decodificarJWT.js';
import useHomeHook from './hooks/useHomeHook.js';
import { useState, useEffect } from 'react';
import puxarDadosHook from '../../hooks/puxarDadosHook.js';
import useNavigateCustom from '../../hooks/useNavigateCustom.js';
import useTitulo from '../../hooks/useTitulo.js';
import Logo from '../../components/LogoScritus/index.jsx';
import Linha from '../../components/LinhaDegrade/index.jsx';
import BotaoSimples from '../../components/BotaoSimples/index.jsx';
import BotaoLogout from '../../components/BotaoLogout/index.jsx';
import SeparadorVertical from '../../components/separadorVertical/index.jsx';
import { Cabecalho, CabecalhoCentro, CabecalhoDireita, CabecalhoEsquerda } from '../../components/Cabecalho/index.jsx';
import InputBasico from '../../components/InputBasico';
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
import IconCadastrarObra from '../../assets/icons/plus-icon.svg';
import IconMeusLivros from '../../assets/icons/bookshelf-icon.svg';

function PaginaHome() {

  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState({ "tipoUsuario": "", "nome": ""});
  const { btnSair, sairConfirm, sairCancel, showOverlay, showLogoutModal } = useHomeHook();
  const [foto, setFoto] = useState(FotoPadrao);

  const { puxarDados } = puxarDadosHook();
  const { goTo } = useNavigateCustom();

  useTitulo('Home - Scritus');

  useEffect(() => {
    const carregarHome = async () => {
      // Espera fontes
      if (document.fonts) await document.fonts.ready;

      // Espera dados iniciais
      const token = localStorage.getItem("accessToken");
      const payload = await decodificarJWT(token) || {};
      const {tipoUsuario} = payload;

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

      setUsuario({"tipoUsuario": tipoUsuario, "nome": nome})

      if (usuario.usuario.foto_perfil_url === null) {
        setFoto(FotoPadrao);
      }
      else {
      setFoto(`http://localhost:5000${usuario.usuario.foto_perfil_url}`);
      };
    }
    carregarHome();
  }, []);

  setTimeout(() => {setLoading(false)}, 2000);

  if (loading) return <PaginaSplash />;

  return (
    <> 
      { showOverlay && <Overlay />}
      { showLogoutModal && <LogoutModal confirmClick={sairConfirm} cancelClick={sairCancel}/> }
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
          <SC_ButtonMenuHome onClick={() => goTo('/cadastrarobra')}>
            <img width='26' height='26' src={IconCadastrarObra} alt="Cadastrar Obras" />
          </SC_ButtonMenuHome> 
          <SC_ButtonMenuHome onClick={() => goTo('/minhasobras')}>
            <img width='26' height='26' src={IconMeusLivros} alt="Meus Livros" />
          </SC_ButtonMenuHome>
        </>  }
      </SC_WrapperMenuHome>
      <ContainerHome>
        <TituloBasico>
            Ascendentes no Scritus:
        </TituloBasico>
        <ContainerCarrosel>
            <LivroHome />
            <LivroHome />
            <LivroHome />
            <LivroHome />
            <LivroHome />
        </ContainerCarrosel>
        <TituloBasico>
            Mergulhe em romances açucarados:
        </TituloBasico>
        <ContainerCarrosel>
            <LivroHome />
            <LivroHome />
            <LivroHome />
            <LivroHome />
            <LivroHome />
        </ContainerCarrosel>
      </ContainerHome>
    </>
  );
}

export default PaginaHome;