// Styles @mui 
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
// Images
// import bgImage from 'assets/images/back.jpeg';
import bgImage from 'assets/images/bgWindow.jpeg';

export default function BasicLayout({children}) {

  return (
    <Grid
      container component="main"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        background: `url(${bgImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '100vw 100%',
        backgroundAttachment: 'fixed',
        justifyContent: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: '#000a',
          backdropFilter: 'blur(10px)',
        }
      }}
    >
      <CssBaseline />
      <Grid
        item
        elevation={6}
        xs={12}
        sm={6}
        sx={{
          position: 'relative',
          boxShadow: 'none',
          pt: { xs: 2, sm: 8 },
          px: 2,
        }}
      >
        {children}
      </Grid>
    </Grid>
  );
}
