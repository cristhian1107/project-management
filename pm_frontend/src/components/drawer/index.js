// React router dom
import { NavLink } from 'react-router-dom';
// @mui
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
// Utils of the component
import { links } from 'components/utils';
// Custom Hooks
import useUser  from 'hooks/useUser';

export default function LeftDrawer () {
  const { logout } = useUser();

  return (
    <Box
      sx={{
        px: 1,
        height: '100vh',
        backgroundColor: 'transparent',
        background: 'linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))',
      }}
    >
      <Toolbar sx={{justifyContent: 'center'}}>
        <Typography
          variant="h5"
          noWrap
          component="div"
          sx={{
            color: 'white',
            letterSpacing: 4,
            fontWeight: 'bold',
          }}>
          Autrisa
        </Typography>
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
      <List sx={{ display: 'flex', flexDirection: 'column' }}>
        {links.map((link) => (
          <ListItem
            key={link.key}
            disablePadding
            sx={{
              color: 'white',
              '&:hover': {background: 'rgba(255, 255, 255, 0.2)'},
            }}
          >
            <NavLink
              to={link.route}
              className={({isActive}) => 
                  isActive ? 'is-active' : undefined
              }
            >
              <ListItemButton>
                <ListItemIcon
                  sx={{color: 'white'}}
                >
                  {link.icon}
                </ListItemIcon>
                <ListItemText primary={link.name} />
              </ListItemButton>
            </NavLink>
          </ListItem>
        ))}
        <ListItem
          key='logout'
          disablePadding
          sx={{
            color: 'white',
            '&:hover': {background: 'rgba(255, 255, 255, 0.2)'},
          }}
          onClick={ () => logout() }
        >
          <ListItemButton>
            <ListItemIcon
              sx={{color: 'white'}}
            >
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary='Log Out' />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
