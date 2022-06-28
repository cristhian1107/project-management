// React core
import { useCallback } from 'react';
// Services
import func from 'services/private.services';
// Utilities
import { subtractDays } from 'utilities/dateOperations';

/**
 * Provides functions to request different routes of the private API.
 * @return {object} Contains the functions.
 */
function useBackend () {
  const obj = {}

  obj.getEvents = useCallback(() => func({path: 'table/all?table_code=3'}), []);

  obj.getPriorities = useCallback(() => func({path: 'table/all?table_code=4'}), []);
  
  obj.getTypes = useCallback(() => func({path: 'table/all?table_code=2'}), []);

  obj.getCompanies = useCallback(() => func({path: 'company/all'}), []);

  obj.getDepartments = useCallback(() => func({path: 'department/all'}), []);

  obj.getDashboard = useCallback(({year, month}) => func({path: `dashboard/all?year=${year}&month=${month}`}), []);

  obj.getRequests = useCallback(({
    startDate,
    endDate,
    idCompany,
    deparment
  }) => {
    const splitForCharacter = (date) =>  date?.toISOString().split('T')[0];
    const params = new URLSearchParams({
      date_begin: splitForCharacter(startDate),
      date_end: splitForCharacter(endDate),
      company_id: idCompany,
      deparment
    }).toString();

    return func({path: `request/all?${params}`})
  }, []);

  obj.postRequest = useCallback((body) => func({method: 'POST', path: 'request', body}), []);
  
  obj.putRequest = useCallback((body) => func({method: 'PUT', path: 'request', body}), []);

  return obj;
}

export { useBackend };
