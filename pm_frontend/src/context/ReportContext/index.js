import react, { useState } from 'react';

const ReportContext = react.createContext();

export function ReportContextProvider ({ children }) {
  const parameters = {
    showReport: false,
    requestId: 0,
  }
  const [report, setReport] = useState(parameters)
  return (
    <ReportContext.Provider value={{ report, setReport }}>
      {children}
    </ReportContext.Provider>
  );
}

export default ReportContext;
