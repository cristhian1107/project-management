import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// icons from @mui
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

function ResponsiveDrawer() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      m={2}
      sx={{
        borderRadius: 4,
        px: 1,
        height: '100vh',
        backgroundColor: 'transparent',
        background: 'linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))',
      }}
    >
      <Toolbar />
      <Divider
        sx={{
          flexShrink: '0',
          borderTop: '0px solid rgba(0, 0, 0, 0.08)',
          borderRight: '0px solid rgba(0, 0, 0, 0.08)',
          borderLeft: '0px solid rgba(0, 0, 0, 0.08)',
          height: '0.0625rem',
          margin: '1rem 0px',
          borderBottom: 'none',
          opacity: '0.25',
          background: `
            linear-gradient(to right, rgba(255, 255, 255, 0),
            rgb(255, 255, 255),
            rgba(255, 255, 255, 0))
          `,
        }}
      />
      <List>
        {['Dashboard', 'Tables', 'Notifications', 'Profile'].map((text) => (
          <ListItem
            key={text}
            disablePadding
            sx={{
              color: 'white',
              '&:hover': {background: 'rgba(255, 255, 255, 0.2)'},
            }}
          >
            <ListItemButton>
              <ListItemIcon
                sx={{color: 'white'}}
              >
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            backgroundColor: {paper: 'transparent'},
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            backgroundColor: {paper: 'transparent'},
            backgroundColor: 'transparent',
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <h1>Hello world</h1>
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;

