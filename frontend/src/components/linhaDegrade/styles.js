import styled from 'styled-components';

const linhaDegrade = styled.hr`
  height: 3.5px;
  width: 100%;
  border: none;
  background: linear-gradient(to right, var(--cor-secundaria), #533a25, #976a43);
`;

export default linhaDegrade;