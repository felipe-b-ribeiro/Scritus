import styled from "styled-components";

export const SC_Cabecalho = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative; 
  padding: 10px;
  height: 70px;
  background-color: #fff;
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

// Área da esquerda
export const SC_CabecalhoEsquerda = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* espaçamento entre botões ou elementos */
`;

// Área central (logo)
export const SC_CabecalhoCentro = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    position: static;
    transform: none;
    justify-content: center;
    width: 100%;
  }
`;

// Área da direita
export const SC_CabecalhoDireita = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;