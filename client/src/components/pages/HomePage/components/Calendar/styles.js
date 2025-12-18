import styled, { keyframes } from "styled-components"
import enums from "../../../../../enums";

const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const pulseHighlight = keyframes`
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(103, 160, 44, 0.4);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(103, 160, 44, 0);
  }
`;

export const CalendarApp = styled.div`
    width: 100%;
    max-width: 463px;
    animation: ${fadeInScale} 0.5s ease-out;
    
    @media (max-width: ${enums.SCREEN_WIDTHS.MAX_MOBILE}) {
        max-width: 100%;
    }
`;

export const Wrapper = styled.div`
    width: 100%;
    background-color: ${enums.COLORS.CARD_BG};
    border: 1px solid ${enums.COLORS.BORDER};
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    
    h3 {
        font-size: 1.5rem;
        color: ${enums.COLORS.PRIMARY_TEXT};
        letter-spacing: 0.05rem;
        margin: 0 0 15px 0;
        font-weight: 700;
    }
    
    @media (max-width: ${enums.SCREEN_WIDTHS.MAX_MOBILE}) {
        padding: 15px;
        h3 {
            font-size: 1.2rem;
        }
    }
`;

export const NavigateDate = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 15px 0;
    gap: 10px;

    h4 {
        font-size: 1.1rem;
        color: ${enums.COLORS.PRIMARY_TEXT};
        font-weight: 600;
        margin: 0;
        flex: 1;
        text-align: center;
    }

    @media (max-width: ${enums.SCREEN_WIDTHS.MAX_MOBILE}) {
        h4 {
            font-size: 0.95rem;
        }
    }
`;

export const Buttons = styled.div`
    display: flex;
    gap: 8px;
    margin-left: auto;

    i {
        width: 36px;
        height: 36px;
        background-color: ${enums.COLORS.PRIMARY_ACTION};
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1rem;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 2px solid transparent;

        &:hover {
            background-color: ${enums.COLORS.LIGHT_ACTION};
            transform: scale(1.08);
            box-shadow: 0 4px 12px rgba(103, 160, 44, 0.3);
        }

        &:active {
            transform: scale(0.95);
        }
    }

    @media (max-width: ${enums.SCREEN_WIDTHS.MAX_MOBILE}) {
        i {
            width: 32px;
            height: 32px;
            font-size: 0.9rem;
        }
    }
`;

export const Weekdays = styled.div`
    width: 100%;
    display: flex;
    margin: 20px 0 15px 0;
    gap: 5px;

    span {
        width: calc(100% / 7);
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        color: ${enums.COLORS.SECONDARY_TEXT};
        letter-spacing: 0.05rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @media (max-width: ${enums.SCREEN_WIDTHS.MAX_MOBILE}) {
        margin: 15px 0 10px 0;
        span {
            font-size: 0.7rem;
        }
    }
`;

export const Days = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;

    span {
        font-size: 0.9rem;
        font-weight: 500;
        width: calc((100% - 30px) / 7);
        aspect-ratio: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${enums.COLORS.PRIMARY_TEXT};
        border-radius: 50%;
        transition: all 0.3s ease;
        background-color: ${enums.COLORS.HIGHLIGHT};

        &:hover:not(.current-day):not(.recycled-day) {
            background-color: ${enums.COLORS.BORDER};
            transform: scale(1.05);
        }
    }

    .current-day {
        background-color: ${enums.COLORS.PROGRESS_BG};
        color: white;
        font-weight: 700;
        box-shadow: 0 0 12px rgba(71, 132, 38, 0.4);
        animation: ${pulseHighlight} 2s infinite;

        &:hover {
            transform: scale(1.1);
        }
    }

    .recycled-day {
        background-color: ${enums.COLORS.LIGHT_ACTION};
        color: white;
        font-weight: 700;
        box-shadow: 0 0 12px rgba(117, 176, 59, 0.3);
        animation: ${fadeInScale} 0.4s ease-out;

        &:hover {
            background-color: ${enums.COLORS.PRIMARY_ACTION};
            transform: scale(1.1);
            box-shadow: 0 0 16px rgba(103, 160, 44, 0.5);
        }
    }

    @media (max-width: ${enums.SCREEN_WIDTHS.MAX_MOBILE}) {
        gap: 4px;
        span {
            font-size: 0.8rem;
            width: calc((100% - 24px) / 7);
        }
    }
`;