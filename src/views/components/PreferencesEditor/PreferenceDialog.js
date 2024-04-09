import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, Button } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import { useMessage } from '../../../context/MessageContext';
import PreferenceEditor from './index';
import Preference from '../../../domain/Preference';

function PreferencesDialog({ open, onClose, onSave, initialPreference }) {
  const theme = useTheme();
  const { showMessage } = useMessage();
  const [preference, setPreference] = useState(initialPreference || new Preference());

  const handleSave = () => {
    try {
      preference.validate();
      onSave(preference);
      showMessage('Preferences Updated!', 'success');
      onClose();
    } catch (error) {
      showMessage(error.message, 'error');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogContent style={{padding: 0}}>
          <PreferenceEditor preference={preference} setPreference={setPreference} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default PreferencesDialog;
