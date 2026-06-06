import styled from "styled-components";
import { appear, appearPC, vanish, vanishPC } from "./animations.js";

const SC_ErrorHelper = styled.p`
    font-size: 15px;
    color: var(--cor-sair-deletar);
    font-family: 'Raleway', serif;
    height: fit-content;
    width: fit-content;
    padding: 10px;
    position: absolute;
    left: 3%;
    bottom: -50px;
    background-color: var(--cor-principal);
    color: white;
    border-radius: 10px;
    white-space: nowrap;
    user-select: none;
    z-index: 4;
    filter: drop-shadow(2px 1px 1px var(--cor-secundaria));

    &.entering {
        animation: ${appear} 0.5s linear both;
        @media (min-width: 1024px) {
            animation: ${appearPC} 0.5s linear both;
        }
    }
    &.leaving {
        animation: ${vanish} 0.5s linear both;
        @media (min-width: 1024px) {
            animation: ${vanishPC} 0.5s linear both;
        }
    }
    &.closed {display: none;}

    @media (min-width: 1024px) {
        inset: 50% 0 auto auto;
        height: fit-content;
        transform: translateY(-50%);
    }

    &::before {
        content: "";
        position: absolute;
        z-index: 2;
        top: -17px;
        left: 5%;
        border-width: 10px;
        border-style: solid;
        border-color: transparent transparent var(--cor-principal) transparent;

        @media (min-width: 1028px) {
            border-color:  transparent var(--cor-principal) transparent transparent;
            inset: 50% auto auto -17px;
            transform: translateY(-50%);
        }
    }
`;

export default SC_ErrorHelper;
