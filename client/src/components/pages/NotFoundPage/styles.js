import styled, { createGlobalStyle } from "styled-components";
import enums from "../../../enums/";

export const GlobalStyle = createGlobalStyle`

    body {
        background-color: ${enums.COLORS.HOME_BG};
        color: ${enums.COLORS.PRIMARY_TEXT};
        line-height: 1.6;
        font-family: 'Cabin', sans-serif; /* Default font from template */
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }
`;

export const NotFound = styled.div`
    position: relative;
    height: 100vh;

    .notfound {
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        max-width: 520px;
        width: 100%;
        line-height: 1.4;
        text-align: center;
    }

    h2 {
        font-family: 'Cabin', sans-serif;
        font-size: 20px;
        font-weight: 400;
        text-transform: uppercase;
        color: ${enums.COLORS.PRIMARY_BG};
        margin-top: 0px;
        margin-bottom: 25px;
    }


    @media only screen and (max-width: 480px) {
        h2 {
            font-size: 16px;
        }
    }
`;
export const Number = styled.div`
            position: relative;
        height: 240px;

        h1 {
            font-family: 'Montserrat', sans-serif;
            position: absolute;
            left: 50%;
            top: 50%;
            -webkit-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            font-size: 252px;
            font-weight: 900;
            margin: 0px;
            color: ${enums.COLORS.PROGRESS_BG};
            text-transform: uppercase;
            letter-spacing: -40px;
            margin-left: -20px;

            > span {
                text-shadow: -8px 0px 0px #fff;
            }
        }

        h3 {
            font-family: 'Cabin', sans-serif;
            position: relative;
            font-size: 16px;
            font-weight: 700;
            text-transform: uppercase;
            color: ${enums.COLORS.PRIMARY_BG};
            margin: 0px;
            letter-spacing: 3px;
            padding-left: 6px;
        }

        @media only screen and (max-width: 767px) {
            height: 200px;
            
            h1 {
                font-size: 200px;
            }

        @media only screen and (max-width: 480px) {
            height: 162px;
            
            h1 {
                font-size: 162px;
                height: 150px;
                line-height: 162px;
            }
    }
`;

export const HomeButton = styled.button`
    flex-grow: 1;
    text-align: center;
    align-items: center;
    padding: 12px 8px;
    border: none;
    border-radius: 10px;
    text-decoration: none;
    transition: background-color 0.3s ease;
    cursor: pointer;
    background-color: ${enums.COLORS.PRIMARY_ACTION};
    a {
        color: ${enums.COLORS.PRIMARY_BG};
        text-decoration: none;
    };
`;