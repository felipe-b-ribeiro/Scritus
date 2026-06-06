import styled from "styled-components";

const SC_InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 10px 0;

  &.leitor {
    > label {
      color: var(--cor-leitor);
    }
    > input:focus {
      border: 1px solid var(--cor-leitor);
    }
  }
  &.autor {
    > label {
      color: var(--cor-autor);
    }
    > input:focus {
      border: 1px solid var(--cor-autor);
    }
  }
  &.editora {
    > label {
      color: var(--cor-editora);
    }
    > input:focus {
      border: 1px solid var(--cor-editora);
    }
  }

  > input {
    padding: 12px 16px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    font-family: "Raleway", serif;
    width: 100%;
    border: 1px solid #000;
    border-radius: 15px;
    background-color: var(--cor-fundo);
    font-size: 1rem;
    outline: none;
    transition: border-color 0.4s var(--transicao-basica);
  }

  input ~ label {
    position: absolute;
    top: -1px;
    left: 18px;
    transform: translateY(-50%);
    background-color: #fff;
    color: var(--cor-principal);
    padding: 0 3px;
    font-family: "Aboreto", serif;
    font-size: clamp(12px, 3vw, 15px);
    user-select: none;
    font-weight: bold;
  }

  & .eye-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 12px;
  }
`;

export { SC_InputWrapper };
