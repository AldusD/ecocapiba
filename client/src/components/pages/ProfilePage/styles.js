import styled, { createGlobalStyle } from "styled-components";
import enums from "../../../enums/";

export const GlobalStyle = createGlobalStyle`
    body {
        background-color: ${enums.COLORS.HOME_BG};
        color: ${enums.COLORS.PRIMARY_TEXT};
        line-height: 1.6;
        font-family: sans-serif;
    }
`;

export const PageContainer = styled.div`
    max-width: 1200px;
    margin: 40px auto;
    padding: 0 20px;
`;

export const BackButton = styled.a`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    background: ${enums.COLORS.CARD_BG};
    color: ${enums.COLORS.PRIMARY_TEXT};
    border: 1px solid ${enums.COLORS.CARD_BORDER};
    border-radius: 10px;
    text-decoration: none;
    font-weight: 600;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
    margin-bottom: 16px;

    &:hover {
        background: ${enums.COLORS.CARD_HOVER_BG};
        border-color: ${enums.COLORS.CARD_HOVER_BORDER};
    }
`;

export const ProfileCard = styled.section`
    background-color: ${enums.COLORS.CARD_BG};
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`;

export const ProfileHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
`;

export const Avatar = styled.div`
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: ${enums.COLORS.LIGHT_ACTION};
    color: ${enums.COLORS.CARD_BG};
    display: grid;
    place-items: center;
    font-weight: 800;
    font-size: 1.1rem;
`;

export const UserInfo = styled.div`
    h2 {
        margin: 0;
        font-size: 1.4rem;
    }

    p {
        margin: 4px 0 0;
        color: ${enums.COLORS.SECONDARY_TEXT};
        font-size: 0.95rem;
    }
`;

export const HistorySection = styled.section`
    margin-top: 10px;
`;

export const HistoryTitle = styled.h3`
    margin: 0 0 14px;
    color: ${enums.COLORS.SECONDARY_TEXT};
`;

export const HistoryList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const HistoryItem = styled.article`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 16px;
    background: ${enums.COLORS.CARD_BG};
    border-radius: 10px;
    border: 1px solid ${enums.COLORS.HISTORY_BORDER};
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);

    &:hover {
        background: ${enums.COLORS.CARD_HOVER_BG};
        border-color: ${enums.COLORS.CARD_HOVER_BORDER};
    }

    h3 {
        margin: 0 0 4px;
        font-size: 1.05rem;
    }

    .date {
        color: ${enums.COLORS.SECONDARY_TEXT};
        font-size: 0.9rem;
    }
`;

export const ActionInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const ActionIcon = styled.div`
    width: 46px;
    height: 46px;
    border-radius: 12px;
    background: ${enums.COLORS.XP_ACTIVE_BG};
    color: ${enums.COLORS.LIGHT_ACTION};
    display: grid;
    place-items: center;
    font-size: 1.2rem;
    font-weight: 700;
`;

export const ActionMeta = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    .label {
        color: ${enums.COLORS.SECONDARY_TEXT};
        font-size: 0.85rem;
    }
`;

export const ActionValue = styled.span`
    color: ${enums.COLORS.HISTORY_XP_TEXT};
    font-weight: 800;
    font-size: 1.15rem;
`;
