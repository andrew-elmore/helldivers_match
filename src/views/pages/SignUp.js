import React, { useState } from 'react';
import { useAuth } from './../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { useMessage } from './../../context/MessageContext';

export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState(''); // Add username state
    const { showMessage } = useMessage();
    const { signUp } = useAuth();
    let navigate = useNavigate();

    const styles = {
        lines: {
            margin: 8
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signUp(username, email, password)
          .then(() => {
              showMessage('Signed up successfully!', 'success');
              navigate('/signin');
          }).catch((error) => {
              showMessage(error.message, 'error');
          });
    };

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} style={styles.lines}>
                <Typography variant="h2" align="center">Super Earth Ministry of Friendship</Typography>
            </Grid>
            <Grid item xs={12} style={styles.lines}>
                <Typography variant="h4" align="center">Register</Typography>
            </Grid>
            <form onSubmit={handleSubmit}>
                <Grid item xs={12} style={styles.lines}>
                    <TextField
                        variant="filled"
                        label="Username"
                        type="text"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} style={styles.lines}>
                    <TextField
                        variant="filled" 
                        label="Email"
                        type="email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        fullWidth
                        variant="contained"
                        type="submit"
                    >Register</Button>
                </Grid>
                <Grid item xs={12} style={styles.lines}>
                    <Button 
                        fullWidth
                        variant="outlined"
                        onClick={() => navigate('/signin')}
                    >Back to Sign In</Button>
                </Grid>
            </form>
        </Grid>
    );
};
