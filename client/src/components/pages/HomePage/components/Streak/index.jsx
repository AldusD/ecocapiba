import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";

// --- Estilos do Componente ---
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

const WidgetCard = styled.div`
  background: linear-gradient(135deg, #2e7d32 0%, #4caf50 100%);
  color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  font-family: inherit;
`;

const Header = styled.div`
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

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const MultiplierBox = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 10px 20px;
  border-radius: 8px;
  text-align: center;
  width: 100%;
`;

const MultiplierValue = styled.span`
  display: block;
  font-size: 2.2rem;
  font-weight: 800;
  line-height: 1;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
`;

const MultiplierLabel = styled.span`
  font-size: 0.8rem;
  opacity: 0.9;
  font-weight: 500;
`;

const StreakText = styled.p`
  font-size: 0.9rem;
  text-align: center;
  margin: 5px 0;
  
  strong {
    font-weight: 700;
    color: #ffeb3b; /* Amarelo destaque */
  }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(0,0,0,0.2);
  border-radius: 4px;
  overflow: hidden;
  margin-top: 5px;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  background-color: #ffeb3b;
  transition: width 0.5s ease-out;
`;

// --- Lógica do Componente ---
export default function StreakWidget({ streakWeeks, multiplier, loading }) {
  if (loading) {
    return (
      <WidgetCard style={{ opacity: 0.7, textAlign: 'center' }}>
        <p>Carregando bônus...</p>
      </WidgetCard>
    );
  }

  // Calcula a porcentagem da barra (considerando teto de 1.7x)
  // 1.0x = 0%, 1.7x = 100%
  const percentage = Math.min(100, Math.max(5, ((multiplier - 1) / 0.7) * 100));

  return (
    <WidgetCard>
      <Header>
        <span className="fire-icon">🔥</span>
        <h4>Sequência Atual</h4>
      </Header>

      <StatsContainer>
        <MultiplierBox>
          <MultiplierValue>{multiplier}x</MultiplierValue>
          <MultiplierLabel>Bônus de XP</MultiplierLabel>
        </MultiplierBox>

        <StreakText>
          Você reciclou por <strong>{streakWeeks} semanas</strong> seguidas!
        </StreakText>

        <ProgressBarContainer>
          <ProgressBarFill style={{ width: `${percentage}%` }} />
        </ProgressBarContainer>
      </StatsContainer>
    </WidgetCard>
  );
}

// --- Validação de Tipos (Correção do Erro ESLint) ---
StreakWidget.propTypes = {
  streakWeeks: PropTypes.number,
  multiplier: PropTypes.number,
  loading: PropTypes.bool,
};