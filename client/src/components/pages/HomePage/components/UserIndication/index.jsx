import React, { useState } from "react";
import {
  ShareSectionCard,
  ShareLinkBox,
  SocialButtons,
  WhatsAppButton,
  GenericShareButton
} from "./styles";

export default function UserIndication() {  
  const [copied, setCopied] = useState(false);
  const shareUrl = "eccocapiba.com/convite/1a2b3c";
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
          url: `https://${shareUrl}`
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
    navigator.clipboard.writeText(`${shareText}https://${shareUrl}`)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => console.error('Erro ao copiar:', err));
  };

  return (
    <ShareSectionCard>
      <h3>Compartilhe e Ganhe!</h3>
      <p>Convide seus amigos e ganhe recompensas juntos.</p>
      <ShareLinkBox onClick={copyToClipboard} style={{ cursor: 'pointer' }}>
        {shareUrl}
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