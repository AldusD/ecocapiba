import { Html5QrcodeScanner } from "html5-qrcode";
import useHomeServer from "../../../hooks/api/useHomeServer.js";
import { calculateLevel } from "../../../utils/levelUtils.js";

const RECYCLE_URLS = {
  RECICLAGEM: "https://pt.wikipedia.org/wiki/Reciclagem",
  RECIFE: "https://pt.wikipedia.org/wiki/Recife",
  CAPIVARA: "https://pt.wikipedia.org/wiki/Capivara"
};

const REWARD_VALUES = {
  [RECYCLE_URLS.RECICLAGEM]: 300,
  [RECYCLE_URLS.RECIFE]: 1000,
  [RECYCLE_URLS.CAPIVARA]: 2500
};

export default function controller({
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
  calendarRef
}) {

    // --- API CALLS ---
  async function fetchUserData() {
    try {
      const [streakData, xpData] = await Promise.all([
        useHomeServer.getStreak(),
        useHomeServer.getXp()
      ]);

      if (streakData) {
        setCurrentStreak(streakData.streakWeeks);
        setCurrentMultiplier(streakData.multiplier);
      }

      if (xpData) {
        setXpNumber(xpData.xp);
      }

    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error);
    }
  }

  async function addXpToBackend(amount, multiplier = currentMultiplier) {
    try {
      const finalAmount = Math.round(amount * multiplier);
      
      const data = await useHomeServer.postAddXp(finalAmount);
      
      if (data) {
        const newXp = data.xp;
        setXpNumber(newXp);
        
        // Atualizar UserContext
        if (setUserData && userData) {
          const newLevel = calculateLevel(newXp);
          setUserData({
            ...userData,
            xp: newXp
          });
          setCurrentLevel(newLevel);
        }
        
        return newXp;
      }
    } catch (error) {
      console.error("Erro ao adicionar Xp:", error);
    }
  }

  // --- LOGIC & CALCULATIONS ---

  function checkLevelUp() {
    if (xpNumber !== undefined) {
      const calculatedLevel = calculateLevel(xpNumber);
      if (calculatedLevel !== currentLevel) {
        setCurrentLevel(calculatedLevel);
      }
    }
  }

  // --- SCANNER LOGIC ---

  async function registerRecycle() {
    try {
      if (!userData || !userData.id) {
        console.error('Dados do usuário não disponíveis para registrar reciclagem');
        return false;
      }

      const API = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API}/recycle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userData.id,
          doneDate: new Date().toISOString()
        })
      });

      if (response.ok) {
        return true;
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Erro ao registrar reciclagem:', response.status, errorData);
      }
    } catch (error) {
      console.error('Erro ao registrar reciclagem:', error);
    }
    return false;
  }

  async function handleScanSuccess(decodedText, decodedResult) {
    console.log(`Code matched = ${decodedText}`, decodedResult);
    
    if (REWARD_VALUES[decodedText]) {
      // Registrar reciclagem na API
      const recycleRegistered = await registerRecycle();
      
      // Adicionar XP
      await addXpToBackend(REWARD_VALUES[decodedText], currentMultiplier);
      
      // Atualizar calendário se disponível e reciclagem foi registrada
      if (recycleRegistered && calendarRef && calendarRef.current && calendarRef.current.refresh) {
        setTimeout(() => {
          calendarRef.current.refresh();
        }, 500); // Pequeno delay para garantir que a API processou
      }
      
      setRecycleDone(true);
    }
  }

  function handleScanFailure(error) {
  }

  function initializeScanner() {
    if (!isScannerVisible || !readerRef.current) return;

    try {
      scannerRef.current = new Html5QrcodeScanner(
        readerRef.current.id,
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );
      scannerRef.current.render(handleScanSuccess, handleScanFailure);
    } catch (e) {
      console.error("Erro ao iniciar scanner:", e);
    }
  }

  function cleanupScanner() {
    if (scannerRef.current) {
      try {
        scannerRef.current.clear();
      } catch (e) {
        console.error("Erro ao limpar scanner", e);
      }
      scannerRef.current = null;
    }
  }

  function toggleScanner() {
    setIsScannerVisible(prev => !prev);
  }

  return {
    fetchUserData,
    addXpToBackend,
    checkLevelUp,
    initializeScanner,
    cleanupScanner,
    toggleScanner
  };
}