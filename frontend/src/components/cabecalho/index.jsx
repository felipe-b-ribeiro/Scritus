import { SC_Cabecalho, SC_CabecalhoCentro, SC_CabecalhoDireita, SC_CabecalhoEsquerda } from './styles';

export function Cabecalho({ children }) {
  return (
    <SC_Cabecalho>
      {children}
    </SC_Cabecalho>
  );
}

export function CabecalhoCentro({ children }) {
  return (
    <SC_CabecalhoCentro>
      {children}
    </SC_CabecalhoCentro>
  );
}

export function CabecalhoDireita({ children }) {
  return (
    <SC_CabecalhoDireita>
      {children}
    </SC_CabecalhoDireita>
  );
}

export function CabecalhoEsquerda({ children }) {
  return (
    <SC_CabecalhoEsquerda>
      {children}
    </SC_CabecalhoEsquerda>
  );
}
