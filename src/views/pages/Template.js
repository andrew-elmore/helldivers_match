import React from 'react';
import { Container, Grid, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const styles = {
    root: {
        padding: 12
    }
  }
  return (
    <Grid container  style={styles.root}>
      <Grid item>
        {/* Place for title or other elements */}
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="flex-end">
          <IconButton onClick={() => navigate('/newSquad')}>
            <AddCircleOutlineIcon fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
      {/* Additional content */}
    </Grid>
  );
};

export default Dashboard;
