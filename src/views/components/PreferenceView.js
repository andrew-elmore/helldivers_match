import React from 'react';
import { Box, Chip, Grid, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import Preference from '../../domain/Preference';
import PreferenceDialog from './PreferencesEditor/PreferenceDialog';

const PreferenceView = ({ 
  preference,
  onChangePreference,
}) => {
  const [open, setOpen] = React.useState(false);

  const styles = {
    container: {
      padding: '8px',
      margin: '2px',
      // backgroundColor: 'rgba(0, 0, 0, 0.5)',
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

  const difficultyColors = {
    0: '#00ff00',
    1: '#ccff33',
    2: '#ccff33',
    3: '#ccff33',
    4: '#ffff00',
    5: '#ffcc00',
    6: '#ff9900',
    7: '#ff6600',
    8: '#ff0000'
  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleChangePreference = (preference) => {
    onChangePreference(preference);
    handleClose()
  }

  return (
    <Box style={styles.container}>
      <PreferenceDialog
        open={open}
        onClose={handleClose}
        onSave={handleChangePreference}
        initialPreference={preference}
      />
      <Grid container justifyContent="center">
        <Grid item xs={12} >
          <Grid container justifyContent="flex-end" style={styles.editIconContainer}>
            {onChangePreference && (
              <IconButton color="primary" style={styles.editButton} onClick={() => setOpen(true)} size="small">
                <EditIcon />
              </IconButton>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="center">
            {Object.keys(difficultyColors).map((key) => (
              <Box
                key={key}
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: preference.difficulties.includes(Preference.DIFFICULTIES[key]) ? difficultyColors[key] : 'transparent',
                  display: 'inline-block',
                  margin: '2px',
                  border: '1px solid grey',
                }}
              />
            ))}
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container justifyContent="center">
            <Chip label={`${preference.focus}`} style={styles.chip} />
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container justifyContent="center">
            <Chip label={`${preference.intensity}`} style={styles.chip} />
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container justifyContent="center">
            <Chip label={`${preference.mic}`} style={styles.chip} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="center">
            {preference.enemies.map((enemy, index) => (
              <Chip key={index} label={enemy} style={styles.chip} />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PreferenceView;
