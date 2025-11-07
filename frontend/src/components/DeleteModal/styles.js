import styled from "styled-components";

export const SC_Container = styled.div`
    width: fit-content;
    height: fit-content;
    padding: 10px;
    border-radius: 20px;
    background-color: white;
    position: absolute;
    z-index: 4000;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
