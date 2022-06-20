// React core
import { useEffect } from 'react';
// React router dom
import { useNavigate } from 'react-router-dom';
// My Components
import BasicLayout from 'layouts/authentication/sign-in/basicLayout';
import FormLayout from 'layouts/authentication/components/formLayout';
// Styles @mui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
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
        <Grid
          container
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 6, gap: 2, maxWidth: '400px' }}
        >
          <TextField
            required
            fullWidth
            id="username"
            name="username"
            type="text"
            autoFocus
            label='Username'
            variant='outlined'
            sx={{
              fontWeight: 'bold',
              '& div': {
                background: 'rgba(120,120,120, .5)',
                borderRadius: 50,
                color: '#fff',
              },
              '& label': {
                color: '#fff8 !important',
                fontWeight: 'bold',
              }
            }}
          />
          <TextField
            required
            fullWidth
            id="password"
            name="password"
            type="password"
            label='Password'
            variant='outlined'
            sx={{
              fontWeight: 'bold',
              '& div': {
                background: 'rgba(120,120,120, .5)',
                borderRadius: 50,
                color: '#fff',
              },
              '& label': {
                color: '#fff8 !important',
                fontWeight: 'bold',
              }
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              background: 'var(--btn-gradient)',
              fontWeight: 'bold',
              textTransform: 'none',
              borderRadius: 50,
              letterSpacing: 1,
              fontSize: '1.1rem',
            }}
          >
            Log In
          </Button>
        </Grid>
      </FormLayout>
    </BasicLayout>
  );
}
