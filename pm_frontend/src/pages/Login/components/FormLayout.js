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
        py: 4,
        mx: 'auto',
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 450,
        background: '#fff',
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
              color: 'var(--btn-primary)',
            }}
          />
        </Avatar>
      </Box>
      {children}
    </Box>
  );
}
