// React core
import { useContext } from 'react';
// Context
import UserContext from 'context/UserContext';
// Services
import requestsToThePrivateApi from 'services/private.services';

/**
 * Execute requests to the application's API and
 * resolve the response.
 * @param {string} method - The verb od the request.
 * @param {string} path - The resource path in the API.
 * @param {object} body - The payload of the request.
 * @return {Promise} A promise with the resolved response.
 */
export async function basicFetch ({ method, path, body }) {
  const jwt = window.localStorage.getItem('token');

  return fetch(`${process.env.REACT_APP_API_URL}/${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': jwt
    },
    body: JSON.stringify(body),
  }).then(res => {
    if (!res.ok) throw new Error('Response is NOT ok');
    if (res.status === 204)
      return []
    return res.json();
  }).then(res => res);
}

/**
 * Provides functions to request different routes.
 * @return {object} Contains the functions.
 */
function useBackend () {
  const { jwt } = useContext(UserContext);

  return {
    ...requestsToThePrivateApi(basicFetch, jwt)
  }
}

export { useBackend };
