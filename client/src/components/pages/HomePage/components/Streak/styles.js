import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

export const WidgetCard = styled.div`
  background: linear-gradient(135deg, #2e7d32 0%, #4caf50 100%);
  color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  font-family: inherit;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  
  .fire-icon {
    font-size: 1.5rem;
    animation: ${pulse} 1.5s infinite;
  }

  h4 {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: white;
  }
`;

export const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const MultiplierBox = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 10px 20px;
  border-radius: 8px;
  text-align: center;
  width: 100%;
`;

export const MultiplierValue = styled.span`
  display: block;
  font-size: 2.2rem;
  font-weight: 800;
  line-height: 1;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
`;

export const MultiplierLabel = styled.span`
  font-size: 0.8rem;
  opacity: 0.9;
  font-weight: 500;
`;

export const StreakText = styled.p`
  font-size: 0.9rem;
  text-align: center;
  margin: 5px 0;
  
  strong {
    font-weight: 700;
    color: #ffeb3b; 
  }
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(0,0,0,0.2);
  border-radius: 4px;
  overflow: hidden;
  margin-top: 5px;
`;

export const ProgressBarFill = styled.div`
  height: 100%;
  background-color: #ffeb3b;
  transition: width 0.5s ease-out;
`;