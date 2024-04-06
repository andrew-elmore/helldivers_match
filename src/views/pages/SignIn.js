import React, { useState } from 'react';
import { useAuth } from './../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { useMessage } from './../../context/MessageContext';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { showMessage } = useMessage();
    const { logIn } = useAuth();
    let navigate = useNavigate();

    const styles = {
        lines: {
            margin: 8
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        logIn(username, password)
            .then(() => {
                showMessage('Signed in successfully!', 'success');
                navigate('/');
            })
            .catch((error) => {
                showMessage(error.message, 'error');
            });
    };

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} style={styles.lines}>
                <Typography variant="h2" align="center">Super Earth Ministry of Friendship</Typography>
            </Grid>
            <Grid item xs={12} style={styles.lines}>
                <Typography variant="h4" align="center">Authenticate</Typography>
            </Grid>
            <form onSubmit={handleSubmit}>
                <Grid item xs={12} style={styles.lines}>
                    <TextField
                        variant="filled" 
                        label="Username"
                        type="username"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} style={styles.lines}>
                    <TextField
                        variant="filled" 
                        label="Password"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} style={styles.lines}>
                    <Button 
                        variant="contained"
                        type="submit"
                        fullWidth
                    >
                        Authenticate
                    </Button>
                </Grid>
                <Grid item xs={12} style={styles.lines}>
                    <Typography align="center"> Don't have an account? </Typography>
                </Grid>
                <Grid item xs={12} style={styles.lines}>
                    <Button 
                        variant="outlined"
                        onClick={() => navigate('/signup')}
                        fullWidth
                    >
                        Register
                    </Button>
                </Grid>
            </form>
        </Grid>
    );
};

export default SignIn;
