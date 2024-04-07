import React, { useState } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import PreferencesEditor from './../PreferencesEditor/index';
import Preference from '../../../domain/Preference';
import Squad from '../../../domain/Squad';
import { useAuth } from '../../../context/AuthContext';
import Parse from 'parse';


const SquadEditor = ({currentSquad, onSave}) => {
  const { currentUser } = useAuth();
  const [squad, setSquad] = useState( new Squad(currentSquad || {host: currentUser.get('username')}));
  

  const handleSave = async () => {
    // :~~: add messages instead of alerts when requested. 
    try {
      squad.validate();
      const actionToken = squad.getActionToken();
      const result = await Parse.Cloud.run("saveSquad", actionToken);
      // onSave(result)
    } catch (error) {
      console.error(error);
      alert("Failed to save squad.");
    }
  };


  const handleSetSquad = (name, value) => {
    setSquad(new Squad({
      ...squad,
      [name]: value
    }));
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    handleSetSquad(name, value)
  };


  const updatePreference = (payload) => {
    const newPreference = new Preference(payload);
    handleSetSquad('preference', newPreference)
  }
  return (
    <Grid container direction="column" alignItems="center" justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h5">Edit Squad</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="filled"
          type="text"
          fullWidth
          label="Friend Code"
          name="friendCode"
          value={squad.friendCode}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <PreferencesEditor preference={squad.preference} setPreference={updatePreference} />
      </Grid>
      <Grid item xs={12}>
        <Button onClick={handleSave} variant="contained">Save Squad</Button>
      </Grid>
    </Grid>
  );
}

export default SquadEditor;
