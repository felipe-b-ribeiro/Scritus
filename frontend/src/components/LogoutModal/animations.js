import { keyframes } from "styled-components";

export const appear = keyframes`
    from {
        display: none;
        opacity: 0;
        transform: translateY(-100px)
    }
    to {
        display: flex;
        opacity: 1;
        transform: translateY(15px);
    }
`;

export const vanish = keyframes`
    from {
        display: flex;
        opacity: 1;
        transform: translateY(15px);
    }
    to {
        display: none;
        opacity: 0;
        transform: translateY(-100px)
    }
`;