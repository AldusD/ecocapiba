import styled, { keyframes } from "styled-components";
import enums from "../../../../../enums/";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ShareSectionCard = styled.section`
  background-color: ${enums.COLORS.CARD_BG};
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  font-family: 'Work Sans', sans-serif;
  text-align: center;
  animation: ${fadeInUp} 0.5s ease-out;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }

  h3 {
    margin-top: 0;
    margin-bottom: 8px;
    font-size: 1.25rem;
    font-weight: 700;
    color: ${enums.COLORS.PRIMARY_TEXT};
  }

  p {
    margin: 0 0 16px 0;
    color: ${enums.COLORS.SECONDARY_TEXT};
    font-size: 0.95rem;
  }

  @media (max-width: 850px) {
    padding: 20px;
    h3 {
      font-size: 1.1rem;
    }
    p {
      font-size: 0.9rem;
    }
  }
`;

export const SocialButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  color: white;
  text-decoration: none;
  font-family: 'Work Sans', sans-serif;
  gap: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
  font-size: 0.95rem;
  animation: ${slideInDown} 0.4s ease-out;

  &:hover {
    opacity: 0.85;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 1.2em;
    height: 1.2em;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: scale(1.1);
  }

  @media (max-width: 850px) {
    padding: 8px 14px;
    font-size: 0.9rem;
  }
`;

export const ShareLinkBox = styled.div`
  background-color: ${enums.COLORS.HIGHLIGHT};
  border: 1px dashed ${enums.COLORS.BORDER};
  border-radius: 6px;
  padding: 12px;
  margin: 20px 0;
  font-family: monospace;
  font-size: 0.85rem;
  color: ${enums.COLORS.PRIMARY_TEXT};
  word-break: break-all;
  transition: all 0.3s ease;
  animation: ${fadeInUp} 0.5s ease-out 0.1s both;

  &:hover {
    background-color: ${enums.COLORS.BORDER};
    border-color: ${enums.COLORS.PRIMARY_ACTION};
  }

  @media (max-width: 850px) {
    font-size: 0.8rem;
    padding: 10px;
    margin: 15px 0;
  }
`;

export const SocialButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;

  @media (min-width: 480px) {
    flex-direction: row;
    justify-content: center;
  }

  @media (max-width: 850px) {
    gap: 10px;
    margin-top: 15px;
  }
`;

export const WhatsAppButton = styled(SocialButton)`
  background-color: ${enums.COLORS.WHATSAPP};
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(37, 211, 102, 0.4);
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

export const GenericShareButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  color: white;
  text-decoration: none;
  font-family: 'Work Sans', sans-serif;
  gap: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
  font-size: 0.95rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  animation: ${slideInDown} 0.4s ease-out;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  i {
    font-size: 1.1em;
    transition: transform 0.3s ease;
  }

  &:hover i {
    transform: scale(1.15);
  }

  @media (max-width: 850px) {
    padding: 8px 14px;
    font-size: 0.9rem;
  }
`;