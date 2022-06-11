// React core
import { useContext } from 'react';
// React router dom
import { useLocation } from 'react-router-dom';
// @mui
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import HomeIcon from '@mui/icons-material/Home';
import WidgetIcon from '@mui/icons-material/Widgets';
import NotificationIcon from '@mui/icons-material/Notifications'
// Context
import HandleDrawer from 'context/DrawerContext';
// Utils
import { drawerWidth } from 'components/utils';
// Image
import bgImage from 'assets/images/back.jpeg';

export default function CustomAppBar () {
  const {open, setOpen} = useContext(HandleDrawer);
  const {pathname} = useLocation();

  const stringAvatar = (name) => {
    return {
      'src': `${bgImage}`,
      'children': name.split(" ").map(e => e[0]).join(""),
      'sx': {fontWeight: 'bold'},
      'alt': name,
      'title': name
    };
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { xs: `calc(100% - 16px)`, lg: `calc(100% - ${drawerWidth}px - 16px)` },
        ml: { lg: `calc(${drawerWidth}px)` },
        boxShadow: 'none',
        m: 1,
        background: '#fff',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          color: 'rgb(66, 66, 74)',
        }}
        >
          <IconButton edge="start" sx={{color: 'inherit'}}>
            <HomeIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ textTransform: 'capitalize', fontSize: {xs: '1rem', sm: '1.25rem' }}}
          >
            {pathname}
          </Typography>
        </Box>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          color: 'rgb(66, 66, 74)',
          justifyContent: 'space-between',
        }}
        >
          <IconButton sx={{
            color: 'inherit',
          }}>
            <WidgetIcon />
          </IconButton>
          <IconButton
            edge="start"
            sx={{ color: 'inherit' }}
          >
            <NotificationIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setOpen(!open)}
            sx={{ display: { lg: 'none' } }}
          >
            {open ? <MenuOpenIcon />: <MenuIcon />}
          </IconButton>
          <Avatar
            {...stringAvatar('Product Manager')}
            sx={{ display: 'block', width: {xs: '30px'}, height: {xs: '30px'}}}
          />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
