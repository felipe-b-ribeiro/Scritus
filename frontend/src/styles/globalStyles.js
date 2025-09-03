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

    :root {
        --cor-principal: #cb8446;
        --cor-secundaria: #5b4028;
        --cor-terciaria: #E89953;
        --cor-texto: #ffffff;
        --cor-destaque: #1342b0;
        --cor-sair-deletar: #a40f0f;
    }
`;

export default EstilosGlobais;