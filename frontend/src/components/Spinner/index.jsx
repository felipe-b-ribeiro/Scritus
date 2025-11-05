import styled, { keyframes } from "styled-components";

const girar = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const SC_Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-left-color: #cb8446; /* dourado da Scritus */
  border-right-color: #5b4028; /* marrom escuro da Scritus */
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: ${girar} 1s linear infinite;
  margin: 50px auto;
`;

const Spinner = () => <SC_Spinner />;

export default Spinner;
