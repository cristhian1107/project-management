// @mui
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
// Custom Hooks
import useUser  from 'hooks/useUser';
// Redux
import { useDispatch } from 'react-redux';
import { handleDrawer } from 'redux/states';
// Image
import userImage from 'assets/images/back.jpeg';

export default function BasicLayout ({ children }) {
  const dispatch = useDispatch()
  const { logout } = useUser();

  function handleLogOut () {
    logout();
    dispatch(handleDrawer(false));
  }

  return (
    <Box
      sx={{
        borderRadius: 2,
        px: 1,
      }}
    >
      <Toolbar sx={{ display: 'inherit', p: 2 }}>
        <Box>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              mb: 2,
              color: 'white',
              letterSpacing: 4,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            GP Autrisa
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={userImage} sx={{ mr: 2 }}/>
          <Typography sx={{ color: '#FFF', }} component='div'>
            <Typography sx={{ letterSpacing: 2, fontWeight: 'bold' }}>
              Javier Pilco
            </Typography>
            <Typography sx={{ color: '#FFFc' }}>
              Gerente TI
            </Typography>
          </Typography>
        </Box>
      </Toolbar>
      <Divider
        sx={{
          flexShrink: '0',
          borderTop: '0px solid rgba(0, 0, 0, 0.08)',
          borderRight: '0px solid rgba(0, 0, 0, 0.08)',
          borderLeft: '0px solid rgba(0, 0, 0, 0.08)',
          height: '0.0625rem',
          margin: '1rem 0px',
          marginTop: '0',
          borderBottom: 'none',
          opacity: '0.25',
          background: `
            linear-gradient(to right, rgba(255, 255, 255, 0),
            rgb(255, 255, 255),
            rgba(255, 255, 255, 0))
          `,
        }}
      />
      <List sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {children}
        <ListItem
          key='logout'
          disablePadding
          sx={{
            color: 'white',
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
          }}
        >
          <ListItemButton onClick={handleLogOut}>
            <ListItemIcon sx={{ color: 'white' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary='Log Out'/>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
