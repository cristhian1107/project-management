import { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useBackend } from 'hooks/useBackend';
import CardState from 'pages/dashboard/CardState';

export default function Dashboard() {
  // const [dashboard, setDashboard] = useState([]);
  // const { getDashboard } = useBackend();
  
  // useEffect(() => {
  //  getDashboard().then(setDashboard);
  // }, [getDashboard]);
  
  const sashboard = [[{
    "state": "Solicitado",
    "number": 10,
    "total": 50,
  },
  {
    "state": "Solicitado",
    "number": 10,
    "total": 50,
  },
  {
    "state": "Solicitado",
    "number": 10,
    "total": 50,
  },
  {
    "state": "Solicitado",
    "number": 10,
    "total": 50,
  },
  {
    "state": "Solicitado",
    "number": 10,
    "total": 50,
  },
  {
    "state": "Solicitado",
    "number": 10,
    "total": 50,
  },
  {
    "state": "Solicitado",
    "number": 10,
    "total": 50,
  },
  {
    "state": "Solicitado",
    "number": 10,
    "total": 50,
  },
  {
    "state": "Solicitado",
    "number": 10,
    "total": 50,
  }
]]

  return (
    <Box>
      <Grid container
      sx={{
        gap: 2,
        width: "100%",

      }}>
        {
          sashboard[0].map((obj) => (
          <CardState
            {...obj}
            />
          ))
        }
      </Grid>
    </Box>
  );
}

