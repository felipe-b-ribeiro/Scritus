import styled from "styled-components";

export const SC_Container = styled.div`
    width: fit-content;
    height: fit-content;
    padding: 10px;
    border-radius: 20px;
    background-color: white;
    position: absolute;
    z-index: 4000;
    top: 65px;
    left: 26.5vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &::before {
        content: "";
        position: absolute;
        z-index: 2;
        top: -20px;
        left: 20px;     
        border-width: 10px;
        border-style: solid;
        border-color: transparent transparent white transparent;
    }
`

export const SC_Titulo = styled.p`
    color: black;
    font-family: 'Aboreto', serif;
    margin: 10px;
    white-space: nowrap;
    
    & strong {
        color: var(--cor-principal);
    }
`

export const SC_Linha = styled.hr`
    color: var(--cor-principal);
    margin: 5px 0 0 0;
    width: 50%;
`

export const SC_Botao = styled.button`
    border: none;
    border-radius: 15px;
    padding: 10px 15px;
`
