function getUtilsFromBackend ({ method, path, body }) {
  return fetch(`${process.env.REACT_APP_API_URL}/${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body,
  }).then(res => {
    if (!res.ok) throw new Error('Response is NOT ok');
    return res.json();
  }).then(res => res);
}

function useBackend () {
  return {
    events: () => getUtilsFromBackend({ path: 'table/all?table_code=3' }),
    events: () => getUtilsFromBackend({ path: 'table/all?table_code=4' }),
    companies: () => getUtilsFromBackend({ path: 'company/all' }),
    departments: () => getUtilsFromBackend({ path: 'departments/all' })
  }
}

export { useBackend };
