// Styles @mui 
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

export default function FormLayout ({ titleForm, children }) {

  return (
    <Box
      sx={{
        mt: 8,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, background: 'var(--btn-gradient)' }}>
        <LockOutlinedIcon/>
      </Avatar>
      <Typography component="h1" variant="h5">
        { titleForm ? titleForm : 'Sign in' }
      </Typography>
      {children}
    </Box>
  );
}
