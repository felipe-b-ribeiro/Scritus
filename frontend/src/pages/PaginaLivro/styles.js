import styled from "styled-components";

export const SC_BookPageContainer = styled.div`
  position: relative;
  display: flex;

  > div:first-of-type {
    position: relative;
    height: fit-content;

    > img:first-of-type {
      border-radius: 20px;
      border: 1px solid black;
    }
    > img:nth-of-type(2) {
      position: absolute;
      bottom: 18px;
      left: 10px;
    }
  }

  > div:nth-of-type(2) {
    border-radius: 20px;
    margin-left: 20px;
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    & .wrapper {
      border-radius: 20px;
      border: 1px solid black;
      padding: 20px 30px;
      width: 100%;

      &:nth-of-type(2) {
        padding-right: 20px;
      }

      > h1 {
        font-family: "Cinzel", serif;
      }

      > p {
        font-family: "Raleway", serif;
        max-width: 100%;
        white-space: wrap;
        word-wrap: break-word;
        max-height: 200px;
        overflow-y: auto;
        padding-right: 20px;
        hyphens: auto;
        text-align: justify;

        scrollbar-color: var(--cor-principal) transparent;
        scrollbar-width: thin;

        &::-webkit-scrollbar {
            width: 8px;
            background: transparent;
        }
        
        &::-webkit-scrollbar-track {background: transparent;}
        
        &::-webkit-scrollbar-thumb {
            background: #cb8446 !important;
            border-radius: 4px;
            
            &:hover {background: #E89953 !important;}
        }
        }

        > strong {
          color: var(--cor-principal);
          font-weight: normal;
          font-family: "Cinzel", serif;
        }
      }
    }

    & .miniProfileWrapper {
      display: flex;
      align-items: center;
      border-radius: 10px;
      border: 1px solid black;
      padding: 10px;
      width: fit-content;
      background-color: transparent;

      > img {
        border-radius: 50%;
        border: 1px solid black;
      }
      > h5 {
        margin-left: 10px;
        font-size: 1.3em;
        font-family: Raleway;
        font-weight: normal;
      }
    }

  & .readButton {
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;
    padding: 10px;
    border-radius: 10px;
    letter-spacing: 5px;
    background-color: var(--cor-terciaria);
    color: white;
    font-family: "Cinzel";
    font-weight: 600;
    transition: 0.5s ease-in-out;

    > svg {
      display: block;
      padding-bottom: 1px;
    }

    &:hover {
      cursor: pointer;
      background-color: var(--cor-principal);
      letter-spacing: 8px;
      color: #f1f1f1;
    }
  }
`;
