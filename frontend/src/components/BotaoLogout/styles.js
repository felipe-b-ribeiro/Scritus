import styled from "styled-components";

export const SC_BotaoLogout = styled.button`
    padding: 7px 10px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    color: white;
    font-family: 'Raleway', serif;
    background-color: red;
    border: none;
    border-radius: 30px;
    transition: 0.5s var(--transicao-basica);

    &:hover {
        cursor: pointer;
        background-color: rgba(196, 0, 0, 1);
    }

    & svg {
        fill: white !important;
        width: 16px;
        height: 16px;
    }
`;
export const SC_Wrapper = styled.div`
    position: relative;
    z-index: 4000;
    anchor-name: --logout-anchor;
`;
