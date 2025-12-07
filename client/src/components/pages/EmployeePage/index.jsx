import React, { useState } from 'react';
import QRCode from 'qrcode';

import {
    Container, Header,
    MainCard, Title,
    FormSection, FormGroup,
    Label, Select,
    Input, TextArea,
    Button, QRDisplay,
    QRInfo, DownloadButton,
    HistorySection, HistoryItem,
    HistoryList
} from './styles';

export default function EmployeeQRGenerator() {
  const [xpValue, setXpValue] = useState('300');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [currentQRData, setCurrentQRData] = useState(null);
  const [history, setHistory] = useState([]);

  const xpOptions = [
    { value: '300', label: '300 XP - Pequena quantidade' },
    { value: '1000', label: '1000 XP - Média quantidade' },
    { value: '2500', label: '2500 XP - Grande quantidade' },
    { value: 'custom', label: 'Personalizado' }
  ];

  const handleGenerateQR = async () => {
    if (!location.trim()) {
      alert('Por favor, insira a localização da ecoestação');
      return;
    }

    const qrData = {
      type: 'recycling',
      xp: parseInt(xpValue),
      location: location,
      timestamp: new Date().toISOString(),
      notes: notes,
      id: `REC-${Date.now()}`
    };

    try {
      const qrUrl = await QRCode.toDataURL(JSON.stringify(qrData), {
        width: 300,
        margin: 2,
        color: {
          dark: '#67A02C',
          light: '#FFFFFF'
        }
      });

      setQrCodeUrl(qrUrl);
      setCurrentQRData(qrData);

      // Add to history
      setHistory(prev => [{
        ...qrData,
        generatedAt: new Date()
      }, ...prev].slice(0, 10));

    } catch (error) {
      console.error('Erro ao gerar QR Code:', error);
      alert('Erro ao gerar QR Code');
    }
  };

  const handleDownloadQR = () => {
    if (!qrCodeUrl) return;

    const link = document.createElement('a');
    link.download = `qrcode-${currentQRData.xp}xp-${Date.now()}.png`;
    link.href = qrCodeUrl;
    link.click();
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Container>
      <Header>
        <h1>🌱 EcoCapiba - Painel do Funcionário</h1>
        <button className="logout-btn">Sair</button>
      </Header>

      <MainCard>
        <Title>Gerador de QR Code de Reciclagem</Title>

        <FormSection>
          <FormGroup>
            <Label htmlFor="xp-select">Valor de XP *</Label>
            <Select 
              id="xp-select"
              value={xpValue} 
              onChange={(e) => setXpValue(e.target.value)}
            >
              {xpOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>

            {xpValue === 'custom' && (
              <Input
                type="number"
                placeholder="Digite o valor de XP"
                onChange={(e) => setXpValue(e.target.value)}
                min="1"
                max="10000"
              />
            )}

            <Label htmlFor="location">Localização da Ecoestação *</Label>
            <Input
              id="location"
              type="text"
              placeholder="Ex: Ecoestação Boa Viagem"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="notes">Observações (opcional)</Label>
            <TextArea
              id="notes"
              placeholder="Informações adicionais sobre esta coleta..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </FormGroup>
        </FormSection>

        <Button onClick={handleGenerateQR}>
          🎯 Gerar QR Code
        </Button>

        {qrCodeUrl && currentQRData && (
          <QRDisplay>
            <img src={qrCodeUrl} alt="QR Code de Reciclagem" />
            <QRInfo>
              <h3>QR Code Gerado com Sucesso!</h3>
              <p className="xp-value">{currentQRData.xp} XP</p>
              <p><strong>Local:</strong> {currentQRData.location}</p>
              <p><strong>ID:</strong> {currentQRData.id}</p>
              {currentQRData.notes && (
                <p><strong>Obs:</strong> {currentQRData.notes}</p>
              )}
            </QRInfo>
            <DownloadButton onClick={handleDownloadQR}>
              📥 Baixar QR Code
            </DownloadButton>
          </QRDisplay>
        )}

        {history.length > 0 && (
          <HistorySection>
            <h3>📋 Histórico de QR Codes Gerados</h3>
            <HistoryList>
              {history.map((item, index) => (
                <HistoryItem key={index}>
                  <div className="date">
                    {formatDate(item.generatedAt)}
                  </div>
                  <div className="info">
                    <strong>{item.location}</strong>
                    <span>ID: {item.id}</span>
                    {item.notes && <span>{item.notes}</span>}
                  </div>
                  <div className="xp-badge">
                    {item.xp} XP
                  </div>
                </HistoryItem>
              ))}
            </HistoryList>
          </HistorySection>
        )}
      </MainCard>
    </Container>
  );
}