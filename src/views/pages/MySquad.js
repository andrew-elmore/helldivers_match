import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, Fab } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useAuth } from '../../context/AuthContext';
import Parse from 'parse';
import SquadView from '../components/SquadView';

const MySquad = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [squad, setSquad] = useState(null);

  const fetchMySquad = async () => {
    try {
      const result = await Parse.Cloud.run("getMySquad", { userId: currentUser.id });
      if (result) {
        setSquad(result);
      }
    } catch (error) {
      console.error("Failed to fetch my squad:", error);
    }
  };

  useEffect(() => {
    fetchMySquad();
  }, []);

  return (
    <>
      <Grid container justifyContent="center" alignItems="center" direction="column">
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            My Squad
          </Typography>
        </Grid>
        {/* {squad && (
          <SquadView squad={squad} />
        )} */}
      </Grid>
    </>
  );
};

export default MySquad;
