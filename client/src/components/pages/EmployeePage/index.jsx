import React, { useState, useEffect } from 'react';
import { MapPin, Download, CheckCircle, History, Zap, LogOut, User } from 'lucide-react';
import EmployeeDataLoader from '../../EmployeeDataLoader';
import { useCreateQRCode, useQRHistory } from '../../../hooks/api/useEmployeeServer';
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
  const createQRMutation = useCreateQRCode();
  const historyMutation = useQRHistory();
  const [employeeData, setEmployeeData] = useState(null);

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

    try {
      const result = await createQRMutation.mutateAsync({
        xp: parseInt(finalXp),
        capibas: 250,
        location: location.trim(),
        notes: notes.trim() || undefined,
      });

      setQrCodeUrl(result.qrUrl);
      setCurrentQRData({
        code: result.code,
        xp: result.xp,
        capibas: result.capibas,
        location: result.location,
        notes: result.notes,
        createdAt: result.createdAt,
      });

      // Atualizar histórico
      loadHistory();

    } catch (error) {
      console.error(error);
      alert(error.message || 'Erro ao gerar QR Code');
    }
  };

  const loadHistory = async () => {
    try {
      const result = await historyMutation.mutateAsync();
      if (result.history) {
        setHistory(result.history);
      }
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleDownloadQR = async () => {
    if (!qrCodeUrl) return;
    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ecocapiba-${currentQRData.code}.png`;
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
      <EmployeeDataLoader onDataLoaded={setEmployeeData} />
      <Header>
        <Logo>
          <span>🌱</span>
          <h1>EcoCapiba</h1>
        </Logo>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {employeeData ? (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              padding: '10px 18px',
              backgroundColor: 'rgba(103, 160, 44, 0.15)',
              borderRadius: '10px',
              color: '#67A02C',
              border: '1px solid rgba(103, 160, 44, 0.3)'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#67A02C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.1rem'
              }}>
                {employeeData.name ? employeeData.name.charAt(0).toUpperCase() : 'E'}
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '2px' }}>
                  {employeeData.name || 'Funcionário'}
                </div>
                <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                  {employeeData.email || ''}
                </div>
                <div style={{ fontSize: '0.7rem', opacity: 0.7, marginTop: '2px' }}>
                  ID: {employeeData.employeeId || 'N/A'}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              padding: '8px 12px',
              color: '#888',
              fontSize: '0.85rem'
            }}>
              <User size={16} />
              <span>Carregando...</span>
            </div>
          )}
          <LogoutButton
            onClick={() => {
              localStorage.removeItem('employeeToken');
              localStorage.removeItem('employeeAccessToken');
              window.location.href = '/employee/login';
            }}
          >
            <LogOut size={18} />
          </LogoutButton>
        </div>
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
              disabled={createQRMutation.isPending}
            >
              {createQRMutation.isPending ? 'Gerando...' : (
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
                    <span>#{currentQRData.code}</span> • <span>{new Date(currentQRData.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
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
              {history.map((item) => (
                <HistoryRow key={item.id || item.code}>
                  <div style={{ fontFamily: 'monospace', color: '#64748b' }}>
                    {new Date(item.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: '#333' }}>{item.location || 'Sem localização'}</strong>
                    {item.notes && <span style={{ fontSize: '0.85rem', color: '#888' }}>{item.notes}</span>}
                    {item.used && (
                      <span style={{ fontSize: '0.75rem', color: '#10b981', display: 'block', marginTop: '2px' }}>
                        ✓ Utilizado
                      </span>
                    )}
                  </div>
                  <HistoryXp>
                    +{item.xp} XP
                    {item.used && <span style={{ fontSize: '0.7rem', display: 'block', opacity: 0.7 }}>Usado</span>}
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