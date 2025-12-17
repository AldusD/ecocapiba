import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import enums from "../../../enums/";
import {
  GlobalStyle,
  PageContainer,
  BackButton,
  ProfileCard,
  ProfileHeader,
  Avatar,
  UserInfo,
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
  const [xpNumber, setXpNumber] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [historyItems, setHistoryItems] = useState([]);

  const titleList = Object.values(enums.TITLES);
  const xpLimit = Object.values(enums.XP_LIMITS);
  const xpString = `${xpNumber} / ${xpLimit[currentLevel]} XP`;
  const barPercentage = Math.min(
    100,
    (xpNumber / xpLimit[currentLevel]) * 100
  );

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchXp() {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`${API}/auth/getxp`, {
          headers: {
            Authorization: `Bearer ${token}`,
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
  }, [API]);

  useEffect(() => {
    async function fetchCapibasHistory() {
      try {
        const token = localStorage.getItem("authToken");
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
    if (xpNumber >= xpLimit[currentLevel]) {
      setCurrentLevel((prev) => prev + 1);
    }
  }, [xpNumber, currentLevel, xpLimit]);

  return (
    <>
      <GlobalStyle />
      <PageContainer>
        <BackButton as={Link} to="/home">
          ← Voltar
        </BackButton>
        <ProfileCard>
          <ProfileHeader>
            <Avatar aria-hidden="true">U</Avatar>
            <UserInfo>
              <h2>Usuário Eco</h2>
              <p>Perfil EcoCapiba</p>
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
        </ProfileCard>
      </PageContainer>
    </>
  );
}
