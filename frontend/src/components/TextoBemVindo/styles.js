import styled from "styled-components";

export const SC_Img = styled.img`
    width: 40px;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    transition: 0.5s var(--transicao-basica);
    border: 1px solid black;
    display: block;

    @media (min-width: 1024px) {width: 50px}

    &:hover {
        transform: scale(1.03);
        cursor: pointer;
        border: none;
        box-shadow:
        4px 0 5px var(--cor-secundaria),   /* sombra à direita */
        -4px 0 5px var(--cor-principal),   /* sombra à esquerda */
        0 4px 5px var(--cor-terciaria);   /* sombra abaixo */;
    }
`;

export const SC_Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
    height: fit-content;
`;

export const SC_Texto = styled.h2`
    color: black;
    font-family: 'Aboreto', serif;
    font-size: 1rem;
    user-select: none;
    margin-right: 10px;
    max-width: 270px;
    overflow: hidden;
    white-space: nowrap;

    & strong {
        color: var(--cor-principal);
    }
`;
