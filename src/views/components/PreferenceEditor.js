import React, { useState } from 'react';
import { Box, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Preference from './../../domain/Preference';
import LogoutButton from './Logout';
function PreferencesEditor({ currentPreference }) {
  const [preference, setPreference] = useState(currentPreference || new Preference());

  const handleToggleChange = (payload) => {
    console.log('payload', payload)
    setPreference(new Preference({ ...preference, ...payload }));
  };

  const fields = [
    {
      field: 'difficulties',
      options: Preference.DIFFICULTIES,
      gridWidth: 12,
      optionWidth: 150,
      exclusive: false
    },
    {
      field: 'focus',
      options: Preference.FOCUSES,
      gridWidth: 6,
      optionWidth: 150,
      exclusive: true
    },
    {
      field: 'enemies',
      options: Preference.ENEMIES,
      gridWidth: 6,
      optionWidth: 150,
      exclusive: false
    },
    {
      field: 'intensity',
      options: Preference.INTENSITIES,
      gridWidth: 6,
      optionWidth: 150,
      exclusive: true
    },
    {
      field: 'mic',
      options: Preference.MIC_OPTIONS,
      gridWidth: 6,
      optionWidth: 150,
      exclusive: true
    },
  ];
  

  const feildDisplay = ({field, options, gridWidth, optionWidth, exclusive}, index) => {
    return (
      <Grid item xs={gridWidth} key={index}>
        <Grid container justifyContent="center" style={{margin: 10}}>
          <ToggleButtonGroup
            exclusive={exclusive}
            value={preference[field]}
            onChange={(e, payload) => handleToggleChange({ [field]: payload })}
            sx={{
              '& .MuiToggleButtonGroup-grouped': {
                margin: '2px',
                border: 0,
                '&.Mui-selected, &.Mui-selected:hover': {
                  backgroundColor: 'primary.main',
                },
                '&:not(:first-of-type)': {
                  borderRadius: '8px',
                },
                '&:first-of-type': {
                  borderRadius: '8px',
                },
              },
            }}
          >
            {options.map((value, index) => (
              <ToggleButton key={`${field}-${index}`} value={value} aria-label={value} sx={{
                width: optionWidth,
                color: 'white',
                backgroundColor: 'secondary.light',
                '&:hover': {
                  backgroundColor: 'secondary.dark',
                },
                color: 'white',
              }}>
                {value}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container>
      <LogoutButton/>
      {fields.map((field, index) => (
        feildDisplay(field, index)
      ))}
    </Grid>
  );
}

export default PreferencesEditor;
