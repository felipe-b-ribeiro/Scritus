import styled from "styled-components";

export const SC_LivroHome = styled.div`
    background-color: lightgray;
    border-radius: 15px;
    height: 300px;
    width: 220px;
    border: 1px solid black;
    transition: 0.5s var(--transicao-basica);

    & img:first-of-type:hover {opacity: 0.8;}

    & .deleteBookButton {
        z-index: 5;
        position: relative;
        top: -59px;
        left: 10px;
        border: none;
        padding: 4px 5px;
        background-color: red;
        border-radius: 5px;
        transition: 0.5s var(--transicao-basica);
        cursor: pointer;

        &:hover {
            background-color: rgba(197, 2, 2, 1);
            box-shadow: 0 0 0.2em var(--cor-sair-deletar);
        }
    }
`;
