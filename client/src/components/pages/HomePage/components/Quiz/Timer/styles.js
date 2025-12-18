import styled from "styled-components";
import enums from "../../../../../../enums";

export const TimerStyles = styled.div`
    display: flex;
    align-items: center;

    padding: 4px 8px;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.14);
    backdrop-filter: blur(6px);

    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.22);

    width: fit-content;

    svg {
        font-size: 22px;
        color: ${enums.COLORS.PRIMARY_TEXT};
        filter: drop-shadow(0 0 4px rgba(80, 115, 255, 0.6));
    }

    .counter {
        font-size: 22px;
        font-weight: 600;
        color: #ffffff;
        letter-spacing: 1px;
        text-shadow: 0 0 6px rgba(255, 255, 255, 0.6);
    }

`;