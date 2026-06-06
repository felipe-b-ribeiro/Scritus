import styled from "styled-components";
import { enteringCards, enteringCardsPC } from "./animations";

const SC_ContainerBasico = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px auto;
  width: 86vw;
  padding: 0 5vw;
  border-radius: 20px;
  box-shadow:
    4px 0 10px var(--cor-secundaria),
    -4px 0 10px var(--cor-principal),
    0 4px 10px var(--cor-terciaria);

  @media (min-width: 768px) {
    width: clamp(500px, ${({ width }) => width}, 86vw);

    &.left {
      margin: 0;
    }
  }

  &.normalCards {
    margin: 5vh auto 2vh auto;

    @media (min-width: 1024px) {
      margin-top: 10vh;
    }
  }

  &.enteringCards {
    animation: ${enteringCards} 1s forwards;
    @media (min-width: 1024px) {
      animation: ${enteringCardsPC} 1s forwards;
    }
  }

  &.tipoSelected {
    @media (min-width: 1024px) {
      margin-right: 6vw;
    }
  }

  #textContainer {
    font-family: "Cinzel", serif;
    background-color: var(--cor-principal);
    color: white;
    box-shadow: 0 -3px 6px rgba(0, 0, 0, 0.2);
    border-radius: 15px;
    padding: 5px 10px 0 10px;
    margin-top: -1.1rem;
    font-weight: 400;
    font-size: 1.8em;
    margin-bottom: 12px;
    user-select: none;
    white-space: nowrap;
    font-size: clamp(22px, 3vw, 28px);

    &.leitor {
      background-color: var(--cor-leitor);
    }
    &.autor {
      background-color: var(--cor-autor);
    }
    &.editora {
      background-color: var(--cor-editora);
    }
  }

  form {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    &.editarPerfil {
      > label img {
        border-radius: 50%;
        z-index: 1;
        cursor: pointer;
        border: 1px solid black;
      }
      > input[type="file"] {
        display: none;
      }
      > .delete-btn {
        padding: 5px 9px;
        border-radius: 15px;
        color: white;
        background-color: red;
        font-family: "Aboreto", serif;
        border: none;
        cursor: pointer;
      }
    }

    &.booksForm {
    & img {
      border-radius: 20px;
      border: 1px solid black;
      cursor: pointer;
      margin-bottom: 20px;
    }
  }
  }
`;

export default SC_ContainerBasico;
