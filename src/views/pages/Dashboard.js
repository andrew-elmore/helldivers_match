import React, { useState, useEffect } from 'react';
import {Grid, Typography, Fab, Button} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showFab, setShowFab] = useState(false);

  useEffect(() => {
    const handleMouseWheel = () => {
      setShowFab(true);
    };

    window.addEventListener('wheel', handleMouseWheel, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleMouseWheel);
    };
  }, []);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Grid container justifyContent="center">
            <Typography variant="h4">Ministry of Friendship</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="center">
            <Typography >Add filters to find the right squad</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="center">
            <Button 
              variant="contained"
              onClick={() => {}}
            >Filters</Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="center">
            My Filters
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="center">
            All Squads
          </Grid>
        </Grid>
      </Grid>
      {showFab && (
        <Fab color="primary" style={{ position: 'fixed', bottom: 20, right: 20 }} onClick={() => navigate('/newSquad')}>
          <AddCircleOutlineIcon />
        </Fab>
      )}
    </>
  );
};

export default Dashboard;
