import styled from "styled-components";

export const SC_Paragrafo_Simples = styled.p`

    color: black;
    font-family: 'Raleway', serif;
    font-size: clamp(18px, 3vw, 20px);
    text-align: justify;
    margin-bottom: 14px;
    word-break: break-word;
    hyphens: auto;

    strong {
        color: var(--cor-principal);
    }

    em {
        color: var(--cor-secundaria);
    }
`;
