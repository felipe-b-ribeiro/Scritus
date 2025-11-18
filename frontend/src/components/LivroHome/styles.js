import styled from "styled-components";

export const SC_LivroHome = styled.div`
    background-color: lightgray;
    border-radius: 15px;
    height: 300px;
    width: 220px;
    border: 1px solid black;
    transition: 0.5s var(--transicao-basica);

    &:hover {
        opacity: 0.8;
    }
`