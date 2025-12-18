/* eslint-disable no-unused-vars */
import styled, { createGlobalStyle, keyframes } from "styled-components"
import enums from "../../../enums/";
import LogoImage from "../../../assets/Logo.png"

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const buttonHover = keyframes`
  0% {
    box-shadow: 0 4px 10px rgba(103, 160, 44, 0);
  }
  50% {
    box-shadow: 0 4px 20px rgba(103, 160, 44, 0.3);
  }
  100% {
    box-shadow: 0 4px 10px rgba(103, 160, 44, 0.1);
  }
`;

export const GlobalStyle = createGlobalStyle`
    body {
        background-color: ${enums.COLORS.HOME_BG};
        color: ${enums.COLORS.PRIMARY_TEXT};
        line-height: 1.6;
        font-family: sans-serif;
    }
`;

export const Dashboard = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr; 
    grid-template-rows: auto 1fr;
    grid-template-areas:
        "header header"
        "main-content sidebar";
    gap: 30px;
    max-width: 1200px;
    margin: 40px auto;
    padding: 0 20px;

    header { 
        grid-area: header;
        color: ${enums.COLORS.LIGHT_ACTION};
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        animation: ${fadeIn} 0.6s ease-out;

        .logo h1 {
            margin: 0;
        }

        .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: ${enums.COLORS.LIGHT_ACTION};
            color: ${enums.COLORS.CARD_BG};
            display: grid;
            place-items: center;
            font-weight: 700;
            letter-spacing: 0.5px;
            cursor: pointer;
            text-decoration: none;
            transition: all 0.3s ease;
            
            &:hover {
                background: ${enums.COLORS.PRIMARY_ACTION};
                transform: scale(1.05);
                box-shadow: 0 4px 12px rgba(103, 160, 44, 0.3);
            }
            
            &:active {
                transform: scale(0.95);
            }
        }
    }
    main { 
        grid-area: main-content; 
        animation: ${fadeInUp} 0.6s ease-out 0.1s both;
    }
    aside { 
        grid-area: sidebar;
        animation: ${slideInRight} 0.6s ease-out 0.2s both;
    }

    status-fire-icon {
        font-size: 1.1em;
        position: absolute;
        top: -5px; 
        left: 50%;
        transform: translateX(-50%);
    }
    
    @media (max-width: 850px) {
        grid-template-columns: 1fr;
        grid-template-areas: 
            "header" 
            "sidebar" 
            "main-content";
        gap: 20px;
        padding: 0 15px;
        margin-top: 20px;
        
        main, aside {
            animation: ${fadeInUp} 0.5s ease-out;
        }
    }
`;

export const Logo = styled.div`
    width: 25%;
    height: 80px;    
    background-image: url(${LogoImage});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    transition: transform 0.3s ease;
    
    &:hover {
        transform: scale(1.05);
    }
    
    @media (max-width: 850px) {
        width: 80px;
        height: 60px;
    }
`;

export const Card = styled.section`
    background-color: ${enums.COLORS.CARD_BG};
    border-radius: 10px;
    padding: 25px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    margin-bottom: 20px;
    transition: all 0.3s ease;
    animation: ${fadeInUp} 0.5s ease-out;
    
    &:hover {
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
        transform: translateY(-2px);
    }

    @media (max-width: 850px) {
        padding: 20px;
        margin-bottom: 15px;
    }
`;

export const CardLevelHighlight = styled(Card)`
    background-color: ${enums.COLORS.PROGRESS_BG};
    color: #FFFFFF;
    
    h2, h3, p {
        color: #FFFFFF;
        margin-bottom: 10px;
    }
    
    h2 {
        font-size: 1.8em;
        font-weight: 700;
    }
    
    @media (max-width: 850px) {
        h2 {
            font-size: 1.4em;
        }
    }
`;

export const QuizSection = styled(Card)`
    h2 {
        margin-bottom: 15px;
    }
`;

export const QuizItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 10px;
    transition: all 0.3s ease;
    
    p {
        font-size: 0.9em;
    }
    
    &.quiz-active {
        border: 2px solid #75B03B;
        padding: 20px 15px;
        background-color: rgba(117, 176, 59, 0.05);
        
        &:hover {
            box-shadow: 0 4px 12px rgba(103, 160, 44, 0.2);
            transform: translateX(4px);
        }
    }
    
    &.locked {
        background-color: #F7F7F7;
        opacity: 0.6; 
        pointer-events: none; 
        border: 1px solid transparent;
        
        h4 {
            color: #333333;
        }
    }
    
    @media (max-width: 850px) {
        padding: 12px;
        &.quiz-active {
            padding: 15px 12px;
        }
    }
`;

