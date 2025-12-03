/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect, useCallback } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import Calendar from "./components/Calendar";
import { StreakService } from "../../../services/StreakService";
import StreakWidget from "./components/Streak/index.jsx"; 

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
  // --- CONFIGURAÇÃO ---
  const USER_ID = 1; // ID fixo para teste (depois virá do Login)

  const [xpNumber, setXpNumber] = useState(100); 
  const [xpLimit, setXpLimit] = useState(2000);
  
  // Estados de recompensas já coletadas
  const [xp300Claimed, setXp300Claimed] = useState(false);
  const [xp1000Claimed, setXp1000Claimed] = useState(false);
  const [xp2500Claimed, setXp2500Claimed] = useState(false);
  
  const [currentLevel, setCurrentLevel] = useState(0); 
  const [currentTitle, setCurrentTitle] = useState("Cidadão");
  
  // --- ESTADOS DA API DE STREAK ---
  const [currentStreak, setCurrentStreak] = useState(0); 
  const [currentMultiplier, setCurrentMultiplier] = useState(1.0);
  const [loadingStreak, setLoadingStreak] = useState(true);

  const [isScannerVisible, setIsScannerVisible] = useState(false);
  const readerRef = useRef(null);
  const scannerRef = useRef(null);
  
  const xpString = `${xpNumber} / ${xpLimit} XP`;
  const barPercentage = Math.min(100, (xpNumber / xpLimit) * 100);

  // 1. Busca dados do Backend usando o Service
  useEffect(() => {
    const fetchStreakData = async () => {
      try {
        // O componente chama o Service. Ele não sabe se vem do localhost ou da lua.
        const data = await StreakService.getMultiplier(USER_ID);
        
        setCurrentStreak(data.streakWeeks);   
        setCurrentMultiplier(data.multiplier); 
      } catch (error) {
        // O erro já foi logado no service, aqui você pode mostrar um toast se quiser
      } finally {
        setLoadingStreak(false);
      }
    };

    fetchStreakData();
  }, []);

  // 2. Função de ajuste de XP (com useCallback para evitar loop no useEffect)
  const adjust_xp = useCallback((baseXp) => {
    const bonusXp = Math.round(baseXp * currentMultiplier);
    setXpNumber((prev) => prev + bonusXp);
    
    // Log para você conferir se o multiplicador funcionou
    console.log(`XP Ganho: ${bonusXp} (Base: ${baseXp} * Multiplicador: ${currentMultiplier})`);
  }, [currentMultiplier]);

  // Lógica de Level Up
  useEffect(() => {
    if (xpNumber >= xpLimit) {
      setXpNumber((prev) => prev - xpLimit);
      setXpLimit((prev) => prev * 2);
      setCurrentLevel((prev) => prev + 1);
      setCurrentTitle("Cidadão Consciente");
    }
  }, [xpNumber, xpLimit]);

  // Lógica do Scanner QR Code
  useEffect(() => {
    if (!isScannerVisible) return;

    const onScanSuccess = (decodedText, decodedResult) => {
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
    };

    const onScanFailure = (error) => {
      // Ignora erros de leitura contínua
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
  }, [isScannerVisible, xp300Claimed, xp1000Claimed, xp2500Claimed, adjust_xp]); // adjust_xp incluído nas dependências

  const showScanner = () => setIsScannerVisible(true);

  return (
    <>
      <GlobalStyle />
      <Dashboard>
        <header>
          <div className="logo">
            <h1>Ecocapiba</h1>
          </div>
          <div className="status-ofensiva">
            <span className="dias-ofensiva"> 
              <div className="medidor-fogo">
                {currentStreak >= 1 && <i className="fa-solid fa-fire status-fire-icon"></i>}
              </div>
              {currentStreak} semana{currentStreak !== 1 ? 's' : ''} de ofensiva
            </span>
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
              <Button className="btn-primary">Começar</Button>
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
                Leve seus recicláveis a um centro de coleta e registre para ganhar
                XP 
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
                width: "100%",
                maxWidth: "600px",
                height: "auto",
              }}
            />
          </ActionSection>
        </main>

        <aside>
          {/* 3. Inserção do Widget de Streak */}
          <StreakWidget 
            streakWeeks={currentStreak} 
            multiplier={currentMultiplier} 
            loading={loadingStreak} 
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
            <h3>Compartilhe e Ganhe!</h3>
            <p>Convide seus amigos e ganhe recompensas juntos.</p>
            <ShareLinkBox>eccocapiba.com/convite/1a2b3c</ShareLinkBox>

            <SocialButtons>
              <ButtonSocial href="#" className="btn-whatsapp" role="button">
                <i className="fab fa-whatsapp"></i> WhatsApp
              </ButtonSocial>
              <ButtonSocial href="#" className="btn-instagram" role="button">
                <i className="fab fa-instagram"></i> Instagram
              </ButtonSocial>
            </SocialButtons>
          </Card>
          <Card><Calendar></Calendar></Card>
        </aside>
      </Dashboard>
    </>
  );
}