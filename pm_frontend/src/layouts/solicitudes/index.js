// Parts of the component
import HeaderSection from 'layouts/solicitudes/components/headerSection';
import FiltersSection from 'layouts/solicitudes/components/filtersSection';
import TableSection from 'layouts/solicitudes/components/tableSection';

export default function Projects() {

  return (
    <>
      <HeaderSection />
      <FiltersSection css={{ my: 7 }}/>
      <TableSection css={{ minWidth: '728px' }}/>
    </>
  )
}
