// Styles @mui 
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
// Images
import bgImage from 'assets/images/back.jpeg';

export default function BasicLayout({children}) {

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          // backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        sx={{
          backgroundColor: (t) =>
          t.palette.mode === 'light' ? 'var(--bg-white)' : t.palette.grey[900],
          pt: 8,
        }}
      >
        {children}
      </Grid>
    </Grid>
  );
}
