import React, { useState } from 'react';
import { Button, Grid, Icon, IconButton, TextField, Typography } from '@mui/material';
import PreferencesEditor from './../PreferencesEditor/index';
import Preference from '../../../domain/Preference';
import Squad from '../../../domain/Squad';
import { useAuth } from '../../../context/AuthContext';
import Parse from 'parse';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


const SquadEditor = ({currentSquad, onSave}) => {
  const { currentUser } = useAuth();
  const [squad, setSquad] = useState( new Squad(currentSquad || {host: currentUser.get('username')}));
  

  const handleSave = async () => {
    // :~~: add messages instead of alerts when requested. 
    try {
      squad.validate();
      const actionToken = squad.getActionToken();
      const result = await Parse.Cloud.run("saveSquad", actionToken);
      onSave(result)
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

  const handleRemoveSquadMember = (index) => {
    const updatedGuests = [...squad.guests];
    updatedGuests.splice(index, 1);
    handleSetSquad('guests', updatedGuests);
  };

  const handleAddSquadMember = () => {
    if (squad.guests.length < 3) {
      const updatedGuests = [...squad.guests, "-CLASSIFIED-"];
      handleSetSquad('guests', updatedGuests);
    }
  };

  const emptyGuestSpaces = 3 - squad.guests.length;
  const emptyGuestArray = new Array(emptyGuestSpaces).fill(undefined);
  

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
      {squad.guests.map((guest, index) => (
        <Grid item xs={12} key={index}>
          <Grid container alignItems="center" justifyContent="space-between" style={{padding: 8}}>
            <Typography variant="h6" sx={{ width: '100%' }}>{guest}</Typography>
            <IconButton color="primary" onClick={() => handleRemoveSquadMember(index)} sx={{ position: 'absolute', right: 0 }}>
              <RemoveCircleOutlineIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      {emptyGuestArray.map((_, index) => (
        <Grid item xs={12} key={index}>
          <Grid container alignItems="center" justifyContent="space-between" style={{padding: 8}}>
            <Typography variant="h6" sx={{ width: '100%' }}>Open</Typography>
            <IconButton color="primary" onClick={handleAddSquadMember} sx={{ position: 'absolute', right: 0 }}>
              <AddCircleOutlineIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}
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
