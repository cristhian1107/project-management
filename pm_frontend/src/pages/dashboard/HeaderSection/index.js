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
  }, [getDashboard]);
  
  const handleDate = (newDate) => {
    filters.year = newDate.getFullYear();
    filters.month = newDate.getMonth() + 1;
    getDashboard(filters).then(setDashboard);
  };
  

  const sashboard = [
    {
        company: "AUTRISA",
        "Solicitado": 1,
        "Confirmado": 2,
        "Aprobado": 3,
 //       "Definido": 3,
        "En Proceso": 3,
        "Culminado": 4,
        "Rechazado": 3,
        "Cancelado": 3,
        "Pausado": 4
    },
    {
        company: "INKAMOTORS",
        "Solicitado": 5,
        "Confirmado": 6,
        "Aprobado": 6,
  //      "Definido": 7,
        "En Proceso": 7,
        "Culminado": 6,
        "Rechazado": 7,
        "Cancelado": 6,
        "Pausado": 4
    },
    {
        company: "NOVAAUTOS",
        "Solicitado": 3,
        "Confirmado": 2,
        "Aprobado": 2,
   //     "Definido": 2,
        "En Proceso": 2,
        "Culminado": 2,
        "Rechazado": 2,
        "Cancelado": 2,
        "Pausado": 2
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
         sashboard && <RadarStatus dashboard={sashboard}/>
        }
      </Grid>
    </Box>
  );
}
