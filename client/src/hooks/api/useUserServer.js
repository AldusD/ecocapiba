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
    const navigateToHome = async (data) => {
        if (data && data.trim().startsWith('{')) {
            const parsedData = JSON.parse(data);
            // Backend returns { token: "JWT_STRING" }
            if (parsedData.token) {
                localStorage.setItem("authToken", parsedData.token);
                
                // Fetch user profile data to populate context
                try {
                    const profileResponse = await fetch(`${API}/auth/profile`, {
                        headers: {
                            'Authorization': `Bearer ${parsedData.token}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    if (profileResponse.ok) {
                        const userData = await profileResponse.json();
                        setUserData(userData);
                    }
                } catch (err) {
                    console.error("Erro ao buscar dados do usuário:", err);
                }
            }
        }
        return;
    }
    
    return useMutation({ mutationFn: login, onSuccess: navigateToHome });
}

export function useSignup () {
    const { setUserData } = useUser();

    const navigateToHome = async (data, variables) => {
        // Register returns { token: "JWT_STRING" }
        if (data && data.trim().startsWith('{')) {
            const parsed = JSON.parse(data);
            if (parsed.token) {
                localStorage.setItem("authToken", parsed.token);
                
                // Fetch user profile data
                try {
                    const profileResponse = await fetch(`${API}/auth/profile`, {
                        headers: {
                            'Authorization': `Bearer ${parsed.token}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    if (profileResponse.ok) {
                        const userData = await profileResponse.json();
                        setUserData(userData);
                    }
                } catch (err) {
                    console.error("Erro ao buscar dados do usuário:", err);
                }
                return;
            }
        }
    }
    
    return useMutation({ mutationFn: register, onSuccess: navigateToHome });
}

export function useLogout () {
    const clearStorage = () => {
        localStorage.removeItem("authToken");
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
            const parsed = JSON.parse(data);
            localStorage.setItem("authToken", parsed.token);
        }
        return;
    }

    return useMutation({ mutationFn: getNewTokens, onSuccess: fillTokens });
}

export function useCpfAuth (onRequiresEmail) {
    const { setUserData } = useUser();
    
    const navigateToHome = async (data) => {
        if (data && data.trim().startsWith('{')) {
            const parsedData = JSON.parse(data);
            if (parsedData.token) {
                localStorage.setItem("authToken", parsedData.token);

                // Fetch user profile
                try {
                    const profileResponse = await fetch(`${API}/auth/profile`, {
                        headers: {
                            'Authorization': `Bearer ${parsedData.token}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    if (profileResponse.ok) {
                        const userData = await profileResponse.json();
                        setUserData(userData);
                    }
                } catch (err) {
                    console.error("Erro ao buscar dados do usuário:", err);
                }
                return parsedData;
            }
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