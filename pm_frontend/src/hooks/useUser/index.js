// React
import { useContext, useCallback } from 'react';
// Context
import UserContext from 'context/UserContext';
// Service
import loginService from 'services/auth.service';
// Redux
import { useDispatch, useSelector } from 'react-redux';

export default function useUser () {
  const {jwt, setJWT, userInfo, setUserInfo} = useContext(UserContext);
  const userState = useSelector(store => store.user);
  const dispatch = useDispatch();

  const login = useCallback(({username, password}) => {
    loginService({username, password})
      .then(({ jwt, ...info }) => {
        setJWT(jwt);
        setUserInfo(info);
      })
      .catch(err => console.error(err));
  }, [setJWT, setUserInfo]);

  const logout = useCallback(() => {
    window.localStorage.removeItem('token');
    setJWT(null);
  }, [setJWT]);

  return {
    isLogged: Boolean(jwt),
    login,
    logout,
    userInfo
  }
}
