import { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FiltersContext from 'context/FiltersContext';
import { useBackend } from 'hooks/useBackend';
import TableRoot from 'pages/Solicitudes/components/TableSection/TableRoot';
import Button from 'components/button';
import {
  ContainerFilters, LabelTypography, ListFilters, ItemToFilter,
  ContainerBoxSearch, FormGrid, ButtonToSearch, StyleSearchIcon,
  BoxInput, ContainerTable
} from './styled-components';

export default function TableSection ({ css }) {
  const { setListShow, listRequests, localFilters, setLocalFilters } = useContext(FiltersContext);
  const { getEvents } = useBackend();
  const [states, setStates] = useState([]);

  useEffect(() => {
    getEvents().then(setStates);
  }, [getEvents]);

  useEffect(() => {
    if (localFilters.length > 0) { setListShow(() => listRequests.filter(record => localFilters.includes(record.code_sta))); }
    if (localFilters.length === 0) { setListShow(listRequests); }
  }, [localFilters, listRequests, setListShow]);

  const handleLocalFilters = (item) => {
    if (localFilters.includes(item.code)) { setLocalFilters(list => list.filter(elm => elm !== item.code)); } else { setLocalFilters(list => [...list, item.code]); }
  };

  return (
    <Box sx={{ ...css }}>
      <ContainerFilters>
        <LabelTypography>
          Filtrar por estado:
        </LabelTypography>
        <ListFilters>
          <Button
            onClick={() => setLocalFilters([])}
          >
            Todos
          </Button>
          {
            states.map((state) => {
              return (
                <ItemToFilter
                  onClick={() => handleLocalFilters(state)}
                  colorBorder={state.description}
                  key={state.alias}
                >
                  {state.name}
                </ItemToFilter>
              );
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
  );
}
