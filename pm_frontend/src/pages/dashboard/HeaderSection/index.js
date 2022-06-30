import { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useBackend } from 'hooks/useBackend';
import CardState from 'pages/dashboard/CardState';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { es } from "date-fns/locale";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';
import Graphic from 'pages/dashboard/Graphic';
import RadarStatus from 'pages/dashboard/RadarStatus';
import Area from 'pages/dashboard/Area';
import PolarArea from 'pages/dashboard/PolarArea';
import ProgressiveLine from 'pages/dashboard/ProgressiveLine';

export default function Dashboard() {
  const [dashboard, setDashboard] = useState([]);
  const { getDashboard } = useBackend();
  const [value, setValue] = useState(new Date());
  let filters = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  }

  useEffect(() => {
   getDashboard(filters).then(setDashboard);
   console.log(dashboard)
  }, [getDashboard]);
  
  const handleDate = (newDate) => {
    filters.year = newDate.getFullYear();
    filters.month = newDate.getMonth() + 1;
    getDashboard(filters).then(setDashboard);
  };

  const sashboard = [
    {
        "day": 1,
        "Solicitado": 5,
        "Confirmado": 2,
        "Aprobado": 3,
        "Definido": 3,
        "En Proceso": 3,
        "Culminado": 7,
        "Rechazado": 3,
        "Cancelado": 5,
        "Pausado": 4
    },
    {
        "day": 2,
        "Solicitado": 3,
        "Confirmado": 2,
        "Aprobado": 3,
        "Definido": 3,
        "En Proceso": 3,
        "Culminado": 7,
        "Rechazado": 3,
        "Cancelado": 5,
        "Pausado": 4
    },
    {
        "day": 3,
        "Solicitado": 4,
        "Confirmado": 2,
        "Aprobado": 3,
        "Definido": 3,
        "En Proceso": 3,
        "Culminado": 7,
        "Rechazado": 3,
        "Cancelado": 5,
        "Pausado": 4
    },
    {
        "day": 4,
        "Solicitado": 1,
        "Confirmado": 2,
        "Aprobado": 3,
        "Definido": 3,
        "En Proceso": 3,
        "Culminado": 7,
        "Rechazado": 3,
        "Cancelado": 5,
        "Pausado": 4
    },
    {
        "day": 6,
        "Solicitado": 9,
        "Confirmado": 2,
        "Aprobado": 3,
        "Definido": 3,
        "En Proceso": 3,
        "Culminado": 7,
        "Rechazado": 3,
        "Cancelado": 5,
        "Pausado": 4
    },
    {
        "day": 7,
        "Solicitado": 9,
        "Confirmado": 2,
        "Aprobado": 3,
        "Definido": 3,
        "En Proceso": 3,
        "Culminado": 7,
        "Rechazado": 3,
        "Cancelado": 5,
        "Pausado": 4
    },
    {
        "day": 8,
        "Solicitado": 9,
        "Confirmado": 2,
        "Aprobado": 3,
        "Definido": 3,
        "En Proceso": 3,
        "Culminado": 7,
        "Rechazado": 3,
        "Cancelado": 5,
        "Pausado": 4
    },
    {
        "day": 9,
        "Solicitado": 9,
        "Confirmado": 2,
        "Aprobado": 3,
        "Definido": 3,
        "En Proceso": 3,
        "Culminado": 7,
        "Rechazado": 3,
        "Cancelado": 5,
        "Pausado": 4
    },
    {
        "day": 10,
        "Solicitado": 2,
        "Confirmado": 2,
        "Aprobado": 3,
        "Definido": 3,
        "En Proceso": 3,
        "Culminado": 7,
        "Rechazado": 3,
        "Cancelado": 5,
        "Pausado": 4
    },
    {
        "day": 11,
        "Solicitado": 9,
        "Confirmado": 2,
        "Aprobado": 3,
        "Definido": 3,
        "En Proceso": 3,
        "Culminado": 7,
        "Rechazado": 3,
        "Cancelado": 5,
        "Pausado": 4
    },
    {
        "day": 15,
        "Solicitado": 9,
        "Confirmado": 2,
        "Aprobado": 3,
        "Definido": 3,
        "En Proceso": 3,
        "Culminado": 7,
        "Rechazado": 3,
        "Cancelado": 5,
        "Pausado": 4
    }
]

  return (
    <Box>
      <h1> Dashboard
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
          <Stack spacing={3}
            sx={{
              display: "flex",
              alignItems: "end",
            }}
          >
            <DatePicker
              views={['year', 'month']}
              label="Año y mes"
              minDate={new Date('2022-01-02')}
              maxDate={new Date()}
              value={value}
              onChange = {(newValue) => {
                setValue(newValue);
                handleDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} helperText={null}
              sx={{
                display: "flex",
                width: "300px",
                justifyContent: "end"
              }}
              />}
           />
          </Stack>
        </LocalizationProvider>
      </h1>
      <Grid container
      sx={{
        gap: 2,
        width: "100%",
      }}>
        {
          dashboard[0] && dashboard[0].map((obj) => (
          <CardState
            {...obj}
            />
          ))
        }
      </Grid>
      <Grid container>
        {
          dashboard[1] && <Graphic dashboard={dashboard[1]}/>
        }
        {
         dashboard[2] && <RadarStatus dashboard={dashboard[2]}/>
        }
      </Grid>
      <Grid container>
        {
          dashboard[3] && <Area dashboard={dashboard[3]}/>
        }
      </Grid>
      <Grid container>
        {
          dashboard[4] && <ProgressiveLine dashboard={dashboard[4]} company="Autrisa"/>
        }
      </Grid>
      <Grid container>
        {
          dashboard[5] && <ProgressiveLine dashboard={dashboard[5]} company="Inka Motors"/>
        }
      </Grid>
      <Grid container>
        {
          dashboard[6] && <ProgressiveLine dashboard={dashboard[6]} company="Nova Autos"/>
        }
      </Grid>
    </Box>
  );
}
