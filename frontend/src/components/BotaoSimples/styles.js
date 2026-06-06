import styled from "styled-components";

const SC_BotaoSimples = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 10px;
  transition: 0.45s cubic-bezier(0.24, 1.01, 0.8, 0.71);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-family: "Cinzel", serif;
  font-size: 1.1em;
  white-space: nowrap;
  font-size: clamp(18px, 4vw ,20px);

  @media (min-width: 768px) {font-size: 18px}

  > span {
    display: flex;
    align-items: center;
    justify-content: center;

    @media (min-width: 768px) {margin-bottom: -4px;}
  }
  
  &.icon {padding: 5px;}

  @media (min-width: 768px) {padding: 6px 10px;}

  &.primary {
    background-color: var(--cor-principal);
    box-shadow: inset 0 0 0.5em #ac7d4dff;
    color: #fff;

    &:hover {
      box-shadow: inset 0 0 0.7em #755534ff;
    }
  }

  &.secondary {
    background-color: transparent;
    border: 1px solid var(--cor-secundaria);
    color: var(--cor-secundaria);

    svg {
      fill: var(--cor-secundaria);
    }

    &:hover {
      box-shadow: 0 0 0.2em #ac7d4dff;
      background-color: #f5f4f4ff;

      svg {
        fill: #422e1dff !important;
      }
    }
  }

  &.tertiary {
    background-color: transparent;
    color: var(--cor-principal);
    border: 1px solid var(--cor-principal);

    &:hover {
      box-shadow: 0 0 0.2em #b3743eff;
      background-color: #f5f4f4ff;
    }
  }

  &.cancel {
    background-color: transparent;
    color: var(--cor-sair-deletar);
    border: 1px solid var(--cor-sair-deletar);

    &:hover {
      background-color: #f5f4f4ff;
      box-shadow: 0 0 0.2em var(--cor-sair-deletar);
    }
  }

  &.cancel2 {
    background-color: red;
    color: white;
    border: none;
    font-weight: bold;

    &:hover {
      background-color: rgba(197, 2, 2, 1);
      box-shadow: 0 0 0.2em var(--cor-sair-deletar);
    }
  }

  &.save {
    background-color: var(--cor-salvar);
    color: white;
    border: 1px solid var(--cor-salvar);

    &:hover {
      background-color: white;
      color: var(--cor-salvar);
      box-shadow: 0 0 0.2em var(--cor-salvar);
    }
  }

  &:hover {
    transform: scale(1.03);
    cursor: pointer;
  }
`;

export default SC_BotaoSimples;
