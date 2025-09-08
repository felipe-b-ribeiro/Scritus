import styled from 'styled-components';

const variantes = {
  primary: `
    background-color: #5B4028;

    h2 {
      color: #CCCCCC;
      }
  `,
  secondary: `
    background-color: #CB8446;

    h2 {
      color: #FFC088;
    }
  `,
  terciary: `
    background-color: #FF6526;

    h2 {
      color: #5B4028;
    }
  `
};

const SC_CardBasico = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Cinzel', serif;
  position: relative;
  width: 100%;
  min-height: 6rem;
  border: 1px solid #eee;
  color: white;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  transition: 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 0 0.3em #000000ff;
  ${({ variant }) => variantes[variant]};

  h2 {
    position: absolute;
    top: 10%;
    left: 5%;
  }

  h5 {
    position: absolute;
    top: 40%;
    left: 5%;
    white-space: wrap;
    width: 50%;
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.03);
  }
`;

export default SC_CardBasico;
