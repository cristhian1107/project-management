import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomAlert from 'components/Alert';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import BasicLayout from 'pages/Login/BasicLayout';
import FormLayout from 'pages/Login/components/FormLayout';
import useUser from 'hooks/useUser';
import { LoadingButton } from 'components/Loading';

export default function Login () {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isLogged, login } = useUser();

  useEffect(() => {
    if (isLogged) navigate('/dashboard', {replace: true});
  }, [isLogged, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);
    setLoading(true);
    const data = new FormData(e.currentTarget);
    const username = data.get('username');
    const password = data.get('password');
    login({username, password}).then((res) => {
      if (res !== 'Success')
        setError(res);
      setLoading(false);
    });
  };

  return (
    <BasicLayout>
      <FormLayout titleForm='Sign In'>
        <Grid
          container
          component="form"
          onSubmit={handleSubmit}
          sx={{
            mt: 4,
            px: { xs: 2, sm: 4 },
            gap: 2,
          }}
          autoComplete='off'
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
                borderRadius: 50,
              },
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
                borderRadius: 50,
              },
            }}
          />
          {
            !loading ? (
              <Button
                id='btn-login'
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 4,
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
            ) : (
              <Box
                sx={{
                  mt: 4,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <LoadingButton />
              </Box>
            )
          }
        </Grid>
      </FormLayout>
      {error && (
        <CustomAlert
          severity='error'
          open={Boolean(error)}
          setOpen={setError}
          time={300}
          sx={{
            background: '#f55',
            mt: 2,
            mx: 'auto',
            borderRadius: 4,
            maxWidth: '450px',
          }}
        >
          {error}
        </CustomAlert>
      )}
    </BasicLayout>
  );
}
