import styled from "styled-components";

export const SC_TagGrande = styled.div`
  padding: 10px 30px;
  margin-top: 10px;
  position: relative;
  top: -40px;
  background-color: white;
  border: 1px solid black;
  width: fit-content;
  color: black;
  font-family: 'Cinzel', serif;
  font-weight: normal;
  user-select: none;
  border-radius: 30px;
  font-size: 2.7em;

  > strong {font-weight: normal;}

  &.likeds {
    border: 1px solid red;
    > strong {color: red;}
  }
  &.saveds {
    border: 1px solid blue;
    > strong {color: blue;}
  }
  &.recents {
    border: 1px solid purple;
    > strong {color: purple;}
  }

  & strong {
    color: ${(props) => props.cor};
    font-weight: normal;
  }
`;
