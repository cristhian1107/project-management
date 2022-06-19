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
    if (res.status === 204)
      return []
    return res.json();
  }).then(res => res);
}

function useBackend () {
  return {
    getEvents: () => getUtilsFromBackend({ path: 'table/all?table_code=3' }),
    getPriorities: () => getUtilsFromBackend({ path: 'table/all?table_code=4' }),
    getCompanies: () => getUtilsFromBackend({ path: 'company/all' }),
    getDepartments: () => getUtilsFromBackend({ path: 'department/all' }),
    getRequests: ({startDate, endDate, idCompany, deparment}) => {
      const dateBegin = new Date()
      dateBegin.setDate(startDate.getDate() - 1)
      const dateEnd = new Date()
      dateEnd.setDate(endDate.getDate() - 1)
      return getUtilsFromBackend({
      path: `request/all?date_begin=${dateBegin.toISOString().split('T')[0]}&date_end=${dateEnd.toISOString().split('T')[0]}&company_id=${idCompany}&department=${deparment}`
    })},
    postRequest: (body) => getUtilsFromBackend({ method: 'POST', path: 'request', body: body })
  }
}

export { useBackend };
