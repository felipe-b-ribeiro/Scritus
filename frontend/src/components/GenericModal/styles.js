import styled, { keyframes } from "styled-components";

const appear = keyframes`
    from {
        display: none;
        opacity: 0;
        transform: translate(-50%, 150px);
    }
    to {
        display: flex;
        opacity: 1;
        transform: translate(-50%, -50%);
    }
`;

const vanish = keyframes`
    from {
        display: flex;
        opacity: 1;
        transform: translate(-50%, -50%);
    }
    to {
        display: none;
        opacity: 0;
        transform: translate(-50%, -150px);
    }
`;

export const SC_Container = styled.div`
  width: fit-content;
  max-width: 90vw;
  height: fit-content;
  padding: 10px;
  border-radius: 20px;
  background-color: white;
  position: absolute;
  z-index: 4000;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid gray;

  @media (min-width: 768px) {
    top: 50%;
  }

  &.entering {
    animation: ${appear} 0.4s both linear;
  }

  &.leaving {
    animation: ${vanish} 0.4s both linear;
  }

  &.closed {
    display: none;
  }
`;

export const SC_Titulo = styled.p`
  color: black;
  font-family: "Aboreto", serif;
  margin: 10px 10px 3px 10px;
  white-space: normal;
  text-align: center;
  line-height: 1.3;

  @media (min-width: 768px) {
    white-space: nowrap;
    margin: 10px;
  }

  & strong {
    color: var(--cor-principal);
  }
`;

export const SC_Linha = styled.hr`
  color: var(--cor-principal);
  margin: 5px 0 0 0;
  width: 50%;
`;

export const SC_Botao = styled.button`
  border: none;
  border-radius: 15px;
  padding: 10px 15px;
`;
