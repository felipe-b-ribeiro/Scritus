import { createGlobalStyle } from "styled-components";

const EstilosGlobais = createGlobalStyle`

    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    }

    html {
        overflow: hidden;
        scrollbar-width: none;
        min-height: 100vh;
        &::-webkit-scrollbar {display: none;}
    }

    #root {
    overflow-y: auto;
    overflow-x: hidden;
    height: 100vh;

    scrollbar-width: thin;
    scrollbar-color: var(--cor-principal) transparent;
    
    &::-webkit-scrollbar {
        width: 8px;
        background: transparent;
    }
    
    &::-webkit-scrollbar-track {background: transparent;}
    
    &::-webkit-scrollbar-thumb {
        background: #cb8446 !important;
        border-radius: 4px;
        
        &:hover {background: #E89953 !important;}
    }
    }

    a {
        text-decoration: none;
        color: inherit;
        font-size: inherit;

        &:hover {cursor:pointer}
    }

    textarea { 
        resize: none;
    }

    .input-error {
        border: 1px solid red !important;
    }

    .input-success {
        border: 1px solid green !important;
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
    
    :root {
        --cor-principal: #cb8446;
        --cor-secundaria: #5b4028;
        --cor-terciaria: #E89953;
        --cor-texto: #ffffff;
        --cor-destaque: #1342b0;
        --cor-salvar: #0077FF;
        --cor-sair-deletar: #a40f0f;
        --cor-splash: #ffffff;
        --cor-leitor: #5b4028;
        --cor-autor: #cb8446;
        --cor-editora: #ff6526;
        --transicao-basica: cubic-bezier(0.24, 1.01, 0.8, 0.71);
    }

`;

export default EstilosGlobais;
