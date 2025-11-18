import styled from "styled-components";

const SC_ContainerBasico = styled.div`
  display: flex;
  flex-direction: ${props => props.direction || 'column'};
  align-items: ${props => props.align || 'center'};
  width: ${props => props.width || 'max-content'};
  margin: 80px auto;
  padding: ${props => props.padding || '0 6rem 10px 6rem'};
  border-radius: 30px;
  box-shadow:
   4px 0 10px var(--cor-secundaria),   /* sombra à direita */
  -4px 0 10px var(--cor-principal),   /* sombra à esquerda */
  0 4px 10px var(--cor-terciaria);   /* sombra abaixo */;


  #textContainer {
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
    margin-top: 1em;
    justify-content: space-between;
  }
  

  @media (max-width: 600px) {
    max-width: 85vw;

    #textContainer {
      font-size: 1.45em;
    }
  }
`;

export default SC_ContainerBasico;
