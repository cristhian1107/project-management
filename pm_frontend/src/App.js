// React router dom
import { Routes, Route, Navigate } from 'react-router-dom';
// @mui
import { ThemeProvider, createTheme } from '@mui/material/styles';
// Custom hooks
import useUser from 'hooks/useUser';
// Routes
import SignIn from 'layouts/authentication/sign-in';
import Dashboard from 'layouts/dashboard';

const customTheme = createTheme({
  palette: {
    background: {
      default: 'rgba(240, 242, 245, 1)',
    }
  }
})

function App() {
  const { isLogged } = useUser();
  
  return (
    <ThemeProvider theme={customTheme}>
      {isLogged ? (
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='*' element={<Navigate to='/dashboard' />} />
        </Routes>
      ) : (
          <Routes>
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='*' element={<Navigate to='/sign-in' />} />
          </Routes>
      )}
    </ThemeProvider>
  );
}

export default App;
