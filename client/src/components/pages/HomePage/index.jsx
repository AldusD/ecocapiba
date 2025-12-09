/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect, useCallback } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import Calendar from "./components/Calendar"
import UserIndication from "./components/UserIndication";
import Quiz from "./components/Quiz";
import StreakWidget from "./components/Streak/index.jsx"; 
import PopUp from "./components/PopUp/index.jsx";

import {
  Dashboard,
  QuizSection,
  QuizItem,
  Button,
  QuizUndone,
  ActionSection,
  MapPin,
  ButtonActionRegister,
  CardLevelHighlight,
  XpContainer,
  XpTrack,
  XpFill,
  XpText,
  Card,
  ShareLinkBox,
  SocialButtons,
  ButtonSocial,
  GlobalStyle
} from "./styles";

export default function HomePage() {
  const USER_ID = 1; // TODO: to be changed to userdata

  const [xpNumber, setXpNumber] = useState(100); 
  const [xpLimit, setXpLimit] = useState(2000);
  
  const [xp300Claimed, setXp300Claimed] = useState(false);
  const [xp1000Claimed, setXp1000Claimed] = useState(false);
  const [xp2500Claimed, setXp2500Claimed] = useState(false);
  
  const [currentLevel, setCurrentLevel] = useState(0); // TODO: to be changed to userdata
  const [currentTitle, setCurrentTitle] = useState("Cidadão"); // to be changed to userdata
  
  const [currentStreak, setCurrentStreak] = useState(0); // TODO: to be changed to userdata
  const [currentMultiplier, setCurrentMultiplier] = useState(1.0);

  const [isScannerVisible, setIsScannerVisible] = useState(false);

  const [quizMode, setQuizMode] = useState(false);
  const [recycleDone, setRecycleDone] = useState(false);

  const readerRef = useRef(null);
  const scannerRef = useRef(null);
  
  const xpString = `${xpNumber} / ${xpLimit} XP`;
  const barPercentage = Math.min(100, (xpNumber / xpLimit) * 100);

  const adjust_xp = useCallback((baseXp) => {
    const bonusXp = Math.round(baseXp * currentMultiplier);
    setXpNumber((prev) => prev + bonusXp);
    
    console.log(`XP Ganho: ${bonusXp} (Base: ${baseXp} * Multiplicador: ${currentMultiplier})`);
  }, [currentMultiplier]);

  useEffect(() => {
    if (xpNumber >= xpLimit) {
      setXpNumber((prev) => prev - xpLimit);
      setXpLimit((prev) => prev * 2);
      setCurrentLevel((prev) => prev + 1);
      setCurrentTitle("Cidadão Consciente");
    }
  }, [xpNumber, xpLimit]);


  useEffect(() => {
    if (!isScannerVisible) return;

    const onScanSuccess = (decodedText, decodedResult) => {
      // handle the scanned code
      console.log(`Code matched = ${decodedText}`, decodedResult);
      
      if (decodedText === "https://pt.wikipedia.org/wiki/Reciclagem" && !xp300Claimed) {
        adjust_xp(300);
        setXp300Claimed(true);
      }
      if (decodedText === "https://pt.wikipedia.org/wiki/Recife" && !xp1000Claimed) {
        adjust_xp(1000);
        setXp1000Claimed(true);
      }
      if (decodedText === "https://pt.wikipedia.org/wiki/Capivara" && !xp2500Claimed) {
        adjust_xp(2500);
        setXp2500Claimed(true);
      }

      setRecycleDone(true);
    };

    const onScanFailure = (error) => {
      // ignore or log
    };

    try {
      scannerRef.current = new Html5QrcodeScanner(
        readerRef.current?.id ?? "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );
      scannerRef.current.render(onScanSuccess, onScanFailure);
    } catch (e) {
      console.error(e);
    }

    return () => {
      if (scannerRef.current) {
        try { scannerRef.current.clear(); } catch (e) { /* ignore */ }
        scannerRef.current = null;
      }
    };
  }, [isScannerVisible, xp300Claimed, xp1000Claimed, xp2500Claimed, adjust_xp, recycleDone]); // adjust_xp included in dependencies

  const showScanner = () => setIsScannerVisible(true);

  return (
    <>
      <GlobalStyle />
      <Dashboard>
        <header>
          <div className="logo">
            <h1>Ecocapiba</h1>
          </div>
        </header>

        <main>
          <QuizSection as="section">
            <h2>Quizzes Ecológicos</h2>

            <QuizItem className="quiz-active">
              <div className="quiz-info">
                <p>Seu próximo desafio:</p>
                <h3>O Ciclo do Plástico</h3>
                </div>
                <Button onClick={()=>{setQuizMode(true)}} className="btn-primary">Começar</Button>
            </QuizItem>

            { quizMode ? <Quiz closeQuiz={() => setQuizMode(false)} /> : <></> }

            <p className="fila-title">Próximos na fila:</p>

            <QuizItem className="locked">
              <div className="quiz-info">
                <h4>Reciclagem de Vidro</h4>
              </div>
              <QuizUndone>
                <span className="locked-text">A ser iniciado</span>
              </QuizUndone>
            </QuizItem>

            <QuizItem className="locked">
              <div className="quiz-info">
                <h4>Compostagem Caseira</h4>
              </div>
              <QuizUndone>
                <span className="locked-text">A ser iniciado</span>
              </QuizUndone>
            </QuizItem>
          </QuizSection>

          <ActionSection as="section">
            <div className="action-content">
              <MapPin>
                <i className="fa-solid fa-location-dot"></i>
              </MapPin>
              <h3>Ação de Reciclagem</h3>
              <p>
                Leve seus recicláveis a um centro de coleta e registre para ganhar XP 
                {currentMultiplier > 1 && <strong> (Bônus ativo: {currentMultiplier}x)</strong>}.
              </p>
              <ButtonActionRegister onClick={showScanner}>
                Registrar Ação Ecológica
              </ButtonActionRegister>
            </div>

            <div
              id="reader"
              ref={readerRef}
              style={{
                display: isScannerVisible ? "block" : "none",
                width: "600px",
                height: "600px",
              }}
            />
            {recycleDone && <PopUp closePopUp={() => setRecycleDone(false)} />}
          </ActionSection>
        </main>

        <aside>
          
          <StreakWidget 
            streakWeeks={currentStreak} 
            multiplier={currentMultiplier} 
          />

          <CardLevelHighlight as="section">
            <h3>Nível da Conta</h3>
            <h2 id="level_and_title">{`Nível ${currentLevel}: ${currentTitle}`}</h2>
            <p className="continue-text">
              Continue assim para desbloquear novas recompensas!
            </p>

            <XpContainer>
              <XpTrack>
              <XpFill
                  id="xp_bar"
                  style={{ width: `${barPercentage}%` }}
              />
              </XpTrack>
              <XpText id="xp_txt">
              {xpString}
              </XpText>
            </XpContainer>
          </CardLevelHighlight>

            <Card as="section" className="share-section">
                <UserIndication></UserIndication>
            </Card>
            <Card><Calendar></Calendar></Card>
        </aside>
      </Dashboard>
    </>
  );
}