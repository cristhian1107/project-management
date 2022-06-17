export default function login ({ username, password }) {
  return fetch(`${process.env.REACT_APP_API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  }).then(res => {
    if (!res.ok) throw new Error('Response is NOT ok');
    return res.json();
  }).then(res => {
    console.table(res);
    const { jwt } = res;
    window.localStorage.setItem('token', jwt);
    return jwt;
  });
}
