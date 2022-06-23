// React router dom
import { Routes, Route, Navigate } from 'react-router-dom';
// @mui
import { ThemeProvider, createTheme } from '@mui/material/styles';
// Custom hooks
import useUser from 'hooks/useUser';
// Common component
import SideNav from 'components/sideNav';
// Config
import { routes } from 'config';

const customTheme = createTheme({
  palette: {
    background: {
      default: 'rgba(240, 242, 245, 1)',
    }
  }
})

function App() {
  const { isLogged } = useUser();

  const getRoute = ({ path, key, component }) => {
    return <Route path={path} key={key} element={component} />;
  }

  return (
    <ThemeProvider theme={customTheme}>
      {isLogged ? (
        <Routes>
          <Route path='/' element={<SideNav />} >
            <Route index element={<Navigate to='/dashboard' />} />
            {routes.privates.map(route => getRoute(route))}
            <Route path='*' key='other' element={<Navigate to='/' />} />
          </Route>
        </Routes>
      ) : (
        <Routes>
          {routes.publics.map(route => getRoute(route))}
          <Route path='*' key='other'element={<Navigate to='/login' />} />
        </Routes>
      )}
    </ThemeProvider>
  );
}

export default App;
