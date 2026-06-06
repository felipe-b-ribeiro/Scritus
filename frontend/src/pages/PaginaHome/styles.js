import styled from "styled-components";

export const SC_MenuBarInferior = styled.div`
  position: fixed;
  left: 50%;
  transform: translate(-50%);
  bottom: 20px;
  padding: 0 10px 10px 10px;
  width: 180px;
  height: 50px;
  border-radius: 10px;
  background-color: var(--cor-principal);
  display: flex;
  justify-content: center;
  gap: 8px;
  box-shadow: 2px 3px 10px black;
  z-index: 1000;

  > button {
    border: none;
    position: relative;
    background: lightgray;
    padding: 20px 11px;
    display: flex;
    height: 45px;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    bottom: 7px;
    transition: 0.5s var(--transicao-basica);
    cursor: pointer;

    &:hover {
        background-color: #c4c4c4;
        > svg {transform: scale(1.08);}
    }

    &:nth-child(2) {
        bottom: 19px !important;
        padding: 27px 14px;
        &:hover {> svg {transform: scale(1.05);}}
    }
  }
`;
