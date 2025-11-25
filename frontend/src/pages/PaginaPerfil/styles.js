import styled from "styled-components";

export const SC_FotoPerfil = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 1px solid black;
`;

export const SC_NomeUsuario = styled.h1`
    font-family: 'Cinzel', serif;
    margin-left: 50px;
    font-size: 2em;
`

export const SC_Pseudonimo = styled.h5`
    font-family: 'Cinzel', serif;
    margin-left: 50px;
    font-size: 1em;
    color: var(--cor-principal);
`
export const SC_Biografia = styled.div`
    font-family: 'Cinzel', serif;
    margin-left: 50px;
`

const cores = {
    "leitor": '#5B4028',
    "autor": '#CB8446',
    "editora": '#FF6526'
}

const cor = props => cores[props.tipo.toLowerCase()];

export const SC_Tag = styled.div`
    padding: 5px 10px;
    margin-left: ${({ marginLeft }) => marginLeft || "50px"};
    margin-top: ${({ marginTop }) => marginTop || "10px"};
    margin-bottom: ${({ marginBottom }) => marginBottom || "5px"};
    background-color: ${cor};
    border-radius: 15px;
    color: white;
    width: fit-content;
    font-family: 'Aboreto', serif;
    user-select: none;
    z-index: 2;
`;

export const SC_BotaoSeguir = styled.button`
    border: none;
    background-color: blue;
    color: white;
    font-family: 'Cinzel', serif;
    font-size: 1em;
    border-radius: 5px;
    padding: 5px 0 5px 10px;
    transition: 0.2s var(--transicao-basica);
    display: flex;
    align-items: center;

    & svg {
        margin-left: 5px;
        margin-right: 10px;
    }
    
    &:hover {
        opacity: 0.8;
        cursor: pointer;
    }
`;

export const SC_Seguidores = styled.h5`
    font-family: 'Cinzel', serif;
    color: blue;
    border: 1px solid blue;
    border-radius: 5px;
    padding: 5px 10px 5px 10px;
`;