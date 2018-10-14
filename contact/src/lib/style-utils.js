import { css, keyframes } from 'styled-components';

export const media = {
    mobile: (...arg) => css`
        @media (max-width: 768px) {
            ${ css(...arg) }
        }
    `
};

export const transitions = {
    slideDown:  keyframes`
    0% {
        opacity: 0;
        transform: translateY(-100vh);
    }
    75% {
        opacity: 1;
        transform: translateY(25px);
    }
    100% {
        transfrom: translateY(0px);
    }
    `,
    slideUp:  keyframes`
    0% {
        transform: translateY(0px);
        opacity: 1;
    }
    75% {
        opacity: 1;
        transform: translateY(25px);
    }
    100% {
        opacity: 0;
        transfrom: translateY(-100vh);
    }
    `,
    stretchOut: keyframes`
    0% {
        transform: scale(1,-1);
    }
    100% {
        transform: scale(0,0);
    }
    `
}