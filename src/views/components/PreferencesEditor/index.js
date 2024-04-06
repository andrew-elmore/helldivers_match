import React from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import DesktopPreferenceEditor from './DesktopPreferenceEditor';
import MobilePreferenceEditor from './MobilePreferenceEditor'; // Ensure this path is correct

function PreferencesEditor({ preference, setPreference }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    if (isMobile) {
        return <MobilePreferenceEditor preference={preference} setPreference={setPreference}/>;
    } else {
        return <DesktopPreferenceEditor preference={preference} setPreference={setPreference}/>;
    }
}

export default PreferencesEditor;
