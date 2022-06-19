import react, { useState } from 'react';

const FiltersContext = react.createContext();

export function FiltersContextProvider({ children }) {
  const dateTimeEnd = new Date();
  const dateTimeBegin = new Date();
  dateTimeBegin.setDate(dateTimeEnd.getDate() - 7);
  const [filters, setFilters] = useState({
    startDate: dateTimeBegin,
    endDate: dateTimeEnd,
    idCompany: '',
    deparment: ''
  });
  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </FiltersContext.Provider>
  )
}

export default FiltersContext;
