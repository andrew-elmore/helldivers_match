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
  const [loading, setLoading] = useState(true)

  const handleChange = (payload) => {
    const newSquad = new Squad(payload);
    handleSave(newSquad)
  }
  const fetchMySquad = async () => {
    setLoading(true);
    try {
      console.log(':~: fetchMySquad')
      const result = await Parse.Cloud.run("getMySquad", { userId: currentUser.id });
      if (result) {
        setSquad(new Squad(result));
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to fetch my squad:", error);
      setLoading(false);
    }
  };

  const handleSave = async (newSquad) => {
    // :~~: add messages instead of alerts when requested. 
    try {
      console.log(':~: handleSave', squad)
      newSquad.validate();
      setSquad(newSquad);
      const actionToken = newSquad.getActionToken();
      await Parse.Cloud.run("saveSquad", actionToken);
    } catch (error) {
      console.error(error);
      alert("Failed to save squad.");
    }
  };

  const handleJoinSquad = async (userId, squadId) => {
    console.log(':~: handleJoinSquad', userId, squadId)
  }
  const handleLeaveSquad = async (userId, squadId) => {
    console.log(':~: handleLeaveSquad', userId, squadId)
  }

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
            squad={squad}
            onChange={handleChange}
            refetchSquad={fetchMySquad}
            onJoinSquad={handleJoinSquad}
            onLeaveSquad={handleLeaveSquad}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default MySquad;
