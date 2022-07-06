import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useBackend } from 'hooks/useBackend';
import CardState from 'pages/dashboard/CardState';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { es } from 'date-fns/locale';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';
import Graphic from 'pages/dashboard/Graphic';
import RadarStatus from 'pages/dashboard/RadarStatus';
import Area from 'pages/dashboard/Area';
import ProgressiveLine from 'pages/dashboard/ProgressiveLine';
// import PolarArea from 'pages/dashboard/PolarArea';

export default function Dashboard () {
  const [dashboard, setDashboard] = useState([]);
  const { getDashboard } = useBackend();
  const [value, setValue] = useState(new Date());
  const filters = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1
  };

  useEffect(() => {
    getDashboard(filters).then(setDashboard);
  }, [getDashboard]);

  const handleDate = (newDate) => {
    filters.year = newDate.getFullYear();
    filters.month = newDate.getMonth() + 1;
    getDashboard(filters).then(setDashboard);
  };

  return (
    <Box>
      <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "end", flexWrap: "wrap"}}>
        <h1> Dashboard </h1>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>

            <DatePicker
              views={['year', 'month']}
              label='Año y mes'
              minDate={new Date('2022-01-02')}
              maxDate={new Date()}
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
                handleDate(newValue);
              }}
              renderInput={(params) => <TextField
                {...params} helperText={null}
                sx={{
                  display: 'flex',
                  width: {xs:"100%", sm:'300px'},
                  justifyContent: 'end'
                }}
              />}
            />
        </LocalizationProvider>
      </Box>
      <Grid
        container
        sx={{
          gap: 2,
          width: '100%',
          justifyContent: 'space-between'
        }}
      >
        {
          dashboard[0] && dashboard[0].map((obj) => (
            <CardState
              key={obj.name_sta}
              {...obj}
            />
          ))
        }
      </Grid>
      <Grid container>
        {
          dashboard[1] && <Graphic dashboard={dashboard[1]} />
        }
        {
         dashboard[2] && <RadarStatus dashboard={dashboard[2]} />
        }
      </Grid>
      <Grid container>
        {
          dashboard[3] && <Area dashboard={dashboard[3]} />
        }
      </Grid>
      <Grid container>
        {
          dashboard[4] && <ProgressiveLine dashboard={dashboard[4]} company='AUTRISA' />
        }
      </Grid>
      <Grid container>
        {
          dashboard[5] && <ProgressiveLine dashboard={dashboard[5]} company='INCAMOTORS' />
        }
      </Grid>
      <Grid container>
        {
          dashboard[6] && <ProgressiveLine dashboard={dashboard[6]} company='NOVA AUTOS' />
        }
      </Grid>
    </Box>
  );
}
