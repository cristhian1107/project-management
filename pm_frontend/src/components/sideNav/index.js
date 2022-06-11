// React core
import { useContext } from 'react';
// React router dom
import { Outlet } from 'react-router-dom';
// @mui
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
// Utils and parts of the component
import { drawerWidth } from 'components/utils';
import LeftDrawer from 'components/drawer';
import CustomAppBar from 'components/appBar';
// Context
import HandleDrawer from 'context/DrawerContext';

export default function SideNav () {
  const {open, setOpen} = useContext(HandleDrawer);

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
        <Drawer
          variant="temporary"
          open={open}
          onClose={() => setOpen(!open)}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            backgroundColor: {paper: 'transparent'},
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <LeftDrawer/>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            backgroundColor: {paper: 'transparent'},
            display: { xs: 'none', lg: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          <LeftDrawer/>
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
