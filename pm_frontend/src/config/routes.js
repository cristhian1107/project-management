import Login from 'pages/Login';
import Solicitudes from 'pages/Solicitudes';
import Dashboard from 'pages/dashboard';
import Tables from 'pages/tables';
import Profile from 'pages/profile';
import Tasks from 'pages/Tasks';


const routes = {
  publics: [
    {
      path: '/login',
      key: 'login',
      component: <Login />
    }
  ],
  privates: [
    {
      path: '/dashboard',
      key: 'dashboard',
      component: <Dashboard />
    },
    {
      path: '/solicitudes',
      key: 'solicitudes',
      component: <Solicitudes />
    },
    {
      path: '/tareas',
      key: 'tareas',
      component: <Tasks />
    },
    {
      path: '/tables',
      key: 'tables',
      component: <Tables />
    },
    {
      path: '/profile',
      key: 'profile',
      component: <Profile />
    }
  ]
};

export { routes };
