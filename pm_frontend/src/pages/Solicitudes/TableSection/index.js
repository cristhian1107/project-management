// React core
import { useState, useEffect } from 'react';
// @mui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// Custom hooks
import { useBackend } from 'hooks/useBackend'
// Parts of the components
import TableRoot from 'pages/Solicitudes/TableSection/TableRoot';
// Global components
import Button from 'components/button';
// Local components
import {
  ContainerFilters, LabelTypography, ListFilters, ItemToFilter,
  ContainerBoxSearch, FormGrid, ButtonToSearch, StyleSearchIcon,
  BoxInput, ContainerTable
} from './styles';

export default function TableSection({ css }) {
  const { getEvents } = useBackend();
  const [states, setStates] = useState([])

  useEffect(() => {
    getEvents().then(setStates);
  }, [getEvents]);

  return (
    <Box sx={{ ...css }}>
      <ContainerFilters onClick={() => console.log(1)}>
        <LabelTypography>
          Filtrar por estado:
        </LabelTypography>
        <ListFilters>
          <Button>Todos</Button>
          {
            states.map((state) => {
              return (
                <ItemToFilter colorBorder={state.description} key={state.alias}>
                  {state.name}
                </ItemToFilter>
              )
            })
          }
        </ListFilters>
      </ContainerFilters>
      <ContainerBoxSearch>
        <FormGrid container component='form'>
          <BoxInput
            xs={10}
            component='input'
            type='text'
            placeholder='Buscar'
          />
          <Grid
            item
            xs={2}
            component='div'
          >
            <ButtonToSearch>
              <StyleSearchIcon />
            </ButtonToSearch>
          </Grid>
        </FormGrid>
      </ContainerBoxSearch>
      <ContainerTable>
        <TableRoot />
      </ContainerTable>
    </Box>
  )
}
