import { useMutation } from '@tanstack/react-query';
import { useUser } from '../../context/UserContext';

const API = import.meta.env.VITE_API_BASE_URL;

const parseResponse = async (response) => {
    const textData = await response.text();
    if (textData && textData.trim().startsWith('{')) {
        return JSON.parse(textData);
    }
    return textData;
}

const login = async (userData) => {
    const options = { headers: { 'Content-Type': 'application/json' }, method: 'POST', body: JSON.stringify(userData) };
    const response = await fetch(`${API}/auth/login`, options);
    
    if (!response.ok) {
        const errorData = await parseResponse(response);
        throw new Error(errorData.message || errorData.error || `Erro HTTP: ${response.status} ao logar.`);
    }

    return response.text();
}

const register = async (userData) => {
    const options = { headers: { 'Content-Type': 'application/json' }, method: 'POST', body: JSON.stringify(userData) };
    const response = await fetch(`${API}/auth/register`, options);

    if (!response.ok) {
        const errorData = await parseResponse(response);
        throw new Error(errorData.message || errorData.error || `Erro HTTP: ${response.status} ao registrar.`);
    }

    return response.text();
}

const logout = async () => {
    const options = { 
        headers: { 
            'Content-Type': 'application/json', 
            Authorization: `Bearer ${localStorage.getItem('accessToken')}` }, 
            method: 'POST', 
        };

    const response = await fetch(`${API}/auth/logout`, options);
    return response.text();
}

const getUserData = async () => 	{
    const options = { 
        headers: { 
            'Content-Type': 'application/json', 
            Authorization: `Bearer ${localStorage.getItem('accessToken')}` }, 
            method: 'GET', 
        };

    const response = await fetch(`${API}/auth/profile`, options);
    return response.text();
}

const getNewTokens = async () => 	{
    const options = { 
        headers: { 
            'Content-Type': 'application/json', 
            Authorization: `Bearer ${localStorage.getItem('refreshToken')}` }, 
        method: 'GET', 	
    };

    const response = await fetch(`${API}/auth/token`, options);
    console.log('user data', await response.text());
    return response.text();
}

const parseResponseBody = async (response) => {
    const textData = await response.text();
    if (textData && textData.trim().startsWith('{')) {
        return JSON.parse(textData);
    }
    return textData;
}

const cpfAuth = async (userData) => {
    const options = {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(userData)
    };

    const response = await fetch(`${API}/auth/cpf-login`, options);
    // Handle specific error for missing email
    if (response.status === 404) {
        const errorData = await parseResponseBody(response);
        if (errorData.requiresEmail) {
            const error = new Error(errorData.error);
            error.requiresEmail = true;
            throw error;
        }
    }

    if (!response.ok) {
        const errorData = await parseResponseBody(response);
        const error = new Error(errorData.error || `Erro HTTP: ${response.status} na autenticação por CPF.`);
        throw error;
    }
    return response.text();
}

export function useSignin () {
    const { setUserData } = useUser();
    const navigateToHome = (data) => {
        if (data && data.trim().startsWith('{')) {
            const parsedData = JSON.parse(data);
            localStorage.setItem("accessToken", parsedData.token.accessToken);
            localStorage.setItem("refreshToken", parsedData.token.refreshToken);
            setUserData({ ...parsedData.user });
        }
        return;
    }
    
    return useMutation({ mutationFn: login, onSuccess: navigateToHome });
}

export function useSignup () {
    return useMutation({ mutationFn: register }); 	
}

export function useLogout () {
    const clearStorage = () => {
        localStorage.setItem("accessToken", '');
        localStorage.setItem("refreshToken",'');
        const { setUserData } = useUser();
        setUserData(null); 
        return;
    }

    return useMutation({ mutationFn: logout, onSuccess: clearStorage });
}

export function useUserData () {
    const { setUserData } = useUser();
    
    const fillUserData = (data) => {
        if (data && data.trim().startsWith('{')) { 
            setUserData({ ...JSON.parse(data).user });
        }
        return;
    }

    return useMutation({ mutationFn: getUserData, onSuccess: fillUserData });
}

export function useNewTokens () {
    const fillTokens = (data) => {
        if (data && data.trim().startsWith('{')) {
            localStorage.setItem("accessToken", JSON.parse(data).token.accessToken);
            localStorage.setItem("refreshToken", JSON.parse(data).token.refreshToken);
        }
        return;
    }

    return useMutation({ mutationFn: getNewTokens, onSuccess: fillTokens });
}

export function useCpfAuth (onRequiresEmail) {
    const { setUserData } = useUser();
    
    const navigateToHome = (data) => {
        if (data && data.trim().startsWith('{')) {
            const parsedData = JSON.parse(data);

            localStorage.setItem("accessToken", parsedData.token.accessToken);
            localStorage.setItem("refreshToken", parsedData.token.refreshToken);

            setUserData({ ...parsedData.user });
            return parsedData;
        }
    }

    const onError = (error) => {
        if (error.requiresEmail) {
            onRequiresEmail();
        }
        throw error; 
    }

    return useMutation({
        mutationFn: cpfAuth,
        onSuccess: navigateToHome,
        onError: onError
    });
}