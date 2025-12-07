import styled from "styled-components"

export const CalendarApp = styled.div`

    width: 463px;
    height: 690px;
    display: grid;
`;

export const Wrapper = styled.div`

    column-gap: 1.5 rem;
    width: 100%;
    aspect-ratio: 2/3;
    background-color: #1e242d;
    border: 0.3rem solid #0f1319;
    border-radius: 1rem;
    
    
    h3 {
        font-size: clamp(2rem, 1.9cqi, 3rem);
        color: #FFFFFF;
        letter-spacing: 0.1rem;
        padding-left: 1.3rem;
    }
`;

export const NavigateDate = styled.div`

    display: flex;
    alignt-items: center;
    column-gap: 0.3rem;
    margin: 1.2rem 0;

    h4 {
        font-size: clamp(1.5rem, 1.5cqi, 2.4rem);
        color: #bbb;
        padding-left: 1.3rem;
    }

    buttons i {
        width: 3.5rem;
        height: 3.5rem;
        background-color: #2c3542;
        border-radius: 50%;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        color: #c97f1a
        cursor: pointer
    }

`;

export const Buttons = styled.div`

    display: flex;
    column-gap: 1rem;
    margin-left: auto;

    i {
        width: 3.5rem;
        height: 3.5rem;
        background-color: #2c3542;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        color: #478426;
        cursor: pointer;
    }
`;

export const Weekdays = styled.div`

    width: 100%;
    display: flex;
    margin: 3rem 0;

    span {
        width: calc(100%/7);
        font-size: clamp(1rem, 0.8cqi, 1.3rem);
        font-weight: bold;
        text-transform: uppercase;
        color: #78879e;
        letter-spacing: 0.1 rem;
        display: flex;
        justify-content: center;

    }
`;

export const Days = styled.div`

    display: flex;
    flex-wrap: wrap;

    span {
        font-size: clamp(1.2rem, 1cqi, 1.6rem);
        width: calc(100%/7);
        aspect-ratio: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ddd;
    }
    .current-day {
        background-color: #46556bff;
        border-radius: 50%;
        box-shadow: 0 0 1.5rem rgba(52, 58, 71, 0.78);
    }

    .recycled-day {
        background-color: #145e12ff;
        border-radius: 50%;
        box-shadow: 0 0 1.5rem rgba(35, 95, 58, 0.78);
    }
`;