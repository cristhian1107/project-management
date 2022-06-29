// React router dom
import { Outlet } from 'react-router-dom';
// @mui
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
// Utils and parts of the component
import { drawerWidth } from 'components/common/utils';
import LeftDrawer from 'components/common/Drawer';
import CustomAppBar from 'components/common/AppBar';
import DrawerType from 'components/common/SideNav/DrawerType';

export default function SideNav () {

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <CustomAppBar />
      <Box
        component="nav"
        sx={{
          width: { lg: drawerWidth },
          flexShrink: { lg: 0 },
        }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <DrawerType typeOfDrawer='temporary'>
          <LeftDrawer />
        </DrawerType>
        <DrawerType typeOfDrawer='permament'>
          <LeftDrawer />
        </DrawerType>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 1, sm: 3, lg: 5 },
          width: { md: `calc(100% - ${drawerWidth}px)` },
          overflowX: 'hidden',
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
