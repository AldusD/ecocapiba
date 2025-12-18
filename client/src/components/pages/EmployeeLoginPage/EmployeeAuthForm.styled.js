import styled from 'styled-components';
import COLORS from '../../../enums/COLORS';

const PrimaryAction = COLORS.PRIMARY_ACTION;
const PrimaryText = COLORS.PRIMARY_TEXT;
const ErrorColor = COLORS.WRONG_RED;
const CardBackground = COLORS.CARD_BG;
const PageBackground = COLORS.PRIMARY_BG;
const InputBorderFocus = COLORS.INPUT_BORDER_FOCUS;
const BorderColor = COLORS.BORDER;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${PageBackground};
  padding: 20px;
`;

export const Card = styled.div`
  background: ${CardBackground};
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 10px ${COLORS.BLACK_TRANSPARENT_10};
  width: 100%;
  max-width: 420px;
  text-align: center;
`;

export const Title = styled.h2`
  color: ${PrimaryAction};
  margin-bottom: 25px;
  font-size: 1.8rem;
  font-weight: 600;
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px 10px;
  margin-bottom: 18px;
  border: 1px solid ${BorderColor};
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 1rem;
  color: ${PrimaryText};
  background-color: ${COLORS.INPUT_BG || '#f3f4f6'};

  &:focus {
    border-color: ${InputBorderFocus};
    box-shadow: 0 0 0 3px rgba(103, 160, 44, 0.4);
    outline: none;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 14px;
  background-color: ${PrimaryAction};
  color: ${CardBackground};
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${COLORS.GRADIENT_END || '#558724'};
  }

  &:disabled {
    background-color: ${BorderColor};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const ErrorMessage = styled.p`
  color: ${ErrorColor};
  margin-top: 10px;
  margin-bottom: 15px;
  font-size: 0.9rem;
  font-weight: 500;
`;

export const BackLink = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid ${BorderColor};
  
  & > a {
    color: ${PrimaryAction};
    text-decoration: none;
    font-size: 0.85rem;
    display: inline-block;
    transition: all 0.2s ease;
    
    &:hover {
        text-decoration: underline;
        opacity: 0.8;
    }
  }
`;

