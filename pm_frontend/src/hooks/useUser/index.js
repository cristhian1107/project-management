// React
import { useContext, useCallback } from 'react';
// Context
import UserContext from 'context/UserContext';
// Service
import loginService from 'services/login';

export default function useUser () {
  const {jwt, setJWT, userInfo, setUserInfo} = useContext(UserContext);

  const login = useCallback(({username, password}) => {
    console.log(username, password)
    loginService({username, password})
      .then(({ jwt, ...info }) => {
        console.log("INFOOOOOOOOOO");
        console.log(info);
        setJWT(jwt);
        setUserInfo(info);
      })
      .catch(err => console.error(err));
  }, [setJWT]);

  const logout = useCallback(() => {
    setJWT(null);
  }, [setJWT]);

  return {
    isLogged: Boolean(jwt),
    login,
    logout,
    userInfo
  }
}
