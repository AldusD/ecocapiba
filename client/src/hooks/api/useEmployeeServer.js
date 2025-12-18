import { useMutation } from "@tanstack/react-query";

const API = import.meta.env.VITE_API_URL;

const getEmployeeData = async () => {
    const token = localStorage.getItem('employeeToken') || localStorage.getItem('employeeAccessToken');
    if (!token) {
        throw new Error('Token não encontrado');
    }

    const options = { 
        headers: { 
            'Content-Type': 'application/json', 
            Authorization: `Bearer ${token}` 
        }, 
        method: 'GET', 
    };

    const response = await fetch(`${API}/employee/profile`, options);
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || `Erro HTTP: ${response.status} ao buscar dados do funcionário.`);
    }

    return response.json();
};

const createQRCode = async (data) => {
    const token = localStorage.getItem('employeeToken') || localStorage.getItem('employeeAccessToken');
    if (!token) {
        throw new Error('Token não encontrado');
    }

    const options = { 
        headers: { 
            'Content-Type': 'application/json', 
            Authorization: `Bearer ${token}` 
        }, 
        method: 'POST',
        body: JSON.stringify(data),
    };

    const response = await fetch(`${API}/employee/qrcode`, options);
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || `Erro HTTP: ${response.status} ao criar QR Code.`);
    }

    return response.json();
};

const getQRHistory = async () => {
    const token = localStorage.getItem('employeeToken') || localStorage.getItem('employeeAccessToken');
    if (!token) {
        throw new Error('Token não encontrado');
    }

    const options = { 
        headers: { 
            'Content-Type': 'application/json', 
            Authorization: `Bearer ${token}` 
        }, 
        method: 'GET', 
    };

    const response = await fetch(`${API}/employee/qrcode/history`, options);
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || `Erro HTTP: ${response.status} ao buscar histórico.`);
    }

    return response.json();
};

export function useEmployeeData(onDataLoaded) {
    const fillEmployeeData = (data) => {
        if (data && onDataLoaded) {
            onDataLoaded(data);
        }
        return data;
    };

    return useMutation({ 
        mutationFn: getEmployeeData, 
        onSuccess: fillEmployeeData 
    });
}

export function useCreateQRCode() {
    return useMutation({ 
        mutationFn: createQRCode
    });
}

export function useQRHistory() {
    return useMutation({ 
        mutationFn: getQRHistory
    });
}
