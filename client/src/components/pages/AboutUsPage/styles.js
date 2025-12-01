import styled from "styled-components";
import titleImage from "../../../assets/recife-pe.webp"
import challengeImage from "../../../assets/leafs.jpg"

export const MainHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px 20px;
    border-bottom: 1px solid #E0E0E0;

    nav a {
        text-decoration: none;
        color: #555555;
        margin-left: 20px;
        font-weight: 600;
        transition: color 0.3s;

        &:hover, &.active {
            color: #67A02C;
        }
    }

    @media (max-width: 550px) {
        flex-direction: column;
        text-align: center;
        gap: 15px;

        nav a {
            margin: 0 10px;
        }
    }
`;

export const HeroSection = styled.section`
    text-align: center;
    padding: 150px 20px 100px 20px;
    background-image: url(${titleImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    animation: slideInFromTop 0.7s ease-out forwards;

    h1 {
        font-size: 4rem;
        font-weight: 600;
        max-width: 900px;
        margin: 0 auto 30px auto;
        line-height: 1.1;
        color: white;

        @media (max-width: 900px) {
            font-size: 3rem;
        }

        @media (max-width: 550px) {
            font-size: 2.2rem;
        }
    }

    p {
        font-size: 1.2rem;
        color: white;
        font-style: italic;
        font-weight: 600;
    }
`;

export const MissionSection = styled.section`
    background-color: #FFFFFF;
    border-bottom: 1px solid #E0E0E0;
    padding: 100px 0;
    animation: slideInFromTop 0.8s ease-out forwards;

    p {
        font-size: 1.15rem;
        margin-bottom: 20px;
        color: #555555;
    }
`;

export const ChallengeSection = styled.section`
    padding: 120px 20px;
    background-image: url(${challengeImage});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    animation: slideInFromTop 0.9s ease-out forwards;

    @media (max-width: 550px) {
        padding: 60px 0;
    }
`;

export const ChallengeCard = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    text-align: center;
`;

export const ChallengeList = styled.div`
    display: flex;
    gap: 30px;
    margin-top: 40px;
    text-align: left;

    article {
        flex: 1;
        padding: 30px;
        background-color: #FFFFFF;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);

        h3 {
            color: #478426;
            font-size: 1.4rem;
            margin-bottom: 10px;
        }
    }

    @media (max-width: 900px) {
        flex-direction: column;

        article {
            padding: 20px;
        }
    }
`;

export const SolutionSection = styled.section`
    background-color: #FFFFFF;
    border-top: 1px solid #E0E0E0;
    text-align: center;
    padding: 100px 0;
    animation: slideInFromTop 1s ease-out forwards;
`;

export const FeatureList = styled.ul`
    list-style: none;
    padding: 0;
    margin-top: 30px;
    display: inline-block;
    text-align: left;

    li {
        font-size: 1.1rem;
        padding: 10px 0;
        border-bottom: 1px dashed #E0E0E0;
        color: #333333;

        strong {
            color: #478426;
            font-weight: 700;
        }

        &:last-child {
            border-bottom: none;
        }
    }
`;

export const TeamSection = styled.section`
    background-color: #F7F7F7;
    padding: 80px 0 100px 0;
    animation: slideInFromTop 1.1s ease-out forwards;

    p {
        font-size: 1.1rem;
        color: #555555;
        margin-bottom: 30px;
    }

    @media (max-width: 550px) {
        padding: 60px 0;
    }
`;

export const TeamList = styled.ul`
    list-style: none;
    padding: 0;
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px 30px;

    li {
        font-weight: 600;
        color: #333333;
        padding: 5px 10px;
        border: 1px solid #75B03B;
        border-radius: 5px;
        transition: background-color 0.3s, border-color 0.3s;
        cursor: pointer;

        &:hover {
            background-color: #75B03B;
            border-color: #333333;
            transform: scale(1.05);
        }
    }
`;

export const ContentBlock = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px;
    text-align: center;

    &.wide-content {
        max-width: 950px;
    }

    h2 {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 20px;
        color: #67A02C;

        @media (max-width: 900px) {
            font-size: 2rem;
        }
    }
`;

export const SectionPreTitle = styled.p`
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 10px;
    color: white;
`;

export const SolutionIntro = styled.p`
    font-size: 1.2rem;
    color: #555555;
    margin-bottom: 40px;
`;

export const Container = styled.main`
    max-width: 100%;
`;