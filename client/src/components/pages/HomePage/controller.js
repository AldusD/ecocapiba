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

const CAPIBAS_PER_RECYCLE = 250;

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

  async function addXpToBackend(amount, multiplier = currentMultiplier, reason = "generic_reward", metadata = null, capibas = 0) {
    try {
      const finalAmount = Math.round(amount * multiplier);
      
      const data = await useHomeServer.postAddXp(finalAmount, capibas, reason, metadata);
      
      if (data) {
        const newXp = data.xp;
        const newCapibas = data.capibas;
        setXpNumber(newXp);
        
        // Atualizar UserContext
        if (setUserData && userData) {
          const newLevel = calculateLevel(newXp);
          setUserData({
            ...userData,
            xp: newXp,
            capibas: newCapibas
          });
          setCurrentLevel(newLevel);
        }
        
        return { xp: newXp, capibas: newCapibas };
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
    
    // Verificar se é um QR code do funcionário (contém /scan/ ou começa com ECOCAP-)
    let qrCode = null;
    if (decodedText.includes('/scan/')) {
      // Extrair código da URL
      const match = decodedText.match(/\/scan\/([^\/\s]+)/);
      if (match && match[1]) {
        qrCode = match[1];
      }
    } else if (decodedText.startsWith('ECOCAP-')) {
      // Código direto
      qrCode = decodedText;
    }
    
    if (qrCode) {
      // Processar QR code do funcionário
      try {
        const API = import.meta.env.VITE_API_URL;
        const token = localStorage.getItem('accessToken');
        
        const response = await fetch(`${API}/recycle/validate-qr`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ code: qrCode })
        });

        if (response.ok) {
          const data = await response.json();
          
          // Buscar dados atualizados do usuário para garantir sincronização
          try {
            const API = import.meta.env.VITE_API_URL;
            const token = localStorage.getItem('accessToken');
            const profileResponse = await fetch(`${API}/auth/profile`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            
            if (profileResponse.ok) {
              const userData = await profileResponse.json();
              if (setUserData) {
                const newLevel = calculateLevel(userData.xp || 0);
                setUserData(userData);
                setCurrentLevel(newLevel);
                setXpNumber(userData.xp || 0);
              }
            }
          } catch (profileError) {
            console.error('Erro ao buscar dados atualizados:', profileError);
            // Fallback: atualizar manualmente
            if (setUserData && userData) {
              const newXp = (userData.xp || 0) + (data.xp || 0);
              const newCapibas = (userData.capibas || 0) + (data.capibas || 0);
              const newLevel = calculateLevel(newXp);
              setUserData({
                ...userData,
                xp: newXp,
                capibas: newCapibas
              });
              setCurrentLevel(newLevel);
              setXpNumber(newXp);
            }
          }
          
          // Atualizar calendário
          if (calendarRef && calendarRef.current && calendarRef.current.refresh) {
            setTimeout(() => {
              calendarRef.current.refresh();
            }, 500);
          }
          
          setRecycleDone(true);
          alert(`Reciclagem registrada! Você ganhou ${data.xp} XP e ${data.capibas} capibas!`);
        } else {
          const errorData = await response.json().catch(() => ({}));
          alert(errorData.error || 'Erro ao processar QR Code');
        }
      } catch (error) {
        console.error('Erro ao processar QR Code:', error);
        alert('Erro ao processar QR Code. Tente novamente.');
      }
      return;
    }
    
    // Processar QR codes antigos (URLs fixas)
    if (REWARD_VALUES[decodedText]) {
      // Registrar reciclagem na API
      const recycleRegistered = await registerRecycle();
      
      // Adicionar XP e capibas com reason específico para reciclagem
      await addXpToBackend(
        REWARD_VALUES[decodedText], 
        currentMultiplier,
        "recycle_reward",
        { description: "Recompensa por reciclagem registrada" },
        CAPIBAS_PER_RECYCLE
      );
      
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