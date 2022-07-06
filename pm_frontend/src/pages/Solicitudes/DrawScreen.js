import { useContext } from 'react';
import { FiltersContextProvider } from 'context/FiltersContext';
import TableSection from 'pages/Solicitudes/components/TableSection';
import HeaderSection from 'pages/Solicitudes/components/HeaderSection';
import FiltersSection from 'pages/Solicitudes/components/FiltersSection';
import RequestsDetails from 'pages/Solicitudes/components/RequestsDetails';
import ReportContext from 'context/ReportContext';


export default function DrawScreen () {

  const { report } = useContext(ReportContext)
  return (
    <>
    {!report.showReport ? (
      <FiltersContextProvider>
      <HeaderSection />
      <FiltersSection css={{ my: 10 }} />
      <TableSection />
    </FiltersContextProvider>
    ) : (
      <RequestsDetails />
    )}
    </>
  );
}