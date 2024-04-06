import React from 'react';
import { useAuth } from './../../context/AuthContext';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const { logOut } = useAuth();
    let navigate = useNavigate();

    const handleLogout = async () => {
        await logOut();
        navigate('/signin');
    };

    return (
        <Button onClick={handleLogout} variant="contained" color="secondary">
            Logout
        </Button>
    );
};

export default LogoutButton;
