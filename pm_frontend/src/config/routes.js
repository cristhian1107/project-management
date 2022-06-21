import Login from 'pages/Login';
import Solicitudes from 'pages/Solicitudes';
import Dashboard from 'pages/dashboard';
import Tables from 'pages/tables';
import Profile from 'pages/profile';

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
}

export { routes };
