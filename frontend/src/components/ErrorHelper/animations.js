import { keyframes } from "styled-components";

export const appear = keyframes`
    from {
        opacity: 0;
        transform: translateY(-50px);
    }
    to {
        opacity: 1;
        transform: translateY(0px);
    }
`;

export const appearPC = keyframes`
    from {
        opacity: 0;
        transform: translate(75%, -50%);
    }
    to {
        opacity: 1;
        transform: translate(108%, -50%);
    }
`;

export const vanish = keyframes`
    from {
        opacity: 1;
        transform: translateY(0px);
    }
    to {
        opacity: 0;
        transform: translateY(-20px);
    }
`;

export const vanishPC = keyframes`
    from {
        opacity: 1;
        transform: translate(108%, -50%);
    }
    to {
        opacity: 0;
        transform: translate(100%, -50%);
    }
`;
