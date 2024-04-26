import React, { useEffect, useState } from 'react';
import { Button, Grid, Icon, IconButton, TextField, Typography } from '@mui/material';
import PreferencesEditor from './../PreferencesEditor/index';
import Preference from '../../../domain/Preference';
import Squad from '../../../domain/Squad';
import { useAuth } from '../../../context/AuthContext';
import Parse from 'parse';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RefreshIcon from '@mui/icons-material/Refresh';


const SquadEditor = ({squad, onChange, liveUpdate, refetchSquad, onJoinSquad, onLeaveSquad}) => {
  const [friendCode, setFriendCode] = useState(squad.friendCode);

  const handleSetSquad = (name, value) => {
    onChange(new Squad({
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


  const handleAddSquadMember = () => {
    if (squad.guests.length < 3) {
      const updatedGuests = [...squad.guests, null];
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
        {typeof refetchSquad === 'function' && (
          <IconButton color="primary" onClick={refetchSquad}>
            <RefreshIcon />
          </IconButton>
        )}
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="filled"
          type="text"
          fullWidth
          label="Friend Code"
          name="friendCode"
          value={friendCode}
          onChange={(e) => setFriendCode(e.target.value)}
          onBlur={handleChange}
        />
      </Grid>
      {squad.guests.map((guest, index) => (
        <Grid item xs={12} key={index}>
          <Grid container alignItems="center" justifyContent="space-between" style={{padding: 8}}>
            <Typography variant="h6" sx={{ width: '100%' }}>{guest?.username || "--CLASSIFIED--"}</Typography>
            <IconButton color="primary" onClick={() => onLeaveSquad(guest?.objectId || null, squad.objectId)} sx={{ position: 'absolute', right: 0 }}>
              <RemoveCircleOutlineIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      {emptyGuestArray.map((_, index) => (
        <Grid item xs={12} key={index}>
          <Grid container alignItems="center" justifyContent="space-between" style={{padding: 8}}>
            <Typography variant="h6" sx={{ width: '100%' }}>Open</Typography>
            <IconButton color="primary" onClick={() => onJoinSquad(null, squad.objectId)} sx={{ position: 'absolute', right: 0 }}>
              <AddCircleOutlineIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Grid item xs={12}>
        <PreferencesEditor preference={squad.preference} setPreference={updatePreference} />
      </Grid>
      {/* {!(typeof refetchSquad === 'function') && (
        <Grid item xs={12}>
          <Button onClick={handleSave} variant="contained">Save Squad</Button>
        </Grid>
      )} */}
    </Grid>
  );
}

export default SquadEditor;
