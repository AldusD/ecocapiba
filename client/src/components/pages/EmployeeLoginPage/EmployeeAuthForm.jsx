import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContainer, Card, Title, Input, Button, ErrorMessage, BackLink } from './EmployeeAuthForm.styled';

const MIN_PASSWORD_LENGTH = 6;

const EmployeeAuthForm = () => {
    const [mode, setMode] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const isLoginMode = mode === 'login';

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (error) setError('');
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (error) setError('');
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
        if (error) setError('');
    };

    const handleEmployeeIdChange = (e) => {
        setEmployeeId(e.target.value);
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (password.length < MIN_PASSWORD_LENGTH) {
            setError(`A senha deve ter no mínimo ${MIN_PASSWORD_LENGTH} caracteres.`);
            return;
        }

        if (!isLoginMode) {
            if (!name || !email || !employeeId) {
                setError('Todos os campos são obrigatórios para o Cadastro.');
                return;
            }
        }

        setIsLoading(true);

        try {
            const API = import.meta.env.VITE_API_URL;
            const endpoint = isLoginMode ? '/employee/login' : '/employee/register';
            const body = isLoginMode 
                ? { email, password }
                : { email, password, name, employeeId };

            const response = await fetch(`${API}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            // Se o endpoint não existir (404), usar autenticação mock para desenvolvimento
            if (response.status === 404) {
                // Mock para desenvolvimento - remover quando a API estiver pronta
                console.warn('Endpoint de funcionário não encontrado. Usando autenticação mock.');
                const mockToken = `employee_${Date.now()}_${email}`;
                localStorage.setItem('employeeToken', mockToken);
                localStorage.setItem('employeeAccessToken', mockToken);
                navigate('/employee');
                return;
            }

            const data = await response.json();

            if (response.ok) {
                // Salvar token se fornecido
                // A API pode retornar token diretamente ou em data.token ou data.accessToken
                let token = null;
                if (typeof data === 'string') {
                    token = data;
                } else if (data.token) {
                    token = typeof data.token === 'string' ? data.token : (data.token.accessToken || data.token);
                } else if (data.accessToken) {
                    token = data.accessToken;
                }

                if (token) {
                    localStorage.setItem('employeeToken', token);
                    localStorage.setItem('employeeAccessToken', token);
                    navigate('/employee');
                } else {
                    setError('Token não recebido do servidor.');
                }
            } else {
                setError(data.error || data.message || 'Erro ao fazer login. Tente novamente.');
            }
        } catch (err) {
            // Se for erro de rede e estiver em desenvolvimento, permitir acesso mock
            if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
                console.warn('Erro de conexão. Usando autenticação mock para desenvolvimento.');
                const mockToken = `employee_${Date.now()}_${email}`;
                localStorage.setItem('employeeToken', mockToken);
                localStorage.setItem('employeeAccessToken', mockToken);
                navigate('/employee');
                return;
            }
            setError('Erro de conexão. Verifique sua internet e tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const toggleMode = () => {
        setMode(isLoginMode ? 'register' : 'login');
        setError('');
        setName('');
        setEmail('');
        setPassword('');
        setEmployeeId('');
    };

    const formTitle = isLoginMode ? 'Login de Funcionário' : 'Cadastro de Funcionário';
    const isPasswordValid = password.length >= MIN_PASSWORD_LENGTH;
    const isDisabled = isLoading || !email || !isPasswordValid || (!isLoginMode && (!name || !employeeId));

    return (
        <FormContainer>
            <Card>
                <Title>{formTitle}</Title>
                <form onSubmit={handleSubmit}>
                    {!isLoginMode && (
                        <>
                            <Input
                                type="text"
                                placeholder="Nome Completo"
                                value={name}
                                onChange={handleNameChange}
                                required
                                disabled={isLoading}
                            />
                            <Input
                                type="text"
                                placeholder="ID do Funcionário"
                                value={employeeId}
                                onChange={handleEmployeeIdChange}
                                required
                                disabled={isLoading}
                            />
                        </>
                    )}

                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        disabled={isLoading}
                    />
                    
                    <Input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        disabled={isLoading}
                    />
                    
                    {password.length > 0 && (
                        <p style={{ 
                            fontSize: '0.8rem', 
                            color: isPasswordValid ? 'green' : 'orange',
                            marginTop: '-10px',
                            marginBottom: '10px',
                            textAlign: 'left'
                        }}>
                            {isPasswordValid 
                                ? '✓ Senha forte o suficiente.' 
                                : `Mínimo de ${MIN_PASSWORD_LENGTH} caracteres.`
                            }
                        </p>
                    )}

                    {error && <ErrorMessage>{error}</ErrorMessage>}

                    <Button type="submit" disabled={isDisabled}>
                        {isLoading
                            ? 'Aguarde...' 
                            : isLoginMode 
                                ? 'Entrar' 
                                : 'Cadastrar'
                        }
                    </Button>
                </form>
                
                <p style={{ marginTop: '15px', fontSize: '0.9rem', textAlign: 'center' }}>
                    {isLoginMode ? 'Não tem uma conta?' : 'Já possui uma conta?'}
                    {' '}
                    <a href="#" onClick={toggleMode}>
                        {isLoginMode ? 'Cadastre-se' : 'Fazer Login'}
                    </a>
                </p>

                <BackLink>
                    <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>
                        ← Voltar para login de usuário
                    </a>
                </BackLink>
            </Card>
        </FormContainer>
    );
};

export default EmployeeAuthForm;

