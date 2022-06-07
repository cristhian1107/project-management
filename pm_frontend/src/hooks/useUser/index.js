// React
import { useContext, useCallback } from 'react';
// Context
import UserContext from 'context/UserContext';
// Service
import loginService from 'services/login';

export default function useUser () {
  const {jwt, setJWT} = useContext(UserContext);

  const login = useCallback(({username, password}) => {
    setJWT(true)
    // loginService({username, password})
    //   .then(jwt => setJWT(jwt))
    //   .catch(err => console.error(err));
  }, [setJWT]);

  const logout = useCallback(() => {
    setJWT(null);
  }, [setJWT]);

  return {
    isLogged: Boolean(jwt),
    login,
    logout
  }
}
