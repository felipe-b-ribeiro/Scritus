import styled from "styled-components";

export const SC_Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative; 
  padding: 0 min(3vw, 25px);
  height: 60px;
  background-color: #fff;
  z-index: 1000;

  @media (min-width: 768px) {height: 70px;}

  & div:first-of-type(1) {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  & div:nth-of-type(2) {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;

    @media (max-width: 768px) {
      position: static;
      transform: none;
      justify-content: center;
      width: 100%;
    }
  }

  & div:nth-of-type(3) {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;
