import styled, { css } from 'styled-components';

const variantes = {
  primary: css`
    background-color: var(--cor-principal);
    box-shadow: inset 0 0 0.5em #ac7d4dff;
    color: #fff;

    &:hover {
      box-shadow: inset 0 0 0.5em #5a3f28ff;
    }
  `,
  secondary: css`
    background-color: transparent;
    border: 1px solid var(--cor-secundaria);
    transition: 0.7s ease-in-out;

    svg {
      fill: var(--cor-secundaria);
    }

    &:hover {
      box-shadow: 0 0 0.2em #ac7d4dff;
      background-color: #f3f3f3ff;

      svg {
        fill: #422e1dff !important;
      }
    }

  `,
  terciary: css`
    background-color: white;
    color: var(--cor-principal) !important;
  `
};

const Botao = styled.div`
    position: relative;
    width: fit-content;
    height: fit-content;
    margin: 20px;
    border-radius: 10px;
    transition: 0.3s ease-in;
    display: block;
    align-items: center;
    font-family: 'Cinzel', serif;
    font-size: 1.1em;
    ${({ variant }) => variantes[variant || 'primary']};

    &:hover {
        transform: scale(1.03);
        cursor: pointer;
    }

    a {
      display: inline-flex;
      padding: 0.48rem 0.8rem;
      box-sizing: border-box;
      color: inherit;

    svg {
      margin-bottom: -3px;
      margin-right: 8px;
    }

  }`;
  
export default Botao;