import styled from "styled-components";

const cores = {
    "leitor": '#5B4028',
    "autor": '#CB8446',
    "editora": '#FF6526'
}

const cor = props => cores[props.tipo.toLowerCase()];

export const SC_Tag = styled.div`
    padding: 5px 10px;
    margin-left: 13px;
    background-color: ${cor};
    border-radius: 15px;
    color: white;
    font-family: 'Aboreto', serif;
    user-select: none;
`