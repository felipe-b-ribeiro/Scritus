import styled from "styled-components";

export const SC_ButtonInteracao = styled.button`
  align-items: center;
  background-color: white;
  border-radius: 8px;
  border: 1px solid ¨black;
  cursor: pointer; 
  display: flex;
  flex-direction: column;
  font-family: "Arial", serif;
  gap: 5px;
  margin-left: 15px;
  padding: 10px;
  width: 65px;

  &.likes {
    border-color: red;
    color: red;
  }

  &.saves {
    border-color: blue;
    color: blue;
  }

  & svg {transition: 0.5s var(--transicao-basica);}

  &:hover {
    & svg {transform: scale(1.1);}
  }

  &.no-hover {
    cursor: default;
    user-select: none;
    & svg {transform: none;}
  }
`;
