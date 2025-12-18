import React, { useState, useMemo } from "react";
import { useUser } from "../../../../../context/UserContext";
import {
  ShareSectionCard,
  ShareLinkBox,
  SocialButtons,
  WhatsAppButton,
  GenericShareButton
} from "./styles";

export default function UserIndication() {  
  const { userData } = useUser();
  const [copied, setCopied] = useState(false);
  
  // Gerar URL de convite dinamicamente com o código do usuário
  const shareUrl = useMemo(() => {
    const invitationCode = userData?.invitationCode || '';
    const baseUrl = window.location.origin || 'https://eccocapiba.com';
    // Garantir que a URL tenha protocolo
    const fullUrl = baseUrl.startsWith('http') 
      ? `${baseUrl}/convite/${invitationCode}`
      : `https://${baseUrl}/convite/${invitationCode}`;
    return fullUrl;
  }, [userData?.invitationCode]);
  
  // URL sem protocolo para exibição
  const displayUrl = shareUrl.replace(/^https?:\/\//, '');
  
  const shareText = "Venha conhecer a Eccocapiba! Use meu link de convite e ganhe recompensas: ";

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + shareUrl)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleNativeShare = async () => {
    // Verifica se o navegador suporta a Web Share API
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Convite Eccocapiba',
          text: shareText,
          url: shareUrl
        });
      } catch (error) {
        // Usuário cancelou ou erro ocorreu
        if (error.name !== 'AbortError') {
          console.error('Erro ao compartilhar:', error);
          copyToClipboard();
        }
      }
    } else {
      // Fallback: copiar para área de transferência
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${shareText}${shareUrl}`)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => console.error('Erro ao copiar:', err));
  };

  // Se não houver código de convite, mostrar mensagem
  if (!userData?.invitationCode) {
    return (
      <ShareSectionCard>
        <h3>Compartilhe e Ganhe!</h3>
        <p>Carregando seu link de convite...</p>
      </ShareSectionCard>
    );
  }

  return (
    <ShareSectionCard>
      <h3>Compartilhe e Ganhe!</h3>
      <p>Convide seus amigos e ganhe recompensas juntos.</p>
      <ShareLinkBox onClick={copyToClipboard} style={{ cursor: 'pointer' }}>
        {displayUrl}
      </ShareLinkBox>
      {copied && (
        <p style={{ color: '#10b981', fontSize: '14px', marginTop: '8px' }}>
          ✓ Link copiado!
        </p>
      )}
      <SocialButtons>
        <WhatsAppButton 
          onClick={handleWhatsAppShare}
          role="button" 
          aria-label="Compartilhar no WhatsApp"
        >
          <i className="fab fa-whatsapp"></i> WhatsApp
        </WhatsAppButton>
        <GenericShareButton 
          onClick={handleNativeShare}
          role="button" 
          aria-label="Compartilhar em outros aplicativos"
        >
          <i className="fas fa-share-alt"></i> Compartilhar
        </GenericShareButton>
      </SocialButtons>
    </ShareSectionCard>
  );
}