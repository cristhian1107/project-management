// React router dom
import { NavLink } from 'react-router-dom';
// @mui
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export default function StylesNavItem ({ route, icon, name }) {
  return (
    <ListItem
      disablePadding
      sx={{
        borderRadius: 1,
        overflow: 'hidden',
        color: 'white',
        '&:hover': { background: 'rgba(255, 255, 255, 0.2)' }
      }}
    >
      <NavLink
        to={route}
        className={({ isActive }) => isActive ? 'is-active' : undefined}
      >
        <ListItemButton>
          <ListItemIcon sx={{ color: 'white' }}>
            {icon}
          </ListItemIcon>
          <ListItemText primary={name} />
        </ListItemButton>
      </NavLink>
    </ListItem>
  );
}
