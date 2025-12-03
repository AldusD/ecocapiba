// src/services/StreakService.js

// Dica: Em projetos reais, essa URL base costuma vir de um arquivo .env
const API_BASE_URL = "http://localhost:8080";

export const StreakService = {
  /**
   * Busca o multiplicador e a quantidade de semanas de streak do usuário
   * @param {number} userId - ID do usuário
   * @returns {Promise<{streakWeeks: number, multiplier: number}>}
   */
  getMultiplier: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/streak/multiplier/${userId}`);
      
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro no StreakService:", error);
      throw error; // Lança o erro para que a tela possa tratar (ex: parar o loading)
    }
  }
};