import styled, { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
    body {
        background-color: #011318;
        color: #333333;
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
        color: #75B03B
    }
    main { grid-area: main-content; }
    aside { grid-area: sidebar; }

    status-fire-icon {
        font-size: 1.1em;
        position: absolute;
        top: -5px; 
        left: 50%;
        transform: translateX(-50%);
        color: #fce205; /* Cor amarela do fogo */
    }
`;

export const Card = styled.section`
    background-color: #FFFFFF;
    border-radius: 10px;
    padding: 25px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    margin-bottom: 20px;
`;

export const CardLevelHighlight = styled(Card)`
    background-color: #478426;
    color: #FFFFFF;
    
    h2, h3, p {
        color: #FFFFFF;
        margin-bottom: 10px;
    }
    
    h2 {
        font-size: 1.8em;
        font-weight: 700;
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
    
    p {
        font-size: 0.9em;
    }
    
    &.quiz-active {
        border: 1px solid #75B03B;
        padding: 20px 15px;
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
    
    i {
        color: #67A02C;
        font-size: 1.5em;
    }
`;

export const Button = styled.button`
    padding: 12px 20px;
    border: none;
    border-radius: 10px;
    font-weight: 700;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.3s ease;
    display: inline-block;
    background-color: #67A02C;
    color: white;
    
    &:hover {
    background-color: #558724;
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
    transition: background-color 0.3s ease;
    cursor: pointer;
    
    &.btn-whatsapp {
        background-color: #25D366;
    }
    
    &.btn-instagram {
        background-color: #FF6B00;
    }
`;

export const XpContainer = styled.div`
    margin-top: 15px;
`;

export const XpTrack = styled.div`
    background-color: rgba(255, 255, 255, 0.3); 
    height: 10px;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 5px;
`;

export const XpFill = styled.div`
    height: 100%;
    background-color: #67A02C;
    border-radius: 5px;
    transition: width 0.5s ease;
`;

export const XpText = styled.span`
    font-size: 0.9em;
    font-weight: 600;
    display: block;
    text-align: right;
    color: #FFFFFF;
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