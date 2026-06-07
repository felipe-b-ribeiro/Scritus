import styled from "styled-components";

export const PALETA = [
  "#cb8446",
  "#d39255",
  "#e0a166",
  "#edae78",
  "#f0b98a",
  "#5b4028",
  "#6a4a30",
  "#795538",
  "#896041",
  "#9a6c4b",
  "#E89953",
  "#f0a767",
  "#f6b57b",
  "#f9c28f",
  "#ffd0a4",
  "#b66f36",
  "#c77d3f",
  "#d88c4a",
  "#e99b55",
  "#ffac61",
  "#8c5e32",
  "#9d6a3a",
  "#ad7643",
  "#be824c",
  "#ce8f56",
  "#a86b3f",
  "#b8784a",
  "#c88655",
  "#d99460",
  "#eaa26c",
];

export const SC_TagGrande = styled.div`
  padding: 10px 30px;
  margin: 0 4px;
  position: relative;
  top: -40px;
  background-color: white;
  border: 1px solid ${(props) => props.cor};
  width: fit-content;
  color: black;
  font-family: 'Cinzel', serif;
  font-weight: normal;
  user-select: none;
  border-radius: 30px;
  font-size: 2.7em;

  & strong {
    color: ${(props) => props.$cor};
    font-weight: normal;
  }
`;

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
