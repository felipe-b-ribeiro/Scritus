import styled from 'styled-components';

const BotaoPrincipal = styled.div`
    position: relative;
    width: fit-content;
    height: fit-content;
    padding: 11px 0;
    margin: 20px;
    border-radius: 10px;
    background-color: var(--cor-principal);
    color: white !important;
    transition: 0.3s ease-in;
    display: block;
    align-items: center;
    box-shadow: inset 0 0 0.5em #5b4028;
    a {
      padding: 11px 20px;
      color: white !important;
      position: relative;
    }

    &:hover {
        background-color: var(--cor-principal);
        transform: scale(1.03);
        box-shadow: inset 0 0 1em #5b4028;
        a {
          color: #ddd;
        }
    }
`;

export default BotaoPrincipal;