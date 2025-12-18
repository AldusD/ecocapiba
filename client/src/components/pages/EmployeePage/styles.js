import styled from 'styled-components';
import COLORS from '../../../enums/COLORS';

export const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${COLORS.HOME_BG};
  font-family: 'Poppins', sans-serif;
  padding: 20px;
  color: ${COLORS.CARD_BG};

  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto 40px;
  padding: 20px 30px;
  background-color: ${COLORS.DARK_BG};
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.0rem;
  font-weight: 700;
  color: ${COLORS.PRIMARY_ACTION};

  h1 {
    margin: 0;
  }
`;

export const LogoutButton = styled.button`
  background-color: ${COLORS.LOGOUT_BG};
  color: ${COLORS.LOGOUT_TEXT};
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.3s;

  &:hover {
    background-color: ${COLORS.LOGOUT_BG_HOVER};
  }
`;

export const MainCard = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  background-color: ${COLORS.CARD_BG};
  border-radius: 24px;
  padding: 50px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
  color: ${COLORS.CARD_TEXT};
`;

export const HeaderContent = styled.div``;

export const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: ${COLORS.PRIMARY_ACTION};
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Subtitle = styled.p`
  color: ${COLORS.SUBTITLE_TEXT};
  margin-bottom: 40px;
  font-size: 1rem;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 60px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const FormColumn = styled.div``;

export const InputGroup = styled.div`
  margin-bottom: 25px;
`;

export const InputLabel = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${COLORS.LABEL_TEXT};
  margin-bottom: 8px;
  margin-left: 4px;
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const InputIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: ${COLORS.INPUT_ICON};
  pointer-events: none;
`;

export const ModernInput = styled.input`
  width: 100%;
  background-color: ${COLORS.INPUT_BG};
  border: 2px solid transparent;
  border-radius: 12px;
  padding: 16px;
  padding-left: 48px;
  font-size: 1rem;
  font-family: inherit;
  color: ${COLORS.INPUT_TEXT};
  transition: all 0.3s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    background-color: ${COLORS.CARD_BG};
    border-color: ${COLORS.INPUT_BORDER_FOCUS};
    box-shadow: 0 0 0 4px rgba(103, 160, 44, 0.15);
  }
`;

export const ModernTextarea = styled.textarea`
  width: 100%;
  background-color: ${COLORS.INPUT_BG};
  border: 2px solid transparent;
  border-radius: 12px;
  padding: 16px;
  font-size: 1rem;
  font-family: inherit;
  color: ${COLORS.INPUT_TEXT};
  transition: all 0.3s ease;
  box-sizing: border-box;
  min-height: 120px;
  resize: vertical;

  &:focus {
    outline: none;
    background-color: ${COLORS.CARD_BG};
    border-color: ${COLORS.INPUT_BORDER_FOCUS};
    box-shadow: 0 0 0 4px rgba(103, 160, 44, 0.15);
  }
`;

export const XpGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 15px;
`;

export const XpValue = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${COLORS.XP_TEXT};
`;

export const XpLabel = styled.span`
  font-size: 0.75rem;
  color: ${COLORS.XP_LABEL};
`;

export const XpCard = styled.button`
  background: ${COLORS.CARD_BG};
  border: 2px solid ${COLORS.CARD_BORDER};
  border-radius: 12px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;

  &:hover {
    border-color: ${COLORS.CARD_HOVER_BORDER};
    background-color: ${COLORS.CARD_HOVER_BG};
    transform: translateY(-2px);
  }

  &.active {
    background: ${COLORS.XP_ACTIVE_BG};
    border-color: ${COLORS.PRIMARY_ACTION};
    box-shadow: 0 4px 6px -1px rgba(103, 160, 44, 0.2);
    transform: translateY(-2px);

    ${XpValue} {
      color: ${COLORS.XP_ACTIVE_TEXT};
    }

    ${XpLabel} {
      color: ${COLORS.XP_ACTIVE_TEXT};
    }
  }
`;

export const GenerateButton = styled.button`
  background: linear-gradient(to right, ${COLORS.GRADIENT_START}, ${COLORS.GRADIENT_END});
  color: ${COLORS.CARD_BG};
  border: none;
  padding: 18px;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
  box-shadow: 0 4px 10px rgba(103, 160, 44, 0.3);
  transition: transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(103, 160, 44, 0.4);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

export const ResultColumn = styled.div`
  background-color: ${COLORS.RESULT_BG};
  border-radius: 20px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed ${COLORS.RESULT_BORDER};
  min-height: 400px;
`;

export const PlaceholderState = styled.div`
  text-align: center;
  color: ${COLORS.PLACEHOLDER_TEXT};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

export const PlaceholderIcon = styled.div`
  background: ${COLORS.PLACEHOLDER_BG};
  padding: 20px;
  border-radius: 50%;
  color: ${COLORS.PLACEHOLDER_TEXT};
`;

export const QrResult = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeIn 0.5s ease-out;

  @keyframes fadeIn {
    from { 
      opacity: 0; 
      transform: translateY(10px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }
`;

export const QrFrame = styled.div`
  background: ${COLORS.CARD_BG};
  padding: 15px;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 4px solid ${COLORS.QR_BORDER};
  margin-bottom: 20px;

  img {
    max-width: 100%;
    display: block;
  }
`;

export const TicketInfo = styled.div`
  text-align: center;
  margin-bottom: 25px;
  width: 100%;

  h3 {
    margin: 0;
  }
`;

export const TicketXp = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${COLORS.TICKET_XP};
  line-height: 1;
  margin: 10px 0;
`;

export const TicketMeta = styled.div`
  color: ${COLORS.TICKET_META};
  font-size: 0.9rem;
`;

export const DownloadButton = styled.button`
  background-color: ${COLORS.CARD_BG};
  border: 2px solid ${COLORS.PRIMARY_ACTION};
  color: ${COLORS.PRIMARY_ACTION};
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
  width: 100%;
  justify-content: center;

  &:hover {
    background-color: ${COLORS.DOWNLOAD_HOVER_BG};
  }
`;

export const HistoryContainer = styled.div`
  margin-top: 60px;
  border-top: 1px solid ${COLORS.CARD_BORDER};
  padding-top: 40px;
`;

export const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const HistoryRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  background: ${COLORS.HISTORY_BG};
  padding: 15px 20px;
  border-radius: 12px;
  gap: 20px;
  border-left: 4px solid ${COLORS.HISTORY_BORDER};
`;

export const HistoryXp = styled.div`
  background: ${COLORS.HISTORY_XP_BG};
  color: ${COLORS.HISTORY_XP_TEXT};
  padding: 5px 12px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 0.85rem;
`;