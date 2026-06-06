import styled from "styled-components";
import { appear, vanish } from "./animations";

export const SC_Container = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 10px;
  border-radius: 20px;
  background-color: white;
  position: fixed;
  z-index: 4000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position-anchor: --mobile-logout-btn;
  top: anchor(bottom);
  right: anchor(right);
  margin-right: 30px;

  @media (min-width: 768px) {
    position-anchor: --logout-anchor;
    right: anchor(right);
    top: anchor(bottom);
    margin-right: 5px;
  }

  &.entering {animation: ${appear} 0.3s both linear;}

  &.leaving {animation: ${vanish} 0.3s both linear;}

  &.closed {display: none}

  &::before {
    content: "";
    position: absolute;
    z-index: 2;
    top: -17px;
    right: 20px;
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent white transparent;
  }

  & .popupTitle {
    color: black;
    font-family: "Aboreto", serif;
    margin: 10px;
    white-space: nowrap;

    & strong {color: var(--cor-principal);}
  }

  & .popupLine {
    color: var(--cor-principal);
    margin: 5px 0 0 0;
    width: 50%;
  }
`;
