import React, { useState } from 'react';
import { MapPin, Download, CheckCircle, History, Zap, LogOut } from 'lucide-react';
import {
  AppContainer,
  Header,
  Logo,
  LogoutButton,
  MainCard,
  HeaderContent,
  SectionTitle,
  Subtitle,
  FormGrid,
  FormColumn,
  InputGroup,
  InputLabel,
  InputWrapper,
  InputIcon,
  ModernInput,
  ModernTextarea,
  XpGrid,
  XpCard,
  XpValue,
  XpLabel,
  GenerateButton,
  ResultColumn,
  PlaceholderState,
  PlaceholderIcon,
  QrResult,
  QrFrame,
  TicketInfo,
  TicketXp,
  TicketMeta,
  DownloadButton,
  HistoryContainer,
  HistoryList,
  HistoryRow,
  HistoryXp
} from './styles';

export default function EmployeeQRGenerator() {
  const [xpValue, setXpValue] = useState('300');
  const [customXp, setCustomXp] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [currentQRData, setCurrentQRData] = useState(null);
  const [history, setHistory] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const xpOptions = [
    { value: '300', label: 'Pequeno', emoji: '🌱' },
    { value: '1000', label: 'Médio', emoji: '🌿' },
    { value: '2500', label: 'Grande', emoji: '🌳' },
  ];

  const handleGenerateQR = async () => {
    if (!location.trim()) {
      alert('Por favor, informe a localização.');
      return;
    }

    const finalXp = xpValue === 'custom' ? customXp : xpValue;
    if (!finalXp || parseInt(finalXp) <= 0) {
        alert('Valor de XP inválido');
        return;
    }

    setIsGenerating(true);

    const qrData = {
      type: 'recycling',
      xp: parseInt(finalXp),
      location: location,
      timestamp: new Date().toISOString(),
      notes: notes,
      id: `REC-${Date.now().toString().slice(-6)}`
    };

    try {
      await new Promise(resolve => setTimeout(resolve, 600));

      const jsonString = JSON.stringify(qrData);
      const encodedData = encodeURIComponent(jsonString);
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodedData}&color=67A02C&bgcolor=ffffff&margin=10`;

      setQrCodeUrl(qrUrl);
      setCurrentQRData(qrData);
      setHistory(prev => [{...qrData, generatedAt: new Date()}, ...prev]);

    } catch (error) {
      console.error(error);
      alert('Erro ao gerar');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadQR = async () => {
    if (!qrCodeUrl) return;
    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ecocapiba-${currentQRData.id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Erro ao baixar imagem", err);
      window.open(qrCodeUrl, '_blank');
    }
  };

  return (
    <AppContainer>
      <Header>
        <Logo>
          <span>🌱</span>
          <h1>EcoCapiba</h1>
        </Logo>
        <LogoutButton>
          <LogOut size={18} />
          <span>Sair</span>
        </LogoutButton>
      </Header>

      <MainCard>
        <HeaderContent>
          <SectionTitle>
            <Zap size={28} />
            Gerador de Créditos
          </SectionTitle>
          <Subtitle>Preencha os dados abaixo para gerar um QR Code de reciclagem para o usuário.</Subtitle>
        </HeaderContent>

        <FormGrid>
          <FormColumn>
            <InputGroup>
              <InputLabel>Quantidade de XP</InputLabel>
              <XpGrid>
                {xpOptions.map(opt => (
                  <XpCard
                    key={opt.value}
                    className={xpValue === opt.value ? 'active' : ''}
                    onClick={() => setXpValue(opt.value)}
                  >
                    <XpValue>{opt.value}</XpValue>
                    <XpLabel>{opt.label}</XpLabel>
                  </XpCard>
                ))}
                
                <XpCard 
                  className={xpValue === 'custom' ? 'active' : ''}
                  onClick={() => setXpValue('custom')}
                >
                  <XpValue>...</XpValue>
                  <XpLabel>Outro</XpLabel>
                </XpCard>
              </XpGrid>

              {xpValue === 'custom' && (
                <InputWrapper style={{ animation: 'fadeIn 0.3s' }}>
                  <ModernInput 
                    autoFocus
                    type="number" 
                    placeholder="Digite o valor exato"
                    style={{ paddingLeft: '16px' }}
                    value={customXp}
                    onChange={(e) => setCustomXp(e.target.value)}
                  />
                </InputWrapper>
              )}
            </InputGroup>

            <InputGroup>
              <InputLabel>Localização da Ecoestação</InputLabel>
              <InputWrapper>
                <InputIcon>
                  <MapPin size={20} />
                </InputIcon>
                <ModernInput 
                  type="text" 
                  placeholder="Ex: Praça de Boa Viagem"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </InputWrapper>
            </InputGroup>

            <InputGroup>
              <InputLabel>Observações (Opcional)</InputLabel>
              <ModernTextarea 
                placeholder="Detalhes sobre o material reciclado..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </InputGroup>

            <GenerateButton 
              onClick={handleGenerateQR} 
              disabled={isGenerating}
            >
              {isGenerating ? 'Gerando...' : (
                <>
                  Gerar QR Code
                  <CheckCircle size={20} />
                </>
              )}
            </GenerateButton>
          </FormColumn>

          <ResultColumn>
            {!qrCodeUrl ? (
              <PlaceholderState>
                <PlaceholderIcon>
                  <Zap size={40} />
                </PlaceholderIcon>
                <p>O QR Code gerado aparecerá aqui</p>
              </PlaceholderState>
            ) : (
              <QrResult>
                <QrFrame>
                  <img src={qrCodeUrl} alt="QR Code" />
                </QrFrame>
                
                <TicketInfo>
                  <h3>{currentQRData.location}</h3>
                  <TicketXp>+{currentQRData.xp} XP</TicketXp>
                  <TicketMeta>
                    <span>#{currentQRData.id}</span> • <span>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </TicketMeta>
                </TicketInfo>

                <DownloadButton onClick={handleDownloadQR}>
                  <Download size={18} />
                  Baixar Imagem
                </DownloadButton>
              </QrResult>
            )}
          </ResultColumn>
        </FormGrid>

        {history.length > 0 && (
          <HistoryContainer>
            <SectionTitle style={{ fontSize: '1.2rem', color: '#333' }}>
              <History size={24} style={{ color: '#666' }} />
              Últimos Envios
            </SectionTitle>
            <HistoryList>
              {history.map((item, i) => (
                <HistoryRow key={i}>
                  <div style={{ fontFamily: 'monospace', color: '#64748b' }}>
                    {new Date(item.generatedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: '#333' }}>{item.location}</strong>
                    {item.notes && <span style={{ fontSize: '0.85rem', color: '#888' }}>{item.notes}</span>}
                  </div>
                  <HistoryXp>
                    +{item.xp} XP
                  </HistoryXp>
                </HistoryRow>
              ))}
            </HistoryList>
          </HistoryContainer>
        )}
      </MainCard>
    </AppContainer>
  );
}