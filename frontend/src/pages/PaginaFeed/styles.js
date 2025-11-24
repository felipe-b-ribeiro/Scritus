import styled, {css} from "styled-components";
 
export const SC_Página = styled.div`
    position: relative;
    width: 43%;
    height: 100%;
    background: #fdfbf7; 
    border: 1px solid #e6dfd1; 
    border-radius: 6px;
    box-shadow:
        0 0 1px rgba(0, 0, 0, 0.2),
        0 1px 3px rgba(0, 0, 0, 0.08),
        0 10px 15px -10px rgba(0, 0, 0, 0.15);
    background-image:
        radial-gradient(rgba(0,0,0,0.03) 1px, transparent 0);
    background-size: 3px 3px;
    padding: 18px 30px;
    align-items: center;
    display: flex;
    flex-direction: column;
`
export const SC_BotaoVoltar = styled.button`
    padding: 15px;
    position: absolute;
    top: 10px;
    left: 10px;
    border-radius: 10px;
    background-color: lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    transition: 0.7s var(--transicao-basica);
    box-shadow: 2px 2px 6px black;

    & svg {
        transform: rotate(-135deg);
        transition: 0.5s var(--transicao-basica);
    }

    &:hover {
        opacity: 0.6;
        cursor: pointer;

        & svg {
            transform: rotate(-135deg) scale(1.2);
        }
    }
`;

export const SC_BotaoNavegacao = styled.button`
    padding: 15px;
    position: absolute;
    bottom: 80px;
    right: -70px;
    border-radius: 10px;
    background-color: lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    transition: 0.7s var(--transicao-basica);
    box-shadow: 2px 2px 6px black;

    &:disabled {
        opacity: 0.4;
    }

    & svg {
        transform: rotate(315deg);
        transition: 0.5s var(--transicao-basica);
    }

    &:nth-child(2) {
       bottom: 10px;
       
       svg {
        transform: rotate(-225deg);
       }

       &:hover {
        svg {
             transform: rotate(-225deg) scale(1.2) !important;
        }
        }
       
    }

    &:hover {
        opacity: 0.6;
        cursor: pointer;

        & svg {
            transform: rotate(315deg) scale(1.2);
        }
    }
`;

export const SC_Titulo = styled.h1`
    font-family: 'Cinzel', serif;
    font-size: 1.5em;
    text-align: center;
    margin-bottom: 5px;
`;

export const SC_TagWrapper = styled.div`
    width: 300px;
    display: flex;
    gap: 4px;
    justify-content: center;
    margin-bottom: 20px;
`;

export const SC_Tag = styled.div`
    padding: 5px 10px;
    color: ${props => props.cor || 'black'};
    border: 1px solid ${props => props.cor || 'black'};
    border-radius: 15px;
    background-color: white;
    font-family: 'Raleway', 'Arial';
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8em;
    transition: 0.3s var(--transicao-basica);
    white-space: nowrap;

    &:hover {
        background-color: ${props => props.cor || 'black'};
        color: white;
        cursor: pointer;
    }
`;

export const SC_TextoAmostra = styled.h4`
    font-family: 'Cinzel', serif;
    width: 85%;
    max-height: 390px;
    font-size: 0.95em;
    padding: 0 10px;
    overflow-y: auto;
    text-align: justify;
    scrollbar-color: var(--cor-principal) transparent;

    &::-webkit-scrollbar-thumb {
        background-color: var(--cor-principal);
}
`
export const SC_Capa = styled.img`
    position: absolute;
    bottom: 15px;
    left: 40px;
    border-radius: 15px;
    width: 130px;
    height: 180px;
    background-color: gray;
    border: 1px solid black;
`;

export const SC_BotaoLer = styled.button`
    position: absolute;
    bottom: 15px;
    left: 110px;
    border-radius: 10px;
    padding: 7px 14px;
    background-color: var(--cor-principal);
    border: none;
    color: white;
    font-family: 'Cinzel', serif;
    font-size: 1.2em;
    transition: 0.5s var(--transicao-basica);

    &:hover {
        background-color: #915e33ff;
        cursor: pointer;
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

`;

export const SC_WrapperInteracoes = styled.div`
    display: flex;
    position: absolute;
    bottom: 15px;
    right: 50px;
`