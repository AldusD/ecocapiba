/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import Calendar from "./components/Calendar";
import UserIndication from "./components/UserIndication";
import Quiz from "./components/Quiz";
import PopUp from "./components/PopUp";
import enums from "../../../enums/";
import StreakWidget from "./components/Streak/index.jsx";
import useHomePageController from "./controller"; // Importando o controller
import { useUser } from "../../../context/UserContext";
import { calculateLevel } from "../../../utils/levelUtils";

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
  GlobalStyle,
  Logo
} from "./styles";
import { Link } from "react-router-dom";
import { CAPIBAS_PER_QUIZ } from "./components/Quiz/controller";

const API = import.meta.env.VITE_API_URL;

export default function HomePage() {
  const { userData } = useUser();
  
  // State Definitions
  const [xpNumber, setXpNumber] = useState(userData?.xp || 0);
  const [currentLevel, setCurrentLevel] = useState(calculateLevel(userData?.xp || 0));
  const [currentStreak, setCurrentStreak] = useState(0);
  const [currentMultiplier, setCurrentMultiplier] = useState(1.0);
  const [isScannerVisible, setIsScannerVisible] = useState(false);
  const [quizMode, setQuizMode] = useState(false);
  const [recycleDone, setRecycleDone] = useState(false);
  const [refreshCalendar, setRefreshCalendar] = useState(false);

  // Refs
  const readerRef = useRef(null);
  const scannerRef = useRef(null);
  const calendarRef = useRef(null);

  // Constants
  const titleList = Object.values(enums.TITLES);
  const xpLimit = Object.values(enums.XP_LIMITS);
  
  const { setUserData } = useUser();
  
  const handleRecycleRegistered = () => {
    setRefreshCalendar(prev => !prev);
  };
  
  // Initialize Controller
  const homeController = useHomePageController({
    setXpNumber, xpNumber,
    setCurrentLevel, currentLevel,
    setCurrentStreak,
    setCurrentMultiplier, currentMultiplier,
    setIsScannerVisible, isScannerVisible,
    setRecycleDone,
    scannerRef, readerRef,
    xpLimit,
    setUserData,
    userData,
    calendarRef,
    onRecycleRegistered: handleRecycleRegistered
  });


  const xpString = `${xpNumber} / ${xpLimit[currentLevel]} XP`;
  const barPercentage = Math.min(100, (xpNumber / xpLimit[currentLevel]) * 100);

  // Atualizar dados quando userData mudar
  useEffect(() => {
    if (userData) {
      const userXp = userData.xp || 0;
      setXpNumber(userXp);
      setCurrentLevel(calculateLevel(userXp));
    }
  }, [userData]);

  useEffect(() => {
    homeController.fetchUserData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    homeController.checkLevelUp();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xpNumber, currentLevel]);

  useEffect(() => {
    if (isScannerVisible) {
        homeController.initializeScanner();
    }
    
    return () => {
        homeController.cleanupScanner();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScannerVisible]); 

  return (
    <>
      <GlobalStyle />
      <Dashboard>
        <header>
          <Logo/>
          <Link to="/profile" className="user-avatar" aria-label="Perfil do usuário">
            {userData?.name ? userData.name.charAt(0).toUpperCase() : 'U'}
          </Link>
        </header>

        <main>
          <QuizSection as="section">
            <h2>Quizzes Ecológicos</h2>

            <QuizItem className="quiz-active">
              <div className="quiz-info">
                <p>Seu próximo desafio:</p>
                <h3>O Ciclo do Plástico</h3>
              </div>
              <Button className='btn-primary' onClick={() => setQuizMode(true)}>Começar</Button>
              
              {quizMode && (
                <Quiz 
                  closeQuiz={() => setQuizMode(false)} 
                  onQuizComplete={(amount) => {
                    homeController.addXpToBackend(amount, currentMultiplier, "quiz_reward", { description: "Recompensa por completar quiz" }, CAPIBAS_PER_QUIZ);
                  }} 
                />
              )}
            </QuizItem>

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
              <ButtonActionRegister onClick={homeController.toggleScanner}>
                {isScannerVisible ? "Fechar Câmera" : "Registrar Ação Ecológica"}
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
            <h2 id="level_and_title">{`Nível ${currentLevel}: ${titleList[currentLevel]}`}</h2>
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

          <Card as="section" className="share-section" style={{ display: 'none' }}>
            <UserIndication />
          </Card>
          <Card style={{ display: 'none' }} key={refreshCalendar}>
            <Calendar />
          </Card>
        </aside>
      </Dashboard>
    </>
  );
}
