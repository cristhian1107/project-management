import { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useBackend } from 'hooks/useBackend';
import CardState from 'pages/dashboard/CardState';

export default function Dashboard() {
  const [dashboard, setDashboard] = useState([]);
  const { getDashboard } = useBackend();
  const filters = {year:2022, month:6}
  useEffect(() => {
   getDashboard(filters).then(setDashboard);
  }, [getDashboard]);
  
  return (
    <Box>
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
    </Box>
  );
}

