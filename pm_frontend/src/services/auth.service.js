import axios from 'axios';

export default async function login ({ username, password }) {
  const data = { username, password };
  const URL = `${process.env.REACT_APP_API_URL}/login`;

  return axios.post(URL, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.data);
}
