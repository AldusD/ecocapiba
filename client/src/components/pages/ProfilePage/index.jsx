import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import enums from "../../../enums/";
import { useUser } from "../../../context/UserContext";
import { calculateLevel } from "../../../utils/levelUtils";
import { useLogout } from "../../../hooks/api/useUserServer";
import {
  GlobalStyle,
  PageContainer,
  BackButton,
  ProfileCard,
  ProfileHeader,
  Avatar,
  UserInfo,
  LogoutButton,
} from "./styles";
import {
  CardLevelHighlight,
  XpContainer,
  XpTrack,
  XpFill,
  XpText,
} from "../HomePage/styles";
import CapibasHistory from "./components/CapibasHistory";

export default function ProfilePage() {
  const { userData } = useUser();
  const navigate = useNavigate();
  const logoutMutation = useLogout();
  const [xpNumber, setXpNumber] = useState(userData?.xp || 0);
  const [currentLevel, setCurrentLevel] = useState(calculateLevel(userData?.xp || 0));
  const [historyItems, setHistoryItems] = useState([]);

  const titleList = Object.values(enums.TITLES);
  const xpLimit = Object.values(enums.XP_LIMITS);
  const xpString = `${xpNumber} / ${xpLimit[currentLevel]} XP`;
  const barPercentage = Math.min(
    100,
    (xpNumber / xpLimit[currentLevel]) * 100
  );

  const API = import.meta.env.VITE_API_URL;

  // Atualizar dados quando userData mudar
  useEffect(() => {
    if (userData) {
      const userXp = userData.xp || 0;
      setXpNumber(userXp);
      setCurrentLevel(calculateLevel(userXp));
    }
  }, [userData]);

  useEffect(() => {
    async function fetchXp() {
      // Se já temos dados do contexto, não precisa buscar
      if (userData?.xp !== undefined) {
        return;
      }

      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        const response = await fetch(`${API}/auth/getxp`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setXpNumber(data.xp);
          setCurrentLevel(calculateLevel(data.xp));
        } else {
          console.error("Falha ao buscar Xp:", response.statusText);
        }
      } catch (error) {
        console.error("Erro ao buscar Xp:", error);
      }
    }
    fetchXp();
  }, [API, userData]);

  useEffect(() => {
    async function fetchCapibasHistory() {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        const response = await fetch(`${API}/auth/capibas-history?limit=20`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.error("Falha ao buscar histórico:", response.statusText);
          return;
        }

        const data = await response.json();
        const items = (data.history ?? []).map((entry) => {
          const createdAt = entry.createdAt ? new Date(entry.createdAt) : null;
          const date = createdAt
            ? createdAt.toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "";

          return {
            id: entry.id,
            title: entry.title ?? "Recompensa",
            date,
            amount: entry.capibas ?? 0,
          };
        });

        setHistoryItems(items);
      } catch (error) {
        console.error("Erro ao buscar histórico:", error);
      }
    }

    fetchCapibasHistory();
  }, [API]);

  useEffect(() => {
    if (xpNumber !== undefined) {
      const calculatedLevel = calculateLevel(xpNumber);
      if (calculatedLevel !== currentLevel) {
        setCurrentLevel(calculatedLevel);
      }
    }
  }, [xpNumber, currentLevel]);

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        navigate('/login');
      },
      onError: (error) => {
        console.error('Erro ao fazer logout:', error);
        // Mesmo com erro, limpar dados locais e redirecionar
        navigate('/login');
      }
    });
  };

  return (
    <>
      <GlobalStyle />
      <PageContainer>
        <BackButton as={Link} to="/home">
          ← Voltar
        </BackButton>
        <ProfileCard>
          <ProfileHeader>
            <Avatar aria-hidden="true">
              {userData?.name ? userData.name.charAt(0).toUpperCase() : 'U'}
            </Avatar>
            <UserInfo>
              <h2>{userData?.name || 'Usuário Eco'}</h2>
              <p>{userData?.email || 'Perfil EcoCapiba'}</p>
            </UserInfo>
          </ProfileHeader>

          <CardLevelHighlight as="section">
            <h3>Nível da Conta</h3>
            <h2 id="level_and_title">{`Nível ${currentLevel}: ${titleList[currentLevel]}`}</h2>
            <p className="continue-text">
              Continue assim para desbloquear novas recompensas!
            </p>

            <XpContainer>
              <XpTrack>
            <XpFill id="xp_bar" style={{ width: `${barPercentage}%` }} />
              </XpTrack>
              <XpText id="xp_txt">{xpString}</XpText>
            </XpContainer>
          </CardLevelHighlight>

          <CapibasHistory items={historyItems} />

          <LogoutButton 
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
          >
            {logoutMutation.isPending ? 'Saindo...' : 'Sair da Conta'}
          </LogoutButton>
        </ProfileCard>
      </PageContainer>
    </>
  );
}
