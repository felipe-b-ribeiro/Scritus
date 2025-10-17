import Logo from '../../components/LogoScritus/index.jsx';
import Linha from '../../components/LinhaDegrade/index.jsx';
import Botao from '../../components/Botao';
import SeparadorVertical from '../../components/separadorVertical/index.jsx';
import { Cabecalho, CabecalhoCentro, CabecalhoDireita, CabecalhoEsquerda } from '../../components/Cabecalho/index.jsx';
import InputBasico from '../../components/InputBasico';
import TextoBemVindo from '../../components/TextoBemVindo/index.jsx';
import TagTipoUsuario from '../../components/TagTipoUsuario/index.jsx';
import TituloBasico from '../../components/TituloBasico/index.jsx';
import ContainerHome from '../../components/ContainerHome/index.jsx';
import ContainerCarrosel from '../../components/ContainerCarrosel/index.jsx';
import LivroHome from '../../components/LivroHome/index.jsx';

function PaginaHome() {

  return (
    <>
      <Cabecalho>
        <CabecalhoEsquerda>
          <TextoBemVindo src='../../assets/icons/eyeClosed.svg' usuario='biloso' />
          <SeparadorVertical />
          <TagTipoUsuario tipo='editora' />
        </CabecalhoEsquerda>
        <CabecalhoCentro>
          <Logo />
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