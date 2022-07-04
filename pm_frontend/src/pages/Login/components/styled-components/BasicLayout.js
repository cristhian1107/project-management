import Grid from '@mui/material/Grid';
import bgImage from 'assets/images/bgWindow.jpeg';

export function LoginLayout (props) {
  return (
    <Grid
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
      {...props}
    />
  )
}

export function FormCardContainer (props) {
  return (
    <Grid
      sx={{
        position: 'relative',
        boxShadow: 'none',
        pt: { xs: 2, sm: 8 },
        px: 2,
      }}
      {...props}
    />
  )
}
