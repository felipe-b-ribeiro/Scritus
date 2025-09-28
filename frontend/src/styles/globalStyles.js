import { createGlobalStyle } from "styled-components";

const EstilosGlobais = createGlobalStyle`

    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    }

    body {
        min-height: 100vh;
        width: 100vw;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    a:hover {
        cursor: pointer;
    }

    .input-error {
        border: 1px solid red !important;
    }

    /* Chrome / Edge */
    input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px white inset; /* cor de fundo */
        -webkit-text-fill-color: black;               /* cor do texto */
        transition: background-color 5000s ease-in-out; /* evita piscar */
    }

    /* Firefox */
    input:-moz-autofill {
        box-shadow: 0 0 0px 1000px white inset;
        -moz-text-fill-color: black;
    }

    .flx {
        display: flex;
    }

    .space-a {
        justify-content: space-around;
    }
    
    :root {
        --cor-principal: #cb8446;
        --cor-secundaria: #5b4028;
        --cor-terciaria: #E89953;
        --cor-texto: #ffffff;
        --cor-destaque: #1342b0;
        --cor-sair-deletar: #a40f0f;
        --transicao-basica: cubic-bezier(0.24, 1.01, 0.8, 0.71);
    }
`;

export default EstilosGlobais;