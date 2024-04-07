import React, { useState, useEffect } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import PreferencesEditor from './../PreferencesEditor/index';
import Squad from '../../../domain/Squad';
import { useAuth } from '../../../context/AuthContext';
import Parse from 'parse';


const SquadEditor = ({ currentSquad, onSave }) => {
  const { currentUser } = useAuth();
  const [squad, setSquad] = useState( new Squad({host: currentUser.get('username')}));
  

  const handleSave = async () => {
    try {
      squad.validate();
      const actionToken = squad.getActionToken();
      console.log(actionToken)
      const result = await Parse.Cloud.run("saveSquad", actionToken);
      console.log("Squad saved:", result);
    } catch (error) {
      console.error("Failed to save squad:", error);
      alert("Failed to save squad.");
    }
  };

const handleChange = (e) => {
  const { name, value } = e.target;
  setSquad(prevSquad => {
      const updatedSquad = new Squad({...prevSquad, [name]: value});
      return updatedSquad;
  });
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
