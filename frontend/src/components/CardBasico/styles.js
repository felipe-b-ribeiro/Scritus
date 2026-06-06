import styled from "styled-components";

const SC_CardBasico = styled.div`
  align-items: center;
  border-radius: 8px;
  border: 1px solid #eee;
  box-shadow: 0 0 0.3em #000000ff;
  color: white;
  display: flex;
  font-family: "Cinzel", serif;
  gap: 10px;
  justify-content: center;
  margin: 16px;
  min-height: 140px;
  padding: 16px;
  position: relative;
  transition: 0.3s ease;
  width: 100%;

  @media (min-width: 768px) {
    min-height: 120px;
  }

  &.selected {
    opacity: 0.7;
  }

  > svg {
    position: absolute;
    right: 13px;
    top: -15px;
    z-index: 2;
    opacity: 1;
    filter: drop-shadow(0px 1px 0px black) drop-shadow(0px -1px 0px black)
      drop-shadow(1px 0px 0px black) drop-shadow(-1px 0px 0px black);
  }

  > h2 {
    position: absolute;
    top: 12%;
    left: 5%;
    font-size: 28px;
    z-index: 1;
  }

  > h5 {
    position: absolute;
    top: 38%;
    left: 5%;
    white-space: wrap;
    width: 50%;
    font-size: clamp(14px, 3.5vw, 16px);
    text-wrap: balance;
    z-index: 1;

    @media (min-width: 768px) {
      width: 70%;
      top: 45%;
    }
  }

  > img {
    position: absolute;
    aspect-ratio: 1 / 1;
    z-index: 0;
    max-width: 40vw;
  }

  &.primary {
    background-color: var(--cor-leitor);

    > svg {
      fill: #cccccc;
    }

    > h2 {
      color: #cccccc;
    }

    > img {
      width: 180px;
      right: 0;
      bottom: 0;
      border-radius: 7px;

      @media (min-width: 768px) {
        width: 160px;
      }
    }
  }

  &.secondary {
    background-color: var(--cor-autor);

    > svg {
      fill: #ffc088;
    }

    > h2 {
      color: #ffc088;
    }

    > img {
      width: 200px;
      right: -15px;
      bottom: -20px;
      border-radius: 7px;

      @media (min-width: 768px) {
        width: 180px;
        right: -5px;
      }
    }
  }

  &.tertiary {
    background-color: var(--cor-editora);

    > svg {
      fill: #5b4028;
    }

    > h2 {
      color: #5b4028;
    }

    > img {
      bottom: 0;
      right: 10px;
      width: 160px;

      @media (min-width: 768px) {
        width: 145px;
        right: 10px;
      }
    }
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.03);
  }
`;

export default SC_CardBasico;
