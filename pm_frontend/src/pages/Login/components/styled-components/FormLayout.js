import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export function FormCard (props) {
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
      {...props}
    />
  );
}

export function CardHeader (props) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: 'fit-content',
        position: 'relative',
      }}
      {...props}
    />
  );
}

export function AvatarStyled (props) {
  return (
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
      {...props}
    />
  );
}

export function LockIconStyled (props) {
  return (
    <LockOutlinedIcon
      sx={{
        width: 40,
        height: 40,
        color: 'var(--btn-primary)',
      }}
      {...props}
    />
  )
}
