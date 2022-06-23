// React
import { useState, useEffect, useCallback } from 'react';
// React router dom
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
// @mui
import { ThemeProvider, createTheme } from '@mui/material/styles';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { createUser, resetUser } from 'redux/states'; // actions
// Custom hooks
import useUser from 'hooks/useUser';
// Common component in the app
import SideNav from 'components/sideNav';
// Config
import { routes } from 'config';

import axios from 'axios';
const URL = `${process.env.REACT_APP_API_URL}/user`;

const customTheme = createTheme({
  palette: {
    background: {
      default: 'rgba(240, 242, 245, 1)',
    }
  }
})

function App() {
  const { isLogged } = useUser();
  
  /*==== Convertir a un custom hooks ====*/
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  
  const validateToken = async () => {
    try {
      setLoading(true);
      let result = await axios.get(URL, {
        headers: {
          'Authorization': window.localStorage.getItem('token')
        }
      })
      setLoading(false);
      setIsActive(true);
      if (result.status === 203) {
        window.localStorage.removeItem('token');
        navigate('/login');
      }
      if (result.status === 201) {
        dispatch(createUser(result.data));
      }
      return result.data;
    } catch (err) {
      setIsActive(true);
      window.localStorage.removeItem('token');
      dispatch(resetUser());
      navigate('/login');
    }
  }

  useEffect(() => {
    validateToken();
  }, [])
  /*====================================================*/

  const getRoute = ({ path, key, component }) => {
    return <Route path={path} key={key} element={component} />;
  }

  return (
    <>
      { isActive ? (
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
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}

export default App;
