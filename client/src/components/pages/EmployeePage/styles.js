import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background-color: #011318;
  padding: 20px;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto 40px;
  padding: 20px;
  background-color: #1A1A1A;
  border-radius: 10px;
  color: #67A02C;

  h1 {
    font-size: 1.8rem;
    font-weight: 700;
  }

  .logout-btn {
    background-color: #EF5350;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.3s;

    &:hover {
      background-color: #d32f2f;
    }
  }
`;

export const MainCard = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background-color: #FFFFFF;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  color: #67A02C;
  font-size: 2rem;
  margin-bottom: 30px;
  text-align: center;
`;

export const FormSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Label = styled.label`
  font-weight: 600;
  color: #333333;
  font-size: 1rem;
`;

export const Select = styled.select`
  padding: 12px;
  border: 2px solid #75B03B;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #67A02C;
  }
`;

export const Input = styled.input`
  padding: 12px;
  border: 2px solid #75B03B;
  border-radius: 8px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #67A02C;
  }
`;

export const TextArea = styled.textarea`
  padding: 12px;
  border: 2px solid #75B03B;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #67A02C;
  }
`;

export const Button = styled.button`
  background-color: #67A02C;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
  margin-top: 20px;

  &:hover {
    background-color: #558724;
  }

  &:disabled {
    background-color: #A9A9A9;
    cursor: not-allowed;
  }
`;

export const QRDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 30px;
  background-color: #F7F7F7;
  border-radius: 12px;
  margin-top: 30px;

  canvas {
    border: 4px solid #67A02C;
    border-radius: 8px;
    padding: 10px;
    background-color: white;
  }
`;

export const QRInfo = styled.div`
  text-align: center;
  color: #333333;

  h3 {
    color: #67A02C;
    margin-bottom: 10px;
  }

  p {
    margin: 5px 0;
    font-size: 0.95rem;
  }

  .xp-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #478426;
  }
`;

export const DownloadButton = styled.button`
  background-color: #478426;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #3a6b1f;
  }
`;

export const HistorySection = styled.div`
  margin-top: 40px;
  padding-top: 40px;
  border-top: 2px solid #E0E0E0;

  h3 {
    color: #67A02C;
    margin-bottom: 20px;
  }
`;

export const HistoryList = styled.div`
  display: grid;
  gap: 15px;
`;

export const HistoryItem = styled.div`
  background-color: #F7F7F7;
  padding: 15px;
  border-radius: 8px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 15px;
  align-items: center;

  .date {
    font-size: 0.9rem;
    color: #666;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 5px;

    strong {
      color: #333333;
    }

    span {
      font-size: 0.9rem;
      color: #666;
    }
  }

  .xp-badge {
    background-color: #478426;
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    font-weight: 600;
  }
`;