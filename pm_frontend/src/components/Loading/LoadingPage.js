import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export function LoadingPage () {
  return (
    <Box
      sx={{
        overflow: 'hidden',
        background: 'var(--box-primary)',
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        color: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1.5rem',
        gap: 2
      }}
    >
      Cargando
      <CircularProgress disableShrink />
    </Box>
  );
}
