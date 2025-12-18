import styled from "styled-components";

import enums from "../../../../../enums";

export const QuizStyles = styled.div`
  position: relative;
  background-color: ${enums.COLORS.CARD_BG};
  font-family: sans-serif;
  border-radius: 16px;
  padding: 0;
  min-height: 60vh;
  min-width: 60vh;
  max-width: 90vw;
  max-height: 96vh;
  margin: 40px auto;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  text-align: center;
  overflow: hidden;
  padding-bottom: 10px;

  .progress {
    margin-top: 20px;
    color: ${enums.COLORS.PRIMARY_TEXT};
    font-size: 14px;
  }

  img {
    width: 100%;
    height: 26vw;
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    background-color: ${enums.COLORS.LIGHT_ACTION};
    opacity: 80%;
    width: 100%;
    height: 10vh;
    position: absolute;
    top: 0;
    left: 0;

    .quit {
      padding-top: 2px;
      right: 4%;
      position: absolute;
      font-size: 2rem;
      color: red;
    }

    div {
      position: absolute;
      margin: 1rem;
      top: 0vh;
      right: 1rem;
    }

    > span {
      margin: 50% 0;
    }
  }

  p {
    font-size: 1.2rem;
    font-weight: bold;
  }

  .feedback {
    margin-top: 16px;
    font-size: 18px;
  }
`;

export const QuizReport = styled.div`
  display: flex;
  margin-top: 1vh;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  color: ${enums.COLORS.PRIMARY_TEXT};
  
  .green {
      color: ${enums.COLORS.LIGHT_ACTION}
    }

  .red {
    color: ${enums.COLORS.WRONG_RED}
  }
  
  svg {
    font-size: 3.4rem;
    margin: 2vh 0;
  }
`;

export const Options = styled.div`
  display: flex;
  color: ${enums.COLORS.PRIMARY_TEXT};
  flex-direction: column;
  gap: 10px;
  margin: 0 40px;
  margin-top: 20px;

  .wrong-highlighting {
    color: #FFF;
    background-color: ${enums.COLORS.WRONG_RED};
  }

  .correct-highlighting {
    color: #1B1B1B;
    background-color: ${enums.COLORS.LIGHT_ACTION};
  }
`;

export const Option = styled.button`
  border: none;
  border-radius: 12px;
  padding: 12px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
`;

export const Filter = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;

`;