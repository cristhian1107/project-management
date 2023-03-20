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
  const [states, setStates] = useState([])
  const [color, setColor] = useState(Array(8).fill(false))

  useEffect(() => {
    getEvents().then(setStates);
  }, [getEvents]);

  useEffect(() => {
    if (localFilters.length > 0) { setListShow(() => listRequests.filter(record => localFilters.includes(record.code_sta))); }
    if (localFilters.length === 0) { setListShow(listRequests); }
  }, [localFilters, listRequests, setListShow]);

  const handleLocalFilters = (item) => {
    if (localFilters.includes(item.code)) {
      setLocalFilters(list => list.filter(elm => elm !== item.code));
      setColor((cl) => cl.map((elm, idx) => idx === item.code - 1 ? !elm : elm))
    } else {
      setLocalFilters(list => [...list, item.code]);
      setColor((cl) => cl.map((elm, idx) => idx === item.code - 1 ? !elm : elm))
    }
  }
  const handleTotalButtom = () => {
    setLocalFilters([]);
    setColor(Array(9).fill(false));
  }
  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if(result){
        const r= parseInt(result[1], 16);
        const g= parseInt(result[2], 16);
        const b= parseInt(result[3], 16);
        return [r, g, b];//return 23,14,45 -> reformat if needed 
    } 
    return null;
  }
  return (
    <Box sx={{ ...css }}>
      <ContainerFilters>
        <LabelTypography>
          Filtrar por estado:
        </LabelTypography>
        <ListFilters>
          <Button
            onClick={handleTotalButtom}
          >
            Todos
          </Button>
          {
            states && states.map((state) => {
              return (
                <ItemToFilter
                  onClick={() => handleLocalFilters(state)}
                  colorBorder={state.description}
                  key={state.alias}
                  BG={color[state.code - 1] ? hexToRgb(state.description) : false}
                >
                  {state.name}
                </ItemToFilter>
              );
            })
          }
        </ListFilters>
      </ContainerFilters>
      <ContainerTable>
        <TableRoot />
      </ContainerTable>
    </Box>
  );
}
