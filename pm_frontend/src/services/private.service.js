// Utilities
import { basicFetch } from 'utilities/basicFetch';
import { subtractDays } from 'utilities/dateOperations';

const getEvents = () => basicFetch({path: 'table/all?table_code=3'});

const getPriorities = () => basicFetch({path: 'table/all?table_code=4'});

const getCompanies = () => basicFetch({path: 'company/all'});

const getDepartments = () => basicFetch({path: 'department/all'});

const getRequests = ({
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
    idCompany,
    deparment
  }).toString();

  return basicFetch({path: `request/all?${params}`})
};

const postRequest = (body) => basicFetch({method: 'POST', path: 'request', body});

const objectToExport = {
  getEvents,
  getPriorities,
  getCompanies,
  getDepartments,
  getRequests,
  postRequest
}

export default objectToExport;