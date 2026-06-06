import styled, { keyframes } from "styled-components";

const appear = keyframes`
    from {
        display: none;
        opacity: 0;
    }
    to {
        display: block;
        opacity: 1;
    }
`;

const vanish = keyframes`
    from {
        display: block;
        opacity: 1;
    }
    to {
        display: none;
        opacity: 0;
    }
`;

const SC_Overlay = styled.div`
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 2000;
    backdrop-filter: blur(6px);

    &.entering {animation: ${appear} 0.5s linear forwards;}

    &.leaving {animation: ${vanish} 0.5s linear forwards;}

    &.closed {display: none;}
`;

export default SC_Overlay;
