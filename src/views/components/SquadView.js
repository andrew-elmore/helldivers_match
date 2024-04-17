import React from 'react';
import { Box, Chip, Grid, Typography, IconButton } from '@mui/material';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import PreferenceView from './PreferenceView';


const SquadView = ({ 
  squad,
  onChangeSquad,
  onJoinSquad
}) => {
  const [open, setOpen] = React.useState(false);

  const styles = {
    container: {
      padding: '8px',
      margin: '8px',
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
      borderRadius: '8px',
    },
    chip: {
      margin: '4px',
    },
    header: {
      marginBottom: '16px',
    },
    editIconContainer: {
      position: 'relative',
    },
    editButton: {
      position: 'absolute',
      top: '0',
      right: '0',

    },

  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleJoinSquad = () => {
    onJoinSquad(squad.objectId);
  }

  if (!squad) {
    return null
  }


  const emptyGuestSpaces = 3 - squad.guests.length;
  const emptyGuestArray = new Array(emptyGuestSpaces).fill(undefined);
  
  return (
    <Box style={styles.container}>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h5">{squad.host.username}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">{squad.friendCode}</Typography>
        </Grid>
        <Grid item xs={12}>
          <PreferenceView
            preference={squad.preference}
          />
        </Grid>
        {squad.guests.map((guest) => (
          <Grid item xs={12}>
            <Grid container justifyContent="center">
              <Typography variant="h6">{guest?.username || "--CLASSIFIED--"}</Typography>
            </Grid>
          </Grid>
        ))}
        {emptyGuestArray.map((_) => (
          <Grid item xs={12}>
            <Grid container justifyContent="center">
              <Typography variant="h6">Open</Typography>
            </Grid>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Grid container justifyContent="center">
            <IconButton color="primary" onClick={handleJoinSquad}>
              <AddCircleOutline />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SquadView;
