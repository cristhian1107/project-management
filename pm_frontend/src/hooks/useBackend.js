import { useCallback } from 'react';
import func from 'services/private.services';

/**
 * Provides functions to request different routes of the private API.
 * @return {object} Contains the functions.
 */
function useBackend () {
  const obj = {};

  obj.getEvents = useCallback(() => func({ path: 'table/all?table_code=3' }), []);

  obj.getPriorities = useCallback(() => func({ path: 'table/all?table_code=4' }), []);

  obj.getTypes = useCallback(() => func({ path: 'table/all?table_code=2' }), []);

  obj.getCompanies = useCallback(() => func({ path: 'company/all' }), []);

  obj.getDepartments = useCallback(() => func({ path: 'department/all' }), []);

  obj.getDashboard = useCallback(({ year, month }) => func({ path: `dashboard/all?year=${year}&month=${month}` }), []);

  obj.getRequest = useCallback((id) => func({ path: `request?id=${id}` }), []);

  obj.getRequests = useCallback(({
    startDate,
    endDate,
    idCompany,
    department
  }) => {
    const splitForCharacter = (date) => date?.toISOString().split('T')[0];
    const params = new URLSearchParams({
      date_begin: splitForCharacter(startDate),
      date_end: splitForCharacter(endDate),
      company_id: idCompany,
      department
    }).toString();

    return func({ path: `request/all?${params}` });
  }, []);

  obj.postRequest = useCallback((body) => func({ method: 'POST', path: 'request', body }), []);

  obj.putRequest = useCallback((body) => func({ method: 'PUT', path: 'request', body }), []);

  obj.postEvent = useCallback((body) => func({ method: 'POST', path: 'request/event', body }), []);

  return obj;
}

export { useBackend };
