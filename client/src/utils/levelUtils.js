import XP_LIMITS from '../enums/XP_LIMITS.js';

/**
 * Calcula o nível do usuário baseado no XP
 * @param {number} xp - Experiência do usuário
 * @returns {number} - Nível do usuário (0-5)
 */
export function calculateLevel(xp) {
  const limits = Object.values(XP_LIMITS);
  
  for (let i = 0; i < limits.length; i++) {
    if (xp < limits[i]) {
      return i;
    }
  }
  
  // Se o XP é maior que todos os limites, retorna o nível máximo
  return limits.length - 1;
}

/**
 * Calcula o XP necessário para o próximo nível
 * @param {number} currentLevel - Nível atual do usuário
 * @returns {number} - XP necessário para o próximo nível
 */
export function getXpForNextLevel(currentLevel) {
  const limits = Object.values(XP_LIMITS);
  if (currentLevel >= limits.length - 1) {
    return limits[limits.length - 1]; // Nível máximo
  }
  return limits[currentLevel];
}

/**
 * Calcula o XP necessário para o nível atual
 * @param {number} currentLevel - Nível atual do usuário
 * @returns {number} - XP necessário para o nível atual
 */
export function getXpForCurrentLevel(currentLevel) {
  const limits = Object.values(XP_LIMITS);
  if (currentLevel === 0) {
    return 0;
  }
  return limits[currentLevel - 1];
}

