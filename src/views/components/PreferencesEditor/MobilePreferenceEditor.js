import React, { useState } from 'react';
import { Grid, ToggleButton, ToggleButtonGroup, Typography, Button } from '@mui/material';
import Preference from '../../../domain/Preference';

function MobilePreferencesEditor({ preference, setPreference }) {

  const handleChange = (payload) => {
    setPreference(new Preference({ ...preference, ...payload }));
  };

  const fields = [
    {
      field: 'difficulties',
      options: Preference.DIFFICULTIES,
      exclusive: false,
    },
    {
      field: 'focus',
      options: Preference.FOCUSES,
      exclusive: true,
    },
    {
      field: 'enemies',
      options: Preference.ENEMIES,
      exclusive: false,
    },
    {
      field: 'intensity',
      options: Preference.INTENSITIES,
      exclusive: true,
    },
    {
      field: 'mic',
      options: Preference.MIC_OPTIONS,
      exclusive: true,
    },
  ];

  const fieldDisplay = ({ field, options, exclusive }, index) => (
    <React.Fragment key={index}>
      <Grid item xs={12}>
        <Typography variant="h6" align="center" sx={{ marginBottom: 1 }}>{field.toUpperCase()}</Typography>
      </Grid>
      <Grid item xs={12}>
        <ToggleButtonGroup
          exclusive={exclusive}
          value={preference[field]}
          onChange={(e, newAlignment) => handleChange({ [field]: newAlignment })}
          orientation="vertical"
          fullWidth
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& .MuiToggleButtonGroup-grouped': {
              justifyContent: 'center',
              margin: 0,
              border: 0,
              '&.Mui-selected, &.Mui-selected:hover': {
                margin: 0,
                backgroundColor: 'primary.main',
                color: 'black',
              },
              width: '300px',
            },
          }}
        >
          {options.map((option, optionIndex) => (
            <ToggleButton
              key={`${field}-${optionIndex}`}
              value={option}
              sx={{
                justifyContent: 'center',
                width: '300px',
                backgroundColor: 'secondary.light',
                '&:hover': {
                  backgroundColor: 'secondary.dark',
                },
                color: 'white',
              }}
            >
              {option}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Grid>
    </React.Fragment>
  );
  
  

  return (
    <Grid container direction="column" alignItems="center" justifyContent="center">
      {fields.map(fieldDisplay)}

      {/* <Grid item xs={12} style={{marginTop: 24}}>
        <Button onClick={() => handleSave(preference)}>Save</Button>
      </Grid> */}
    </Grid>
  );
}

export default MobilePreferencesEditor;
