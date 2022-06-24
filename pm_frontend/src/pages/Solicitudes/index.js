// Context
import { FiltersContextProvider } from 'context/FiltersContext';
// Parts of the component
import TableSection from 'pages/Solicitudes/TableSection';
import HeaderSection from 'pages/Solicitudes/HeaderSection';
import FiltersSection from 'pages/Solicitudes/FiltersSection';

export default function Solicitudes () {

  return (
    <>
      <FiltersContextProvider>
        <HeaderSection />
        <FiltersSection css={{ my: 10 }}/>
        <TableSection />
      </FiltersContextProvider>
    </>
  )
}
