import { useEffect } from 'react';
import { useEmployeeData } from '../hooks/api/useEmployeeServer';

export default function EmployeeDataLoader({ onDataLoaded }) {
  const { mutate: fetchEmployeeData } = useEmployeeData(onDataLoaded);

  useEffect(() => {
    // Se temos token, buscar dados do funcionário
    const token = localStorage.getItem('employeeToken') || localStorage.getItem('employeeAccessToken');
    if (token && onDataLoaded) {
      fetchEmployeeData();
    }
  }, [fetchEmployeeData, onDataLoaded]);

  return null; // Este componente não renderiza nada
}

