// App.js
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import PreferencesEditor from './views/components/PreferenceEditor';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <PreferencesEditor />
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
