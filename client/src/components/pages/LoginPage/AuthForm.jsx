import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignin, useSignup } from '../../../hooks/api/useUserServer'; 
import { FormContainer, Card, Title, Input, Button, ErrorMessage } from './AuthForm.styled';

const formatCpf = (value) => {
    const cleaned = value.replace(/\D/g, '').substring(0, 11);
    const parts = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/);
    if (!parts) return '';

    let formatted = '';
    if (parts[1]) formatted += parts[1];
    if (parts[2]) formatted += '.' + parts[2];
    if (parts[3]) formatted += '.' + parts[3];
    if (parts[4]) formatted += '-' + parts[4];
    
    return formatted.replace(/\.$/, '').replace(/-$/, '').replace(/\.\-/, '.');
};

const validateCpf = (rawCpf) => {
    let cpf = rawCpf.replace(/[^\d]+/g, '');
    
    if (cpf.length !== 11) return false;
    
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let sum;
    let remainder;

    // Primeiro dígito verificador
    sum = 0;
    for (let i = 1; i <= 9; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    // Segundo dígito verificador
    sum = 0;
    for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;
    
    return true;
};

const MIN_PASSWORD_LENGTH = 6;

const AuthForm = ({ invitationCode }) => {
    const [mode, setMode] = useState(invitationCode ? 'register' : 'login');
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState(''); 
    const [name, setName] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [inviteCode, setInviteCode] = useState(invitationCode || '');
    
    // Atualizar o código de convite se vier da URL
    useEffect(() => {
        if (invitationCode) {
            setInviteCode(invitationCode);
        }
    }, [invitationCode]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const isLoginMode = mode === 'login';
    const signinMutation = useSignin();
    const signupMutation = useSignup();
    
    const mutation = isLoginMode ? signinMutation : signupMutation;
    const isLoading = mutation.isLoading;

    const handleCpfChange = (e) => {
        setCpf(formatCpf(e.target.value));
        if (error) setError('');
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (error) setError('');
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (error) setError('');
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
        if (error) setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        
        const rawCpf = cpf.replace(/\D/g, ''); 
        
        if (rawCpf.length !== 11) {
            setError('O CPF deve ter 11 dígitos.');
            return;
        }
        
        if (!validateCpf(rawCpf)) {
            setError('CPF inválido. Por favor, verifique o número.');
            return;
        }
        
        if (password.length < MIN_PASSWORD_LENGTH) {
            setError(`A senha deve ter no mínimo ${MIN_PASSWORD_LENGTH} caracteres.`);
            return;
        }

        const userData = { cpf: rawCpf, password }; 

        if (!isLoginMode) {
            if (!name || !email) {
                setError('Nome e Email são obrigatórios para o Cadastro.');
                return;
            }
            // Usar o código de convite da URL se disponível, senão usar o do campo
            const finalInviteCode = invitationCode || inviteCode || '';
            Object.assign(userData, { name, email, invitationCode: finalInviteCode, xp: 0, capibas: 0 });
        }
        
        mutation.mutate(userData, {
            onSuccess: () => {
                navigate('/home'); 
            },
            onError: (err) => {
                const errorMessage = err.message || "Erro de credenciais. Tente novamente.";
                setError(errorMessage);
            }
        });
    };

    const toggleMode = () => {
        // Se houver código de convite, não permitir voltar para login
        if (invitationCode) {
            return;
        }
        setMode(isLoginMode ? 'register' : 'login');
        setError('');
        setName(''); 
        setEmail('');
        setPassword('');
        setInviteCode('');
    };

    const formTitle = isLoginMode ? 'Acessar sua Conta' : 'Criar Nova Conta';
    const isPasswordValid = password.length >= MIN_PASSWORD_LENGTH;
    const isCpfValid = cpf.length === 14 ? validateCpf(cpf) : true;
    
    // Habilita o botão se o CPF tiver 11 dígitos e for válido, e se a senha for válida
    const isDisabled = isLoading || cpf.length < 14 || !isCpfValid || !isPasswordValid;


    return (
        <FormContainer>
            <Card>
                <Title>{formTitle}</Title>
                <form onSubmit={handleSubmit}>
                    
                    {/* Campos de Cadastro */}
                    {!isLoginMode && (
                        <>
                            <Input
                                type="text"
                                placeholder="Seu Nome Completo"
                                value={name}
                                onChange={handleNameChange}
                                required
                                disabled={isLoading}
                            />
                            <Input
                                type="email"
                                placeholder="Seu Melhor Email"
                                value={email}
                                onChange={handleEmailChange}
                                required
                                disabled={isLoading}
                            />
                            <Input
                                type="text"
                                placeholder="Código de Convite (opcional)"
                                value={inviteCode}
                                onChange={(e) => setInviteCode(e.target.value)}
                                disabled={isLoading || !!invitationCode}
                                style={{
                                    backgroundColor: invitationCode ? '#f0f0f0' : '',
                                    cursor: invitationCode ? 'not-allowed' : 'text'
                                }}
                            />
                            {invitationCode && (
                                <p style={{ 
                                    fontSize: '0.8rem', 
                                    color: 'green',
                                    marginTop: '-10px',
                                    marginBottom: '10px'
                                }}>
                                    ✓ Código de convite aplicado!
                                </p>
                            )}
                        </>
                    )}

                    {/* Campo CPF */}
                    <Input
                        type="text"
                        placeholder="CPF"
                        value={cpf}
                        onChange={handleCpfChange}
                        maxLength={14} 
                        disabled={isLoading}
                        required
                        style={{ borderColor: cpf.length === 14 && !isCpfValid ? 'red' : '' }}
                    />
                    
                    {/* Feedback visual do CPF */}
                    {cpf.length === 14 && !isCpfValid && (
                        <p style={{ fontSize: '0.8rem', color: 'red', marginTop: '-10px', marginBottom: '10px' }}>
                            CPF inválido.
                        </p>
                    )}
                    
                    {/* Campo Senha */}
                    <Input
                        type="password"
                        placeholder="Sua Senha"
                        value={password}
                        onChange={handlePasswordChange}
                        disabled={isLoading}
                        required
                    />
                    
                    {/* Feedback visual da senha */}
                    {password.length > 0 && (
                        <p style={{ 
                            fontSize: '0.8rem', 
                            color: isPasswordValid ? 'green' : 'orange',
                            marginTop: '-10px',
                            marginBottom: '10px'
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
                                : 'Finalizar Cadastro'
                        }
                    </Button>
                </form>
                
                {!invitationCode && (
                    <p style={{ marginTop: '15px', fontSize: '0.9rem', textAlign: 'center' }}>
                        {isLoginMode ? 'Não tem uma conta?' : 'Já possui uma conta?'}
                        {' '}
                        <a href="#" onClick={toggleMode}>
                            {isLoginMode ? 'Crie uma conta' : 'Fazer Login'}
                        </a>
                    </p>
                )}
                {invitationCode && (
                    <p style={{ marginTop: '15px', fontSize: '0.9rem', textAlign: 'center', color: '#666' }}>
                        Você foi convidado! Complete seu cadastro para começar.
                    </p>
                )}

            </Card>
        </FormContainer>
    );
};

export default AuthForm;