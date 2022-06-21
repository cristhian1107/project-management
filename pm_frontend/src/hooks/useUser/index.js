// React
import { useCallback } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { createUser, resetUser } from 'redux/states';
// Service
import loginService from 'services/auth.service';

const ls = window.localStorage;

/**
 * Manage a user's session state
 */
export default function useUser () {
  const dispatch = useDispatch();
  const userState = useSelector(state => state.user);

  // Validate credentials with a service
  const login = useCallback(async ({ username, password }) => {
    loginService({username, password})
      .then(data => {
        // Store session token in local memory
        ls.setItem('token', data.jwt);
        // Loading data of the user in the global state
        dispatch(createUser(data));
      })
      .catch(err => console.error(err));
  }, [dispatch]);

  // Ends the user session and remove stored data
  const logout = useCallback(() => {
    ls.removeItem('token');
    dispatch(resetUser());
  }, [dispatch]);

  return {
    isLogged: Boolean(userState.jwt),
    login,
    logout,
  }
}
