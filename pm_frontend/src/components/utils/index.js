// icons from @mui
import DashboardIcon from '@mui/icons-material/Dashboard';
import ProfileIcon from '@mui/icons-material/AccountCircle';
import TablesIcon from '@mui/icons-material/BackupTable';
import ProjectsIcon from '@mui/icons-material/AssignmentTurnedIn';


const links = [
  {
    name: 'Dashboard',
    route: '/dashboard',
    key: 'dashboard',
    icon: <DashboardIcon />
  },
  {
    name: 'Solicitudes',
    route: '/solicitudes',
    key: 'solicitudes',
    icon: <ProjectsIcon />
  },
  {
    name: 'Tables',
    route: '/tables',
    key: 'tables',
    icon: <TablesIcon />
  },
  {
    name: 'Profile',
    route: '/profile',
    key: 'profile',
    icon: <ProfileIcon />
  }
]

const drawerWidth = 240;

export { links, drawerWidth };
