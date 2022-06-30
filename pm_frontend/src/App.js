import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { createUser, resetUser } from 'redux/states'; // Actions of the global state
import useUser from 'hooks/useUser'; // Custom hook
import SideNav from 'components/common/SideNav'; // Global common component
import Loading from 'components/Loading';
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

function App () {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogged } = useUser();

  /**
   * Request the user associated with the current session
   * @return {promise}
   */
  const validateToken = () => {
    return axios.get(URL, {
      headers: {
        'Authorization': window.localStorage.getItem('token')
      }
    })
  }

  /**
   * Exceute an asynchronous call and resolve the response
   * @async
   * @param {function} asyncCall - Function that returns an asynchronous call
   * @return {Promise} A pending promise
   */
  const executeAsyncCall = async (asyncCall) => {
    let result = undefined;
    try {
      result = await asyncCall();
    } catch (err) {
      setLoading(false);
      window.localStorage.removeItem('token');
      dispatch(resetUser());
      navigate('/login');
      throw err;
    } finally {
      setLoading(false);
    }
    return result;
  }

  // Validate the current session each time the component is mounted
  useEffect(() => {
    executeAsyncCall(validateToken).then(result => {
      if (result.status === 203) {
        window.localStorage.removeItem('token');
        navigate('/login');
      }
      if (result.status === 201) {
        dispatch(createUser(result.data));
      }
    });
  }, [])

  const getRoute = ({ path, key, component }) => {
    return <Route path={path} key={key} element={component} />;
  }

  return (
    <>
      { !loading ? (
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
        <Loading />
      )}
    </>
  );
}

export default App;
