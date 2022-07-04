import { FiltersContextProvider } from 'context/FiltersContext';
import TableSection from 'pages/Solicitudes/components/TableSection';
import HeaderSection from 'pages/Solicitudes/components/HeaderSection';
import FiltersSection from 'pages/Solicitudes/components/FiltersSection';

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
