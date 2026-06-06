import styled, { keyframes } from "styled-components";

const appear = keyframes`
    from {
        right: -100%;
    }
    to {
        right: 0;
    }
`;

const vanish = keyframes`
    from {
        display: flex;
        right: 0;
    }
    to {
        display: none;
        right: -100%;
    }
`;

export const SC_Menu = styled.div`
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-left: 1px solid var(--cor-principal);
    height: 100%;
    inset: 0 0 0 auto;
    padding: 10px 20px 20px;
    position: fixed;
    width: 70vw;
    z-index: 3000;
    background-color: rgba(255,255,255,0.8);

    > button {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        left: 15px;
        top: 10px;
        width: 30px;
        aspect-ratio: 1 / 1;
        border: 1px solid var(--cor-principal);
        border-radius: 10px;
    }

    & button.cancel2 {
        anchor-name: --mobile-logout-btn;
    }

    &.entering {animation: ${appear} 0.5s linear forwards;}

    &.leaving {animation: ${vanish} 0.5s linear forwards;}

    &.closed {display: none;}

    & h1 {
        text-align: center;
        font-family: 'Cinzel Decorative', serif;
        font-size: clamp(38px, 3vw, 42px);
        font-weight: normal;
        > strong {
            font-weight: normal;
            color: var(--cor-principal);
        }
    }

    & h4 {
        font-family: 'Homenaje', serif;
        font-size: clamp(18px, 3vw, 22px);
        text-align: center;
        margin-top: -2px;
        text-wrap: balance;
        font-weight: normal;
    }

    > div:first-of-type div:last-of-type {
        display: flex;
        flex-direction: column;
        gap: 10px;

        > * {
            width: 100%;
        }
    }
`;
