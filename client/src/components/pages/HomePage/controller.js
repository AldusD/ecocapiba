import { Html5QrcodeScanner } from "html5-qrcode";
import useHomeServer from "../../../hooks/api/useHomeServer.js";

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
  onRecycleRegistered
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
        setXpNumber(data.xp);
        return data.xp;
      }
    } catch (error) {
      console.error("Erro ao adicionar Xp:", error);
    }
  }

  async function registerRecycleToBackend(xpAmount) {
    try {
      const token = localStorage.getItem("authToken");
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/recycle`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          doneDate: today.toISOString(),
          xpAmount: xpAmount
        })
      });

      if (response.ok) {
        const data = await response.json();
        
        // Refresh user data (streak and XP) after registering recycle
        await fetchUserData();
        
        if (onRecycleRegistered) {
          onRecycleRegistered();
        }
        return data;
      }
    } catch (error) {
      console.error("Erro ao registrar reciclagem:", error);
    }
  }

  // --- LOGIC & CALCULATIONS ---

  function checkLevelUp() {
    if (xpLimit && xpNumber >= xpLimit[currentLevel]) {
      setCurrentLevel((prev) => prev + 1);
    }
  }

  // --- SCANNER LOGIC ---

  function handleScanSuccess(decodedText, decodedResult) {
    console.log(`Code matched = ${decodedText}`, decodedResult);
    
    if (REWARD_VALUES[decodedText]) {
      const xpAmount = REWARD_VALUES[decodedText];
      addXpToBackend(xpAmount, currentMultiplier);
      registerRecycleToBackend(Math.round(xpAmount * currentMultiplier));
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
    registerRecycleToBackend,
    checkLevelUp,
    initializeScanner,
    cleanupScanner,
    toggleScanner
  };
}