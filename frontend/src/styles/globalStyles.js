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
    }

    a:hover {
        cursor: pointer;
    }

    @keyframes shake {
        0% { box-shadow: 2px 2px 0.7em red; }
        25% { box-shadow: 3px 3px 0.7em darkred }
        75% { box-shadow: 2px 2px 0.5em darkred; }
        85% { box-shadow: 1px 1px 0.4em red}
        100% { box-shadow: 0px 0px 0em red;}
        }

    .input-error {
        border: 2px solid red !important;
        animation: shake 3s ease-in-out;
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