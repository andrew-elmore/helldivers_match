import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import PreferencesEditor from './views/components/PreferenceEditor';
import SignUpPage from './views/pages/SignUp';
import SignInPage from './views/pages/SignIn';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MessageProvider } from './context/MessageContext';
// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/signin" />;
};

const styles = {
  app: {
    backgroundColor: '#282c34',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
  }
};

const App = () => {
  return (
    <AuthProvider>
      <MessageProvider>

        <ThemeProvider theme={theme}>
          <Router>
            <div className="App" style={styles.app}>
              <header>
                <Routes>
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/signin" element={<SignInPage />} />
                  <Route path="/" element={<ProtectedRoute><PreferencesEditor /></ProtectedRoute>} />
                  {/* Redirect to signin by default if no path matches */}
                  <Route path="*" element={<Navigate to="/signin" />} />
                </Routes>
              </header>
            </div>
          </Router>
        </ThemeProvider>
      </MessageProvider>
    </AuthProvider>
  );
};

export default App;
