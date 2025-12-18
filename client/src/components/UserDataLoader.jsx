import { useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useUserData, useNewTokens } from '../hooks/api/useUserServer';

export default function UserDataLoader() {
  const { userData, setUserData, clearUserData } = useUser();
  const { mutate: fetchUserData } = useUserData();
  const { mutate: fetchNewTokens } = useNewTokens();

  useEffect(() => {
    // Se já temos dados do usuário, não precisa buscar
    if (userData) {
      return;
    }

    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    // Se temos accessToken, tentar buscar dados do usuário
    if (accessToken) {
      fetchUserData(undefined, {
        onError: () => {
          // Se falhar, tentar usar refreshToken
          if (refreshToken) {
            fetchNewTokens(undefined, {
              onSuccess: () => {
                // Se conseguir novos tokens, tentar buscar dados novamente
                fetchUserData();
              },
              onError: () => {
                // Se refreshToken também falhar, limpar tudo
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                clearUserData();
              }
            });
          } else {
            // Se não tem refreshToken, limpar tudo
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            clearUserData();
          }
        }
      });
    } else if (refreshToken) {
      // Se só tem refreshToken, tentar obter novos tokens
      fetchNewTokens(undefined, {
        onSuccess: () => {
          fetchUserData();
        },
        onError: () => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          clearUserData();
        }
      });
    }
  }, [userData, fetchUserData, fetchNewTokens, clearUserData]);

  return null; // Este componente não renderiza nada
}

