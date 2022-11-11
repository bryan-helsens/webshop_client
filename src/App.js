import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ColorModeContext, useMode } from './theme';
import { Container } from '@mui/material';
import Topbar from './scene/global/Topbar';
import { Route, Routes } from 'react-router-dom';
import Register from './scene/auth/register';
import Login from './scene/auth/login';
import User from './components/User';
import RouteApp from './routes/RouteApp';

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouteApp />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
