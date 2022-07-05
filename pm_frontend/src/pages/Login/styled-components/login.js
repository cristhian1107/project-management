import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CustomAlert from 'components/Alert';

export function FormContainer (props) {
  return (
    <Grid
      sx={{
        mt: 4,
        px: { xs: 2, sm: 4 },
        gap: 2
      }}
      {...props}
    />
  );
}

export function FormField (props) {
  return (
    <TextField
      sx={{
        fontWeight: 'bold',
        '& div': {
          borderRadius: 50
        }
      }}
      {...props}
    />
  );
}

export function SubmitButton (props) {
  return (
    <Button
      sx={{
        mt: 4,
        background: 'var(--btn-gradient)',
        fontWeight: 'bold',
        textTransform: 'none',
        borderRadius: 50,
        letterSpacing: 1,
        fontSize: '1.1rem'
      }}
      {...props}
    />
  );
}

export function SnipperContainer (props) {
  return (
    <Box
      sx={{
        mt: 4,
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
      }}
      {...props}
    />
  );
}

export function Alert (props) {
  return (
    <CustomAlert
      sx={{
        background: '#f55',
        mt: 2,
        mx: 'auto',
        borderRadius: 4,
        maxWidth: '450px'
      }}
      {...props}
    />
  );
}
