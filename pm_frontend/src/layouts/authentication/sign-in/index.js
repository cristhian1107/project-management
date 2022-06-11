// React core
import { useEffect } from 'react';
// React router dom
import { useNavigate } from 'react-router-dom';
// My Components
import BasicLayout from 'layouts/authentication/sign-in/basicLayout';
import FormLayout from 'layouts/authentication/components/formLayout';
// Styles @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
// Custom hooks
import useUser from 'hooks/useUser';

export default function SignIn () {
  const navigate = useNavigate();
  const { isLogged, login } = useUser();

  useEffect(() => {
    if (isLogged) navigate('/dashboard', {replace: true});
  }, [isLogged, navigate]);

  function handleSubmit (e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const username = data.get('username');
    const password = data.get('password');
    login({username, password});
  };

  return (
    <BasicLayout>
      <FormLayout titleForm='Sign In'>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            type="text"
            autoFocus
            autoComplete="off"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            autoComplete="off"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              background: 'var(--btn-gradient)',
            }}
          >
            Sign In
          </Button>
        </Box>
      </FormLayout>
    </BasicLayout>
  );
}
