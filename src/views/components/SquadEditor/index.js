import React, { useState, useEffect } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import PreferencesEditor from './../PreferencesEditor/index';
import Squad from '../../../domain/Squad';
import { useAuth } from '../../../context/AuthContext';

function SquadEditor({ currentSquad, onSave }) {
  const { currentUser } = useAuth();
  const [squad, setSquad] = useState( new Squad({host: currentUser.get('username')}));
  
  const handleSave = () => {
    try {
        const updatedSquad = new Squad(squad);
        updatedSquad.validate();
        onSave(updatedSquad);
    } catch (error) {
        alert(error);
    }
};

const handleChange = (e) => {
    const { name, value } = e.target;
    setSquad(prevSquad => new Squad({ ...prevSquad, [name]: value }));
};

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
        <PreferencesEditor preference={squad.preference} setPreference={(updatedPref) => setSquad({ ...squad, preference: updatedPref })} />
      </Grid>
      <Grid item xs={12}>
        <Button onClick={handleSave} variant="contained">Save Squad</Button>
      </Grid>
    </Grid>
  );
}

export default SquadEditor;
