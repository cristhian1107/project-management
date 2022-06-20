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
