import styled, { css } from 'styled-components';

const variantes = {
  primary: css`
    background-color: var(--cor-principal);
    box-shadow: inset 0 0 0.5em #ac7d4dff;
    color: #fff;

    &:hover {
      box-shadow: inset 0 0 0.7em #755534ff;
    }
  `,
  secondary: css`
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

  `,
  terciary: css`
    background-color: transparent;
    color: var(--cor-principal);
    border: 1px solid var(--cor-principal);

    &:hover {
      box-shadow: 0 0 0.2em #b3743eff;
      background-color: #f5f4f4ff;
    }
  `,
  cancel: css`
    background-color: transparent;
    color: var(--cor-sair-deletar);
    border: 1px solid var(--cor-sair-deletar);
    
    &:hover {
      background-color: #f5f4f4ff;
      box-shadow: 0 0 0.2em var(--cor-sair-deletar);
    }
  `,
  cancel2: css`
    background-color: red;
    color: white;
    border: none;
    font-weight: bold;

    &:hover {
      background-color: rgba(197, 2, 2, 1);
      box-shadow: 0 0 0.2em var(--cor-sair-deletar);
    }
    `
};

const Botao = styled.button`
    position: relative;
    width: fit-content;
    height: fit-content;
    margin: 20px;
    padding: 0.48rem 0.8rem;;
    border: none;
    border-radius: 10px;
    transition: 0.7s cubic-bezier(0.24, 1.01, 0.8, 0.71);
    display: block;
    align-items: center;
    font-family: 'Cinzel', serif;
    font-size: 1.1em;
    ${({ variant }) => variantes[variant || 'primary']};

    &:hover {
        transform: scale(1.03);
        cursor: pointer;
    }

    svg {
      margin-bottom: -3px;
      margin-right: 8px;
    }

    `;
  
export default Botao;