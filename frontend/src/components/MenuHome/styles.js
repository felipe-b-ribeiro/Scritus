import styled from "styled-components";

export const SC_WrapperMenuHome = styled.div`
    border: 1px solid black;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 140px;
    left: 25px;
    width: 56px;
    height: 300px;
    border-radius: 14px;

    > button:first-child {
        border-radius: 14px 14px 0px 0px;
    }

    > button {
        border: none;
        width: 100%;
        height: 56px;
        border: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        cursor: pointer;
        transition: 0.5s var(--transicao-basica);

        > svg {transition: 0.3s var(--transicao-basica)}

        &:hover {
            > svg {transform: rotate(-8deg) translate(2px, -2px);}
            background-color: rgb(240, 240, 240);
        }
    }
`;