import styled from "styled-components";

export const SC_Overlay = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: var(--cor-splash);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

export const SC_Img = styled.img`
    width: 200px;
    height: 200px;
`

export const SC_Titulo1 = styled.h1`
    color: black;
    font-family: 'Cinzel Decorative', serif;
    font-weight: normal;
    font-size: 2.5rem;

    & strong {
        color: var(--cor-principal);
        font-weight: normal;
    }
`

export const SC_Titulo2 = styled.h5`
    color: black;
    font-family: 'Cinzel', serif;
    margin: 7px 0 4px 0;
    font-size: 1em;
`