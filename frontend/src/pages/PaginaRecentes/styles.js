import styled from "styled-components";

export const SC_Info = styled.div`
  padding: 10px 20px;
  border-radius: 20px;
  color: black;
  width: fit-content;
  border: 1px solid ${(props) => props.$cor};
  font-family: 'Raleway', serif;
  margin-top: -30px;

  & strong {
    color: ${(props) => props.color};
    font-family: 'Arial', serif;
  }
`;
