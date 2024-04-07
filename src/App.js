import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import SquadEditor from './views/components/SquadEditor/index'
import SignUpPage from './views/pages/SignUp';
import SignInPage from './views/pages/SignIn';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MessageProvider } from './context/MessageContext';
import Dashboard from './views/pages/Dashboard';
import NewSquad from './views/pages/NewSquad';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/signin" />;
};

const styles = {
  app: {
    backgroundColor: 'black', 
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/super-earth.png)`, 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
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
                  <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/newSquad" element={<ProtectedRoute><NewSquad /></ProtectedRoute>} />
                  
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
