import styled, {css} from "styled-components"

export const SC_Wrapper = styled.div`
    border-radius: 20px;
    border: 1px solid black;
    padding: 20px 10px;
`;

export const SC_MiniWrapper = styled.div`
    display: flex;
    border-radius: 8px;
    padding: 10px;
    transition: 0.5s var(--transicao-basica);
    align-items: center;

    &:hover {
        cursor: pointer;
    }
`;

export const SC_Button = styled.button`
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3px;
    padding: 10px;
    border-radius: 10px;
    letter-spacing: 5px;
    background-color: var(--cor-terciaria);
    color: white;
    font-family: 'Cinzel';
    font-weight: 600;
    transition: 0.5s ease-in-out;

    & svg {
        transition: 0.5s ease-in-out;
    }

    &:hover {
        cursor: pointer;
        background-color: var(--cor-principal);
        letter-spacing: 8px;
        color: #f1f1f1;

        & svg {
            transform: translateX(5px) translateY(-2px);
        }
    }
`;

const buttonHover = css`
    cursor: pointer;

        & svg {
            transform: scale(1.2);
        }
`;

export const SC_ButtonInteracao = styled.button`
    border: 1px solid ${props => props.cor};
    color: ${props => props.cor};
    border-radius: 8px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    background-color: white;
    font-family: 'Arial', serif;
    align-items: center;
    margin-left: 15px;
    width: 65px;
    
    & svg {
        transition: 0.5s var(--transicao-basica);
    }

    &:hover {
        ${props => props.nohover ? 'user-select: none;' : buttonHover}
    }

`

