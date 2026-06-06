import { keyframes } from "styled-components";

export const enteringCards = keyframes`
  from {
    display: none;
    transform: translateY(-200px);
    opacity: 0;
  }
  to {
    display: flex;
    transform: translateY(0);
    opacity: 1;
  }
`;
export const enteringCardsPC = keyframes`
  from {
    display: none;
    transform: translateX(-200px);
    opacity: 0;
  }
  to {
    display: flex;
    transform: translateX(0);
    opacity: 1;
  }
`;
