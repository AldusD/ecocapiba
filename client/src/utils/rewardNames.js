/**
 * Mapeia tipos e razões de recompensa para nomes amigáveis em português
 */
export function getRewardName(entry) {
  // A API retorna: type, title (que contém o reason), metadata, source, id
  if (!entry) {
    return 'Recompensa';
  }

  const { type, title, reason, metadata, id, source } = entry;

  // Detectar tipo: primeiro pelo type, depois pelo id (formato: "reward:123", "recycle:456", "quiz:789")
  let entryType = '';
  
  // Tentar pelo type primeiro
  if (type) {
    entryType = String(type).toLowerCase().trim();
  }
  
  // Se não tiver type ou estiver vazio, tentar inferir do id
  if (!entryType && id) {
    const idStr = String(id);
    if (idStr.startsWith('recycle:')) {
      entryType = 'recycle';
    } else if (idStr.startsWith('quiz:')) {
      entryType = 'quiz';
    } else if (idStr.startsWith('reward:')) {
      entryType = 'reward';
    }
  }
  
  // Se ainda não tiver tipo, tentar inferir do source
  if (!entryType && source) {
    if (source.quizId || source.quizAttemptId) {
      entryType = 'quiz';
    } else if (source.recyclesMadeId || source.doneDate) {
      entryType = 'recycle';
    }
  }
  
  // Se ainda não tiver tipo, tentar inferir do title
  if (!entryType && title) {
    const titleLower = String(title).toLowerCase();
    if (titleLower.includes('reciclagem') || titleLower === 'recycle') {
      entryType = 'recycle';
    } else if (titleLower.includes('quiz')) {
      entryType = 'quiz';
    }
  }

  // Recompensas de reciclagem
  if (entryType === 'recycle') {
    return 'Reciclagem Registrada';
  }

  // Recompensas de quiz
  if (entryType === 'quiz') {
    const quizId = entry.source?.quizId;
    if (quizId) {
      return `Quiz Concluído #${quizId}`;
    }
    return 'Quiz Concluído';
  }
  
  // Se chegou aqui e não tem tipo definido, mas tem source com quizId, é um quiz
  if (!entryType && entry.source?.quizId) {
    return `Quiz Concluído #${entry.source.quizId}`;
  }
  
  // Se tem source com recyclesMadeId, é uma reciclagem
  if (!entryType && entry.source?.recyclesMadeId) {
    return 'Reciclagem Registrada';
  }

  // Recompensas genéricas (reward) ou fallback
  if (entryType === 'reward' || !entryType) {
    // A API coloca o reason no title (não retorna reason separado)
    // Então usar title como reason
    const rewardReason = reason || title || 'generic_reward';
    
    // Verificar se há informações no metadata primeiro
    if (metadata && typeof metadata === 'object' && metadata !== null) {
      // Se houver informações específicas no metadata, usar elas
      if (metadata.action) {
        return String(metadata.action);
      }
      if (metadata.description) {
        return String(metadata.description);
      }
      if (metadata.reason) {
        // Se o metadata tiver um reason, usar ele
        const metaReason = String(metadata.reason);
        const reasonMap = getReasonMap();
        return reasonMap[metaReason] || formatReason(metaReason);
      }
    }
    
    // Converter para string e normalizar
    const reasonStr = String(rewardReason).trim();
    
    // Tentar inferir o tipo de recompensa baseado no título ou reason
    const lowerReason = reasonStr.toLowerCase();
    if (lowerReason.includes('invitation') || lowerReason.includes('convite') || lowerReason.includes('friend')) {
      return 'Bônus por Convite';
    }
    
    // Mapeamento de razões conhecidas
    const reasonMap = getReasonMap();

    // Retornar nome mapeado (verificar exatamente como está no mapa)
    const mappedName = reasonMap[reasonStr];
    if (mappedName) {
      return mappedName;
    }
    
    // Se não estiver no mapa, formatar
    const formatted = formatReason(reasonStr);
    
    // Se o formatado for igual ao original e for "generic_reward" ou "reward", retornar "Recompensa Geral"
    if ((reasonStr === 'generic_reward' || reasonStr === 'reward') && formatted === reasonStr) {
      return 'Recompensa Geral';
    }
    
    return formatted;
  }
  
  // Fallback - se não tiver type, tentar usar title
  return title || 'Recompensa';
}

/**
 * Retorna o mapeamento de razões para nomes amigáveis
 */
function getReasonMap() {
  return {
    'generic_reward': 'Recompensa Geral',
    'reward': 'Recompensa Geral',
    'invitation_reward': 'Bônus por Convite',
    'friend_invited': 'Amigo Cadastrado',
    'invitation_bonus': 'Bônus de Convite',
    'daily_bonus': 'Bônus Diário',
    'streak_bonus': 'Bônus de Sequência',
    'level_up': 'Subida de Nível',
    'achievement': 'Conquista Desbloqueada',
    'special_event': 'Evento Especial',
    'compensation': 'Compensação',
    'admin_reward': 'Recompensa Administrativa',
    // Recompensas específicas
    'quiz_reward': 'Quiz Concluído',
    'recycle_reward': 'Reciclagem Registrada',
    'manual_reward': 'Recompensa Manual',
  };
}

/**
 * Formata uma razão genérica para um nome mais amigável
 */
function formatReason(reason) {
  if (!reason) return 'Recompensa';
  
  return reason
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

