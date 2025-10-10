import styled from "styled-components";

const SC_InputWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: max-content;
  margin: 10px 0;

  input ~ label {
    position: absolute;
    top: -1px;
    left: -10%;
    transform: translateY(-50%);
    background-color: #fff;
    color: var(--cor-principal);
    padding: 0 3px;
    font-family: 'Aboreto', serif;
    font-size: 0.9em;
    user-select: none;
  } 
`;

const SC_InputBasico = styled.input`
  padding: 12px 16px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Raleway', serif;
  width: 140%;
  border: 1px solid #000;
  border-radius: 15px;
  background-color: var(--cor-fundo);
  font-size: 1rem;
  outline: none;
  transition: border-color 0.4s var(--transicao-basica);

    &:focus {
    border: 1px solid var(--cor-principal);
    }
`;

export { SC_InputBasico, SC_InputWrapper };
