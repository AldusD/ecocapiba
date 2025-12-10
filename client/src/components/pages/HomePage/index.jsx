/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import Calendar from "./components/Calendar"
import UserIndication from "./components/UserIndication";
import Quiz from "./components/Quiz";
import PopUp from "./components/PopUp";
import enums from "../../../enums/";
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
  const [xpNumber, setXpNumber] = useState(0); // to be changed to userdata
  const [currentLevel, setCurrentLevel] = useState(0); // to be changed to userdata
  const [currentStreak, setCurrentStreak] = useState(3); // to be changed to userdata
  const [isScannerVisible, setIsScannerVisible] = useState(false);
  const [quizMode, setQuizMode] = useState(false);
  const [recycleDone, setRecycleDone] = useState(false);
  const readerRef = useRef(null);
  const scannerRef = useRef(null);
  const titleList = Object.values(enums.TITLES);
  const xpLimit = Object.values(enums.XP_LIMITS);
  const xpString = `${xpNumber} / ${xpLimit[currentLevel]} XP`;
  const barPercentage = Math.min(100, (xpNumber / xpLimit[currentLevel]) * 100);

  const addXpToBackend = async (amount) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:8080/auth/addxp", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      if (response.ok) {
        const data = await response.json();
        setXpNumber(data.xp);
        return data.xp;
      } else {
        console.error("Falha ao adicioanr Xp:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao adicionar Xp:", error);
    }
  };
  
  useEffect(() => {
    async function fetchXp() {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch("http://localhost:8080/auth/getxp", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setXpNumber(data.xp);
        } else {
          console.error("Falha ao buscar Xp:", response.statusText);
        }
      } catch (error) {
        console.error("Erro ao buscar Xp:", error);
      }
    }
    fetchXp();
  }, []);

  useEffect(() => {
    if (xpNumber >= xpLimit[currentLevel]) {
      setCurrentLevel((prev) => prev + 1);
    }
  }, [xpNumber, currentLevel, xpLimit]);

  useEffect(() => {
    if (!isScannerVisible) return;

    const onScanSuccess = (decodedText, decodedResult) => {
      // handle the scanned code
      console.log(`Code matched = ${decodedText}`, decodedResult);
      if (decodedText === "https://pt.wikipedia.org/wiki/Reciclagem") {
        addXpToBackend(300);
        setRecycleDone(true);
      } else if (decodedText === "https://pt.wikipedia.org/wiki/Recife") {
        addXpToBackend(1000);
        setRecycleDone(true);
      } else if (decodedText === "https://pt.wikipedia.org/wiki/Capivara") {
        addXpToBackend(2500);
        setRecycleDone(true);
      }
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
        try {
          scannerRef.current.clear();
        } catch (e) {
          /* ignore */
        }
        scannerRef.current = null;
      }
    };
  }, [isScannerVisible]);

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
                <Button className='btn-primary' onClick={() => {setQuizMode(true)}} >Começar</Button>
                { quizMode ? <Quiz closeQuiz={() => setQuizMode(false)} onQuizComplete={addXpToBackend} /> : <></> }
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
                Leve seus recicláveis a um centro de coleta e registre para ganhar
                XP.
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
            { recycleDone ? <PopUp closePopUp={() => setRecycleDone(false)} /> : <></> }
            </ActionSection>
        </main>

        <aside>
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

            <Card as="section" className="share-section">
                <UserIndication></UserIndication>
            </Card>
            <Card><Calendar></Calendar></Card>
        </aside>
        </Dashboard>
    </>
  );
}