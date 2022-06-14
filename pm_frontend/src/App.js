// React router dom
import { Routes, Route, Navigate } from 'react-router-dom';
// @mui
import { ThemeProvider, createTheme } from '@mui/material/styles';
// Custom hooks
import useUser from 'hooks/useUser';
// Routes
import SignIn from 'layouts/authentication/sign-in';
import Dashboard from 'layouts/dashboard';
import Profile from 'layouts/profile';
import Tables from 'layouts/tables';
import Solicitudes from 'layouts/solicitudes';
import SideNav from 'components/sideNav';

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
            <Route path='/' element={<SideNav />} >
              <Route index element={<Navigate to='/dashboard' />} />
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='Solicitudes' element={<Solicitudes />} />
              <Route path='tables' element={<Tables />} />
              <Route path='profile' element={<Profile />} />
              <Route path='*' element={<Navigate to='/' />} />
            </Route>
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
