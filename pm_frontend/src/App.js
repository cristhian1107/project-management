// React router dom
import { Routes, Route, Navigate } from 'react-router-dom';
// Custom hooks
import useUser from 'hooks/useUser';
// Routes
import SignIn from 'layouts/authentication/sign-in'

function App() {
  const { isLogged } = useUser();

  return (
    <>
      {isLogged ? (
        <h1>Dashboard</h1>
      ) : (
        <>
        <Routes>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='*' element={<Navigate to='/sign-in' />} />
        </Routes></>
      )}
    </>
  );
}

export default App;
