import styled from "styled-components";

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
  z-index: 9999;
`;

export const Container = styled.div`
  position: relative; /* Changed from fixed to relative */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70vw;     
  height: 30vh;    
  background-color: #478426;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  padding: 20px;

  .center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #FFFFFF;
    text-align: center;
    gap: 15px;
  }
  
  @media (min-width: 768px) {
    width: 400px;
    height: 400px;
  }
`;

export const CheckMark = styled.div`
    color: white;
    height: 100px;
    width: 100px;
    font-size: 5rem;
`;