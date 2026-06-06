import { createGlobalStyle } from "styled-components";

const UtilitaryClasses = createGlobalStyle`

    .-t-50 {top: -50px;}
    .cinzel {font-family: 'Cinzel', serif;}
    .color-primary {color: var(--cor-principal)}
    .cursor-pointer {cursor: pointer;}
    .flex {display: flex;}
    .flex-column {flex-direction: column}
    .flex-row {flex-direction: row}
    .font-normal {font-weight: normal;}
    .gap-10 {gap: 10px}
    .gap-16 {gap: 16px}
    .gap-20 {gap: 20px}
    .gap-5 {gap: 5px}
    .gap-50 {gap: 50px}
    .gap-70 {gap: 70px}
    .gap-8 {gap: 8px}
    .hidden {display: none;}
    .items-center {align-items: center}
    .justify-around {justify-content: space-around}
    .justify-between {justify-content: space-between}
    .justify-center {justify-content: center}
    .justify-start {justify-content: flex-start}
    .l-6 {left: 6px}
    .m-0 {margin: 0;}
    .m-10 {margin: 10px;}
    .m-20 {margin: 20px;}
    .m-30 {margin: 30px;}
    .m-40 {margin: 40px;}
    .m-50 {margin: 50px;}
    .mb-5 {margin-bottom: 5px;}
    .mb-15 {margin-bottom: 15px;} 
    .mb-20 {margin-bottom: 20px;}
    .ml-0 {margin-left: 0;}
    .ml-20 {margin-left: 20px;}
    .mr-6vw {margin-right: 6vw;}
    .mt-10 {margin-top: 10px;}
    .mt-10vh {margin-top: 10vh;}
    .mt-20 {margin-top: 20px;}
    .mt-3 {margin-top: 3px}
    .mt-30 {margin-top: 30px;}
    .mt-40 {margin-top: 40px;}
    .mt-5 {margin-top: 5px;}
    .mt-50 {margin-top: 50px;}
    .mt-7 { margin-top: 7px}
    .p-10 {padding: 10px;}
    .p-20 {padding: 20px;}
    .p-30 {padding: 30px;}
    .p-40 {padding: 40px;} 
    .p-50 {padding: 50px;}
    .px-10vw {padding-left: 10vw; padding-right: 10vw}
    .py-10vh {padding-top: 10vh; padding-bottom: 10vh}
    .r-30 {right: 30px;}
    .raleway {font-family: 'Raleway', serif;}
    .relative {position: relative;}
    .rounded-15 {border-radius: 15px}
    .text-balance {text-wrap: balance;}
    .text-center {text-align: center;}
    .w-200 {width: 200px}
    .z-5 {z-index: 5;}
    .whitespace-nowrap {white-space: nowrap}
`;

export default UtilitaryClasses;
