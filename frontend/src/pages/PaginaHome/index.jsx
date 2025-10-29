import decodificarJWT from '../../utils/decodificarJWT.js';
import useHomeHook from './hooks/useHomeHook.js';
import { useState, useEffect } from 'react';


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


function PaginaHome() {

  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState({ "tipoUsuario": "", "nome": ""});
  const { btnSair, sairConfirm, sairCancel, showOverlay, showLogoutModal } = useHomeHook();

  useEffect(() => {
    const carregarHome = async () => {
      // Espera fontes
      if (document.fonts) await document.fonts.ready;

      // Espera dados iniciais
      const token = localStorage.getItem("accessToken");
      const payload = await decodificarJWT(token) || {};
      const { tipoUsuario, nome } = payload;
      setUsuario({"tipoUsuario": tipoUsuario, "nome": nome})
    };

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
          <TextoBemVindo src='../../assets/icons/eyeClosed.svg' usuario={usuario.nome} />
          <SeparadorVertical />
          <TagTipoUsuario tipo={usuario.tipoUsuario} />
          <BotaoLogout onClick={btnSair} />
        </CabecalhoEsquerda>
        <CabecalhoCentro>
          <Logo goTo={'/home'} />
        </CabecalhoCentro>
        <CabecalhoDireita>
          <InputBasico type='search'/>
        </CabecalhoDireita>
      </Cabecalho>
      <Linha />
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