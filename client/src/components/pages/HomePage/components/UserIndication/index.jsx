import React from "react";
import {
    ShareSectionCard, ShareLinkBox,
    SocialButtons,
    WhatsAppButton, InstagramButton
} from "./styles";

const shareToInstagram = async (inviteCode, inviteLink) => {
  const message = `Olá! Baixe o app usando meu código: ${inviteCode}\n${inviteLink}`;
  
  try {
    // Copiar para área de transferência
    await navigator.clipboard.writeText(message);
    
    // Abrir Instagram Direct
    window.open('instagram://direct', '_blank');
    
    // Mostrar feedback ao usuário
    alert('Texto copiado! Cole a mensagem no Instagram.');
  } catch (error) {
    // Fallback
    alert(`Copie este convite:\n\n${message}`);
  }
};

export default function UserIndication() {
    return (
        <ShareSectionCard>
            <h3>Compartilhe e Ganhe!</h3>
            <p>Convide seus amigos e ganhe recompensas juntos.</p>
            
            <ShareLinkBox>
                eccocapiba.com/convite/1a2b3c
            </ShareLinkBox>

            <SocialButtons>
                <WhatsAppButton href="https://wa.me/?text=oioi" role="button" aria-label="Compartilhar no WhatsApp">
                    <i className="fab fa-whatsapp"></i> WhatsApp
                </WhatsAppButton>
                
                <InstagramButton onClick={shareToInstagram} href="#" role="button" aria-label="Compartilhar no Instagram">
                    <i className="fab fa-instagram"></i> Instagram
                </InstagramButton>
            </SocialButtons>
        </ShareSectionCard>
    );
}