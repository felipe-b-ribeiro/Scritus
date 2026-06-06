import styled from "styled-components";

export const SC_TagInfo = styled.div`
  padding: 10px 20px;
  border-radius: 20px;
  color: black;
  width: fit-content;
  border: 1px solid black;
  font-family: "Raleway", serif;
  margin-top: -30px;

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

  & strong {font-family: "Arial", serif;}
`;
