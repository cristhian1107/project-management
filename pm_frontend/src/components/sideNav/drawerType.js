// @mui
import Drawer from '@mui/material/Drawer';
// Utils and parts of the component
import { drawerWidth } from 'components/utils';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { toggleDrawer } from 'redux/states';

export default function DrawerType ({ typeOfDrawer, children }) {
  const drawerState = useSelector(state => state.drawer);
  const dispatch = useDispatch();

  return (
    <>
      {
        typeOfDrawer === 'temporary' ? (
          <Drawer
            variant="temporary"
            open={drawerState.open}
            onClose={() => dispatch(toggleDrawer())}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', lg: 'none' },
              '& .MuiDrawer-paper': {
                minHeight: 'min-content',
                borderRadius: 2,
                my: 1,
                mx: 1,
                height: 'calc(100% - 16px)',
                boxSizing: 'border-box',
                width: drawerWidth,
                background: 'linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))',
                boxShadow: 'none',
              },
            }}
          >
            {children}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            open
            sx={{
              display: { xs: 'none', lg: 'block' },
              '& .MuiDrawer-paper': {
                minHeight: 'min-content',
                borderRadius: 2,
                my: 1,
                mx: 1,
                height: 'calc(100% - 16px)',
                boxSizing: 'border-box',
                width: drawerWidth,
                background: 'linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))',
                boxShadow: 'none',
              },
            }}
          >
            {children}
          </Drawer>
        )
      }
    </>
  );
}
