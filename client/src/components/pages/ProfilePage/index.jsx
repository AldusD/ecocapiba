import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  GlobalStyle,
  PageContainer,
  BackButton,
  ProfileCard,
  ProfileHeader,
  Avatar,
  UserInfo,
} from "./styles";
import Calendar from "../HomePage/components/Calendar";
import UserIndication from "../HomePage/components/UserIndication";
import CapibasHistory from "./components/CapibasHistory";

export default function ProfilePage() {
  const [historyItems, setHistoryItems] = useState([]);

  const API = import.meta.env.VITE_API_URL;

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

          <div style={{display: "flex", justifyContent: 'center', alignItems: 'center'}}>
            <Calendar/>
          </div>
          
          <UserIndication/>

          <CapibasHistory items={historyItems} />
        </ProfileCard>
      </PageContainer>
    </>
  );
}