export const QuizUndone = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: 600;
    
    .locked-text {
        color: #A9A9A9;
        font-size: 0.9em;
    }
`;

export const ActionSection = styled(Card)`
    text-align: center;
    margin-top: 10px;
`;

export const MapPin = styled.div`
    background-color: white;
    border: 5px solid #67A02C;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    box-shadow: 0 0 0 2px white;
    transition: all 0.3s ease;
    
    i {
        color: #67A02C;
        font-size: 1.5em;
    }
    
    &:hover {
        transform: scale(1.08);
        box-shadow: 0 0 0 2px white, 0 4px 16px rgba(103, 160, 44, 0.3);
    }

    @media (max-width: 850px) {
        width: 50px;
        height: 50px;
        i {
            font-size: 1.2em;
        }
    }
`;

export const Button = styled.button`
    padding: 12px 20px;
    border: none;
    border-radius: 10px;
    font-weight: 700;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.3s ease;
    display: inline-block;
    
    &.btn-primary {
        background-color: #67A02C;
        color: white;
        
        &:hover {
            background-color: #558724;
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(103, 160, 44, 0.3);
        }
        
        &:active {
            transform: translateY(0);
        }
    }

    @media (max-width: 850px) {
        padding: 10px 16px;
        font-size: 0.9em;
    }
`;

export const ButtonActionRegister = styled(Button)`
    background-color: #67A02C;
    color: white;
    width: 100%;
    display: flex; 
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 15px;
    transition: all 0.3s ease;
    
    &:hover {
        background-color: #558724;
        box-shadow: 0 8px 20px rgba(103, 160, 44, 0.3);
        transform: translateY(-2px);
    }
    
    &:active {
        transform: translateY(0);
    }

    @media (max-width: 850px) {
        margin-top: 12px;
    }
`;

export const ShareLinkBox = styled.div`
    background-color: #F7F7F7;
    padding: 10px 15px;
    border-radius: 10px;
    font-size: 0.9em;
    color: #333333;
    text-align: center;
    margin: 15px 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    transition: all 0.3s ease;
    
    &:hover {
        background-color: #EFEFEF;
    }
`;

export const SocialButtons = styled.div`
    display: flex;
    gap: 10px;
    
    @media (max-width: 850px) {
        flex-direction: column;
    }
`;

export const ButtonSocial = styled.a`
    color: white;
    flex-grow: 1;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 12px 0;
    border: none;
    border-radius: 10px;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
    font-weight: 600;
    
    &.btn-whatsapp {
        background-color: #25D366;
        
        &:hover {
            background-color: #1faf51;
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(37, 211, 102, 0.3);
        }
    }
    
    &.btn-instagram {
        background-color: #FF6B00;
        
        &:hover {
            background-color: #e55a00;
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(255, 107, 0, 0.3);
        }
    }
    
    &:active {
        transform: translateY(0);
    }

    @media (max-width: 850px) {
        padding: 10px 0;
        font-size: 0.9em;
    }
`;

export const XpContainer = styled.div`
    margin-top: 15px;
    animation: ${fadeInUp} 0.6s ease-out 0.3s both;
`;

export const XpTrack = styled.div`
    background-color: rgba(255, 255, 255, 0.3); 
    height: 10px;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 5px;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);

    @media (max-width: 850px) {
        height: 8px;
    }
`;

export const XpFill = styled.div`
    height: 100%;
    background: linear-gradient(90deg, #67A02C, #75B03B);
    border-radius: 5px;
    transition: width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 0 10px rgba(103, 160, 44, 0.4);
`;

export const XpText = styled.span`
    font-size: 0.9em;
    font-weight: 600;
    display: block;
    text-align: right;
    color: #FFFFFF;

    @media (max-width: 850px) {
        font-size: 0.85em;
    }
`;

export const GlobalMediaQuery = `
    @media (max-width: 850px) {
        ${Dashboard} {
            grid-template-columns: 1fr;
            grid-template-areas: "header" "sidebar" "main-content";
            gap: 20px;
            padding: 0 15px;
            margin-top: 20px;
        }
    }
`;
