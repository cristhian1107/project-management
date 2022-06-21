// React core
import { useContext, useCallback } from 'react';
// Context
import UserContext from 'context/UserContext';
// Services
import func from 'services/private.services';
// Utilities
import { subtractDays } from 'utilities/dateOperations';

/**
 * Provides functions to request different routes of the private API.
 * @return {object} Contains the functions.
 */
function useBackend () {
  const { jwt: token } = useContext(UserContext);
  const obj = {}

  obj.getEvents = useCallback(() => func({path: 'table/all?table_code=3', token}), [token]);

  obj.getPriorities = useCallback(() => func({path: 'table/all?table_code=4', token}), [token]);

  obj.getCompanies = useCallback(() => func({path: 'company/all', token}), [token]);

  obj.getDepartments = useCallback(() => func({path: 'department/all', token}), [token]);

  obj.getRequests = useCallback(({
    startDate,
    endDate,
    idCompany,
    deparment
  }) => {
    const splitForCharacter = (date) =>  date?.toISOString().split('T')[0];
    const [dateBegin, dateEnd] = subtractDays([startDate, endDate], 1);
    const params = new URLSearchParams({
      date_begin: splitForCharacter(dateBegin),
      date_end: splitForCharacter(dateEnd),
      company_id: idCompany,
      deparment
    }).toString();

    return func({path: `request/all?${params}`, token})
  }, [token]);

  obj.postRequest = useCallback((body) => func({method: 'POST', path: 'request', body, token}), [token]);

  return obj;
}

export { useBackend };
