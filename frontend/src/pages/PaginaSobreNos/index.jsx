
import Logo from '../../components/LogoScritus';
import Linha from '../../components/LinhaDegrade';
import Botao from '../../components/Botao';
import { Cabecalho, CabecalhoCentro, CabecalhoDireita, CabecalhoEsquerda } from '../../components/Cabecalho';
import ArrowIcon from "../../components/icons/arrowIcon";
import ContainerPrincipal from '../../components/ContainerBasico';
import ParagrafoSimples from '../../components/ParagrafoSimples';
import SeparadorVertical from '../../components/separadorVertical';

function PaginaSobreNos() {

  return (
    <>
      <Cabecalho>
        <CabecalhoEsquerda>
          <Botao back variant="secondary" className="btn-icone">
              <ArrowIcon />
              <span>Voltar</span>
          </Botao>
        </CabecalhoEsquerda>
        <CabecalhoCentro>
          <Logo />
        </CabecalhoCentro>
        <CabecalhoDireita>
          <Botao to='/cadastro' variant="terciary">
          <span>CRIAR CONTA</span>
          </Botao>
          <SeparadorVertical />
          <Botao to='/login'>
            <span>FAZER LOGIN</span>
          </Botao>
        </CabecalhoDireita>
      </Cabecalho>
      <Linha />
      <ContainerPrincipal text='Sobre nossa trajetória' width='70vw'>
        <ParagrafoSimples>
           A rede social literária <em>Scritus</em> nasceu da necessidade e motivação de seus criadores — dois leitores <strong>ávidos</strong> por novas descobertas - de conectar pessoas, ideias, editoras e comunidades.
        </ParagrafoSimples>
        <ParagrafoSimples>
           Inspirado em grandes referências consolidadas, como o <em>Spotify</em>, o <em>Scritus</em> vai além de ser apenas uma plataforma literária. Ele conecta obras inovadoras a leitores e editoras sedentos por conhecimento e novas experiências. Isso só toma forma por meio das <strong>recomendações dinâmicas</strong> - um mecanismo já usado pelos gigantes da internet - que fazem o conteúdo chegar até o público final sem que ele precise procurá-lo.
        </ParagrafoSimples>
        <ParagrafoSimples>
           O <em>Scritus</em> não é só mais um espaço genérico para ler ou comprar livros digitais. Aqui, você encontra conteúdo dinâmico e inovador para todos os públicos sem pagar nada. Com o <em>Scritus</em>,  sua sede por conteúdo específico encontra <strong>correspondência</strong> e o algoritmo te serve com aquilo que você gosta.
        </ParagrafoSimples>
        <Botao to='/cadastro' variant='secondary'>Se imerja no ecossistema literário</Botao>
      </ContainerPrincipal>
    </>
  );
}

export default PaginaSobreNos;