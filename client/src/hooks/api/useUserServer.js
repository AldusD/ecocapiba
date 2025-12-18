import { useMutation } from '@tanstack/react-query';
import { useUser } from '../../context/UserContext';

const API = import.meta.env.VITE_API_URL;

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
    const token = localStorage.getItem('accessToken');
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

    const response = await fetch(`${API}/auth/profile`, options);
    
    if (!response.ok) {
        const errorData = await parseResponse(response);
        throw new Error(errorData.message || errorData.error || `Erro HTTP: ${response.status} ao buscar dados do usuário.`);
    }

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
            const token = parsedData.token;
            
            // Salvar token
            if (token) {
                localStorage.setItem("accessToken", token);
            }
            
            // Buscar dados completos do usuário
            try {
                const userDataResponse = await getUserData();
                if (userDataResponse && userDataResponse.trim().startsWith('{')) {
                    const userData = JSON.parse(userDataResponse);
                    setUserData(userData);
                }
            } catch (error) {
                console.error("Erro ao buscar dados do usuário:", error);
            }
        }
        return;
    }
    
    return useMutation({ mutationFn: login, onSuccess: navigateToHome });
}

export function useSignup () {
    const { setUserData } = useUser();

    const navigateToHome = async (data, variables) => {
        // If register response includes token, save it and fetch user data
        if (data && data.trim().startsWith('{')) {
            const parsed = JSON.parse(data);
            const token = parsed.token;
            
            if (token) {
                localStorage.setItem("accessToken", token);
                
                // Buscar dados completos do usuário
                try {
                    const userDataResponse = await getUserData();
                    if (userDataResponse && userDataResponse.trim().startsWith('{')) {
                        const userData = JSON.parse(userDataResponse);
                        setUserData(userData);
                        return;
                    }
                } catch (error) {
                    console.error("Erro ao buscar dados do usuário após registro:", error);
                }
            }
        }

        // Fallback: try to login immediately with the same credentials
        try {
            const loginResp = await login(variables);
            if (loginResp && loginResp.trim().startsWith('{')) {
                const parsedLogin = JSON.parse(loginResp);
                const token = parsedLogin.token;
                
                if (token) {
                    localStorage.setItem("accessToken", token);
                    
                    // Buscar dados completos do usuário
                    try {
                        const userDataResponse = await getUserData();
                        if (userDataResponse && userDataResponse.trim().startsWith('{')) {
                            const userData = JSON.parse(userDataResponse);
                            setUserData(userData);
                        }
                    } catch (error) {
                        console.error("Erro ao buscar dados do usuário após login:", error);
                    }
                }
            }
        } catch (err) {
            console.error("Erro ao fazer login após registro:", err);
            // ignore: caller can handle navigation/errors
        }
    }

    return useMutation({ mutationFn: register, onSuccess: navigateToHome }); 	
}

export function useLogout () {
    const { setUserData } = useUser();
    
    const clearStorage = () => {
        localStorage.setItem("accessToken", '');
        localStorage.setItem("refreshToken",'');
        setUserData(null); 
        return;
    }

    return useMutation({ mutationFn: logout, onSuccess: clearStorage });
}

export function useUserData () {
    const { setUserData } = useUser();
    
    const fillUserData = (data) => {
        if (data && data.trim().startsWith('{')) { 
            const userData = JSON.parse(data);
            setUserData(userData);
        }
        return;
    }

    return useMutation({ 
        mutationFn: getUserData, 
        onSuccess: fillUserData
        // onError será tratado pelo componente que chama (UserDataLoader)
    });
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
    
    const navigateToHome = async (data) => {
        if (data && data.trim().startsWith('{')) {
            const parsedData = JSON.parse(data);
            const token = parsedData.token;

            if (token) {
                localStorage.setItem("accessToken", token);
            }

            // Buscar dados completos do usuário
            try {
                const userDataResponse = await getUserData();
                if (userDataResponse && userDataResponse.trim().startsWith('{')) {
                    const userData = JSON.parse(userDataResponse);
                    setUserData(userData);
                    return parsedData;
                }
            } catch (error) {
                console.error("Erro ao buscar dados do usuário:", error);
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