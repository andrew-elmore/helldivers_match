import React, { useState, useEffect } from 'react';
import Parse from 'parse';
import {Grid, Typography, Fab, Button} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';
import Preference from '../../domain/Preference';
import PreferenceView from '../components/PreferenceView';
import Squad from '../../domain/Squad';
import SquadView from '../components/SquadView';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [showFab, setShowFab] = useState(false);
  const [preference, setPreference] = useState(new Preference());
  const [squads, setSquads] = useState([]);

  const checkForMySquad = async () => {
    try {
      const result = await Parse.Cloud.run("getMySquad", { userId: currentUser.id });
      if (result) {
        navigate('/mySquad');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFetchSquads = async () => {
    // :~~: add messages instead of alerts when requested. 
    try {
      preference.validate();
      const result = await Parse.Cloud.run("fetchSquads", preference.getActionToken());
      setSquads(result.map(s => new Squad(s))); 
    } catch (error) {
      console.error(error);
      // alert("Failed to save squad.");
    }
  };

  const handleJoinSquad = async (squadId) => {
    // :~~: add messages instead of alerts when requested.
    try {
      await Parse.Cloud.run("joinSquad", { squadId, userId: currentUser.id});
      handleFetchSquads();
    } catch (error) {
      console.error(error);
      // alert("Failed to join squad.");
    }
  }
  useEffect(() => {
    const handleMouseWheel = () => {
      setShowFab(true);
    };

    window.addEventListener('wheel', handleMouseWheel, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleMouseWheel);
    };
  }, []);

  useEffect(() => {
    checkForMySquad()
    handleFetchSquads()
  }, [])
  
  useEffect(() => {
    handleFetchSquads()
  }, [preference]);



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
            <PreferenceView
              preference={preference}
              onChangePreference={setPreference}
            />
          </Grid>
        </Grid>
        {squads.map((s) => {
          return (
            <Grid item xs={12}>
              <Grid container justifyContent="center">
                <SquadView
                  squad={s}
                  onJoinSquad={handleJoinSquad}
                />
              </Grid>
            </Grid>
          )
        })}
        
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
