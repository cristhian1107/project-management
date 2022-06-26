import { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useBackend } from 'hooks/useBackend';
import CardState from 'pages/dashboard/CardState';
import Graphic from 'pages/dashboard/Graphic';
import ViewDatePicker from 'pages/dashboard/ViewDatePicker';
import { flexbox } from '@mui/system';

export default function Dashboard() {
  const [dashboard, setDashboard] = useState([]);
  const { getDashboard } = useBackend();
  const filters = {year:2022, month:6}

  useEffect(() => {
   getDashboard(filters).then(setDashboard);
  }, [getDashboard]);
  
  const sasboard = [
    {
        bussines: "Autrisa",
        number_sol: 1,
        number_req: 2,
        number_pro: 3,  
        color: "red",
    },
    {
        bussines: "NovaAutos",
        number_sol: 4,
        number_req: 5,
        number_pro: 6,  
        color: "blue",
    },
    {
        bussines: "IncaMotors",
        number_sol: 7,
        number_req: 8,
        number_pro: 9,  
        color: "black",
    },
  ]

  return (
    <Box>
      <h1>
        Dashboard
        <ViewDatePicker/>
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
          <Graphic dashboard={sasboard}/>
        }
      </Grid>
    </Box>
  );
}

