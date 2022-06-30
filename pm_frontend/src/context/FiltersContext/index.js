import react, { useState } from 'react';

const FiltersContext = react.createContext();

export function FiltersContextProvider({ children }) {
  const dateTimeEnd = new Date();
  const dateTimeBegin = new Date();
  dateTimeBegin.setDate(dateTimeEnd.getDate() - 7);
  const [listShow, setListShow] = useState([]);
  const [localFilters, setLocalFilters] = useState([]);
  const [listRequests, setListRequests] = useState([])
  const [filters, setFilters] = useState({
    startDate: dateTimeBegin,
    endDate: dateTimeEnd,
    idCompany: '',
    department: ''
  });
  return (
    <FiltersContext.Provider
      value={{
        filters,
        setFilters,
        listRequests,
        setListRequests,
        listShow,
        setListShow,
        localFilters,
        setLocalFilters
      }}
    >
      {children}
    </FiltersContext.Provider>
  )
}

export default FiltersContext;
