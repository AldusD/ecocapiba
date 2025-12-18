import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import AuthForm from '../LoginPage/AuthForm';

const InvitePage = () => {
    const { code } = useParams();
    
    // Se não houver código, redirecionar para login
    if (!code) {
        return <Navigate to="/login" replace />;
    }
    
    return <AuthForm invitationCode={code} />;
};

export default InvitePage;

