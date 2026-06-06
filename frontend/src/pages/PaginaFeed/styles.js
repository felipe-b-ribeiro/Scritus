import styled from "styled-components";

export const SC_MainContainerFeed = styled.main`
  background-color: darkgray;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;

  & .backButtonFeed {
    padding: 11px;
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
    cursor: pointer;

    &:hover {
      opacity: 0.6;
    }
  }

  & .feedPage {
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
    background-image: radial-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 0);
    background-size: 3px 3px;
    padding: 18px 30px;
    align-items: center;
    display: flex;
    flex-direction: column;
  }

  & .navigationButton {
    padding: 10px;
    position: absolute;
    bottom: 70px;
    right: -60px;
    border-radius: 10px;
    background-color: lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    transition: 0.7s var(--transicao-basica);
    box-shadow: 2px 2px 6px black;
    cursor: pointer;

    &:nth-child(2) {
      bottom: 10px;
    }

    &:hover {
      opacity: 0.6;
    }

    &:disabled {
      opacity: 0.4;
    }
  }

  & .feedTitle {
    font-family: "Cinzel", serif;
    font-size: 1.5em;
    text-align: center;
    margin-bottom: 5px;
  }

  & .feedTagWrapper {
    width: 300px;
    display: flex;
    gap: 4px;
    justify-content: center;
    margin-bottom: 20px;
  }

  & .feedTag {
    padding: 5px 10px;
    border: 1px solid black;
    border-radius: 15px;
    background-color: white;
    font-family: "Raleway", Arial;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8em;
    transition: 0.3s var(--transicao-basica);
    white-space: nowrap;
    cursor: pointer;

    &:hover {
      background-color: black;
      color: white;
    }
  }

  & .feedSampleText {
    font-family: "Cinzel", serif;
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
  }

  & .feedBookCover {
    position: absolute;
    bottom: 15px;
    left: 40px;
    border-radius: 15px;
    width: 130px;
    height: 180px;
    background-color: gray;
    border: 1px solid black;
    cursor: pointer;
    transition: 0.5s var(--transicao-basica);

    &:hover {opacity: 0.8}
  }

  & .feedReadButton {
    position: absolute;
    bottom: 15px;
    left: 110px;
    border-radius: 10px;
    padding: 7px 14px;
    background-color: var(--cor-principal);
    border: none;
    color: white;
    font-family: "Cinzel", serif;
    font-size: 1.2em;
    transition: 0.5s var(--transicao-basica);
    cursor: pointer;

    &:hover {
      background-color: #915e33;
    }
  }

  & .feedInteractionsWrapper {
    display: flex;
    position: absolute;
    bottom: 15px;
    right: 50px;
  }

  & .feedInteractionButton {
    border: 1px solid black;
    color: black;
    border-radius: 8px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    background-color: white;
    font-family: "Arial", serif;
    align-items: center;
    margin-left: 15px;
    width: 65px;
    cursor: pointer;

    &.likes {border-color: red;color: red;}

    &.saves {border-color: blue;color: blue;}

    &.nohover {
      cursor: default;
      user-select: none;

      &:hover {& svg {transform: none;}}}

    & svg {transition: 0.5s var(--transicao-basica);}

    &:hover {& svg {transform: scale(1.1);}}
  }
`;
