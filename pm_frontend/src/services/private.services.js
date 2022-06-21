// Utilities
import { subtractDays } from 'utilities/dateOperations';

const requestsToThePrivateApi = (func, token) => {
  const obj = {}

  obj.getEvents = () => func({path: 'table/all?table_code=3', token});

  obj.getPriorities = () => func({path: 'table/all?table_code=4', token});

  obj.getCompanies = () => func({path: 'company/all', token});

  obj.getDepartments = () => func({path: 'department/all', token});

  obj.getRequests = ({
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
  };

  obj.postRequest = (body) => func({method: 'POST', path: 'request', body, token});

  return obj;
}

export default requestsToThePrivateApi;
