import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fce84f',
      light: '#ffff81',
      dark: '#c7b819',
      contrastText: '#000000',
    },
    secondary: {
      main: '#000000',
      light: '#484848',
      dark: '#000000',
      contrastText: '#ffffff',
    },
    background: {
      default: '#121212', 
      paper: '#333333', 
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'filled', 
        margin: 'dense', 
      },
      styleOverrides: {
        root: {
          '& .MuiFilledInput-input': {
            color: 'white', 
          },
          '& .MuiFilledInput-underline:before': {
            borderBottomColor: 'transparent', 
          },
          '& .MuiFilledInput-underline:hover:before': {
            borderBottomColor: 'transparent', 
          },
          '& .MuiFilledInput-underline:after': {
            borderBottomColor: 'transparent', 
          },
          '& .MuiInputLabel-filled': {
            color: 'lightgrey', 
          },
          '& .MuiFilledInput-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.4)', 
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.6)', 
            },
            '&.Mui-focused': {
              backgroundColor: 'rgba(0, 0, 0, 0.6)', 
            },
          },
        },
      },
    },
  },
});

export default theme;
