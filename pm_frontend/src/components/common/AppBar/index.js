import { useLocation, useNavigate } from 'react-router-dom';
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
import NotificationIcon from '@mui/icons-material/Notifications';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDrawer } from 'redux/states'; // Actions of the global state
import { drawerWidth } from 'components/common/utils';
import bgImage from 'assets/images/back.jpeg';

export default function CustomAppBar () {
  const navigate = useNavigate();
  const drawerState = useSelector(state => state.drawer);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const stringAvatar = (name) => {
    return {
      src: `${bgImage}`,
      children: name.split(' ').map(e => e[0]).join(''),
      sx: { fontWeight: 'bold' },
      alt: name,
      title: name
    };
  };

  return (
    <AppBar
      position='fixed'
      sx={{
        width: { xs: 'calc(100% - 16px)', lg: `calc(100% - ${drawerWidth}px - 24px)` },
        ml: { lg: `calc(${drawerWidth}px)` },
        boxShadow: 'none',
        m: 1,
        background: '#fff',
        borderRadius: 2
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          color: 'rgb(66, 66, 74)'
        }}
        >
          <IconButton
            onClick={() => navigate('/dashboard')}
            edge='start'
            sx={{ color: 'inherit' }}
          >
            <HomeIcon />
          </IconButton>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{
              textTransform: 'capitalize',
              fontSize: { xs: '1rem', sm: '1.25rem' }
            }}
          >
            {pathname}
          </Typography>
        </Box>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          color: 'rgb(66, 66, 74)'
        }}
        >
          <IconButton sx={{
            color: 'inherit'
          }}
          >
            <WidgetIcon />
          </IconButton>
          <IconButton
            edge='start'
            sx={{ color: 'inherit' }}
          >
            <NotificationIcon />
          </IconButton>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={() => dispatch(toggleDrawer())}
            sx={{ display: { lg: 'none' } }}
          >
            {drawerState.open ? <MenuIcon /> : <MenuOpenIcon />}
          </IconButton>
          <Avatar
            {...stringAvatar('Product Manager')}
            sx={{ display: 'block', width: { xs: '30px' }, height: { xs: '30px' } }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
