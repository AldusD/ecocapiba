import PropTypes from "prop-types";

import {
  WidgetCard,
  Header,
  StatsContainer,
  MultiplierBox,
  MultiplierValue,
  MultiplierLabel,
  StreakText,
  ProgressBarContainer,
  ProgressBarFill
} from "./styles";

export default function StreakWidget({ streakWeeks, multiplier }) {

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

StreakWidget.propTypes = {
  streakWeeks: PropTypes.number,
  multiplier: PropTypes.number,
};