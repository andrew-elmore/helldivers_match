import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, Fab } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useAuth } from '../../context/AuthContext';
import Parse from 'parse';
import SquadEditor from '../components/SquadEditor';
import Squad from '../../domain/Squad';

const MySquad = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [squad, setSquad] = useState(null);

  const fetchMySquad = async () => {
    try {
      const result = await Parse.Cloud.run("getMySquad", { userId: currentUser.id });
      if (result) {
        setSquad(new Squad(result));
      }
    } catch (error) {
      console.error("Failed to fetch my squad:", error);
    }
  };

  useEffect(() => {
    fetchMySquad();
  }, []);

  if (!squad) {
    return (
      <Typography variant="h5">Loading...</Typography>
    );
  }
  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <SquadEditor
            currentSquad={squad}
            onSave={(newSquad) => setSquad( new Squad(newSquad))}
            liveUpdate={true}
          />
        </Grid>

      </Grid>
    </>
  );
};

export default MySquad;
