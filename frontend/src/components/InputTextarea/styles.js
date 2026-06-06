import styled from "styled-components";

export const SC_TextareaWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  margin: 10px 0;

  &.leitor {
    > label {color: var(--cor-leitor)}
    > textarea:focus {border: 1px solid var(--cor-leitor)} ;
  }
  &.autor {
    > label {color: var(--cor-autor)}
    > textarea:focus {border: 1px solid var(--cor-autor)} ;
  }
  &.editora {
    > label {color: var(--cor-editora)}
    > textarea:focus {border: 1px solid var(--cor-editora)} ;
  }

  > textarea {
      padding: 14px 16px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    font-family: 'Raleway', serif;
    width: 100%;
    border: 1px solid #000;
    border-radius: 15px;
    background-color: var(--cor-fundo);
    font-size: 1rem;
    outline: none;
    transition: border-color 0.4s var(--transicao-basica);

    &:focus {border: 1px solid var(--cor-principal);}

    ~ label {
    position: absolute;
    top: -1px;
    left: 18px;
    transform: translateY(-50%);
    background-color: #fff;
    color: var(--cor-principal);
    padding: 0 3px;
    font-family: 'Aboreto', serif;
    font-size: 0.9em;
    user-select: none;
  }
  }
`;
