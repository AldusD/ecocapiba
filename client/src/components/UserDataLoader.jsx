import { useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useUserData } from '../hooks/api/useUserServer';

export default function UserDataLoader() {
  const { userData, setUserData } = useUser();
  const { mutate: fetchUserData } = useUserData();

  useEffect(() => {
    // Se já temos dados do usuário, não precisa buscar
    if (userData) {
      return;
    }

    // Se temos token mas não temos dados, buscar dados do usuário
    const token = localStorage.getItem('accessToken');
    if (token) {
      fetchUserData();
    }
  }, [userData, fetchUserData]);

  return null; // Este componente não renderiza nada
}

