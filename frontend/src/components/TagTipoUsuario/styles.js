import styled from "styled-components";

const cores = {
  leitor: "var(--cor-leitor)",
  autor: "var(--cor-autor)",
  editora: "var(--cor-editora)",
};

const cor = (props) => cores[props.tipo.toLowerCase()];

export const SC_Tag = styled.div`
    padding: 5px 10px;
    background-color: ${cor};
    border-radius: 15px;
    color: white;
    font-family: 'Aboreto', serif;
    user-select: none;
    z-index: 2;
`;
