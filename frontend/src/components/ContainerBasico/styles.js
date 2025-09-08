import styled from "styled-components";

const SC_ContainerBasico = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 47vw;
  width: fit-content;
  margin: 10vh auto;
  padding: 0 6rem;
  border-radius: 30px;
  box-shadow:
   4px 0 10px var(--cor-secundaria),   /* sombra à direita */
  -4px 0 10px var(--cor-principal),   /* sombra à esquerda */
  0 4px 10px var(--cor-terciaria);   /* sombra abaixo */;

  h1 {
    font-family: 'Cinzel', serif;
    background-color: var(--cor-principal);
    color: white;
    box-shadow: 0 -3px 6px rgba(0, 0, 0, 0.2);
    border-radius: 15px;
    padding: 5px 10px 0 10px;
    margin-top: -1.1rem;
    font-weight: 400;
    font-size: 1.8em;
    margin-bottom: 0.4rem;
    user-select: none;
    white-space: nowrap;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1.5rem;
    gap: 20px;
  }
`;

export default SC_ContainerBasico;
