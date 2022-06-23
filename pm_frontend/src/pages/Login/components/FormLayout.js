// Styles @mui 
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

export default function FormLayout ({ children }) {

  return (
    <Box
      sx={{
        mt: 10,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: 'fit-content',
          position: 'relative',
        }}
      >
        <Avatar
          sx={{
            m: 1,
            background: 'transparent',
            fontStyle: 'italic',
            border: '1px dashed var(--btn-primary)',
            width: 90,
            height: 90,
            fontSize: '1.7rem',
            fontWeight: 'bold',
          }}
        >
          <LockOutlinedIcon
            sx={{
              width: 40,
              height: 40,
              color: '#fff'
            }}
          />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          sx={{
            position: 'absolute',
            left: 85,
            fontStyle: 'italic',
            color: '#fff',
            letterSpacing: 4,
            fontSize: '1.5rem',
          }}
        >
          LogIn
        </Typography>
      </Box>
      {children}
    </Box>
  );
}
