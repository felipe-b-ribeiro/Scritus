import styled from 'styled-components';

const LogoScritus = styled.h1`
  font-family: 'Cinzel Decorative', serif !important;
  font-size: 2.5rem;
  font-weight: 500;
  padding: 10px;
  border-radius: 5px;
  margin: 20px;
  user-select: none;
  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);

  & strong {
    font-weight: 500 !important;
    color: var(--cor-principal) !important;
    font-family: 'Cinzel Decorative', serif !important;
  }
`;

export default LogoScritus;