import styled from "styled-components";

export const SC_LogoScritus = styled.h1`
  font-family: 'Cinzel Decorative', serif !important;
  font-size: clamp(36px, 4vw, 42px);
  font-weight: 500;
  border-radius: 5px;
  user-select: none;
  transition: 0.7s var(--transicao-basica);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  &:hover {
    text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }

  strong {
    font-weight: 500 !important;
    color: var(--cor-principal) !important;
    font-family: 'Cinzel Decorative', serif !important;
  }
`;
