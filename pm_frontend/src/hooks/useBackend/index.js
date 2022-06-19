async function getUtilsFromBackend ({ method, path, body }) {
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
    return res.json();
  }).then(res => res);
}

function useBackend () {
  return {
    getEvents: () => getUtilsFromBackend({ path: 'table/all?table_code=3' }),
    getPriorities: () => getUtilsFromBackend({ path: 'table/all?table_code=4' }),
    getCompanies: () => getUtilsFromBackend({ path: 'company/all' }),
    getDepartments: () => getUtilsFromBackend({ path: 'department/all' }),
    postRequest: (body) => getUtilsFromBackend({ method: 'POST', path: 'request', body: body })
  }
}

export { useBackend };
