import styled from "styled-components";

const SC_ErrorHelper = styled.p`

    font-size: 15px;
    color: var(--cor-sair-deletar);
    font-family: 'Raleway', serif;
    padding: 10px;
    position: absolute;
    left: 126%;
    top: 50%;
    transform: translateY(-50%);
    background-color: var(--cor-principal);
    color: white;
    border-radius: 10px;
    white-space: nowrap;
    user-select: none;
    z-index: 3;

    &::before {
        content: "";
        position: absolute;
        z-index: 2;
        top: 50%;
        transform: translateY(-50%);  /* distancia da cauda ao balão */
        left: -17px;     /* alinhamento horizontal da cauda */
        border-width: 10px;
        border-style: solid;
        border-color: transparent var(--cor-principal) transparent transparent;
    }
`; 

export default SC_ErrorHelper;