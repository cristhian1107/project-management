import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BasicLayout, FormLayout } from 'pages/Login/components';
import { useUser } from 'hooks';
import { LoadingButton } from 'components/Loading';
import {
  FormContainer,
  FormField,
  SubmitButton,
  SnipperContainer,
  Alert
} from 'pages/Login/styled-components';

export default function Login () {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isLogged, login } = useUser();

  // Redirect user if logged in
  useEffect(() => {
    if (isLogged) navigate('/dashboard', { replace: true });
  }, [isLogged, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);
    setLoading(true);
    const data = new FormData(e.currentTarget);
    const username = data.get('username');
    const password = data.get('password');

    // Credential validation with the backend
    // If the credentials are incorrect, show alert
    login({ username, password }).then((res) => {
      if (res !== 'Success') { setError(res); }
      setLoading(false);
    });
  };

  return (
    <BasicLayout>
      <FormLayout titleForm='Sign In'>
        <FormContainer
          container
          component='form'
          onSubmit={handleSubmit}
          autoComplete='off'
        >
          <FormField
            required
            fullWidth
            id='username'
            name='username'
            type='text'
            autoFocus
            label='Username'
            variant='outlined'
          />
          <FormField
            required
            fullWidth
            id='password'
            name='password'
            type='password'
            label='Password'
            variant='outlined'
          />
          {!loading
            ? (
              <SubmitButton
                id='btn-login'
                type='submit'
                fullWidth
                variant='contained'
              >
                Log In
              </SubmitButton>
              )
            : (
              <SnipperContainer>
                <LoadingButton />
              </SnipperContainer>
              )}
        </FormContainer>
      </FormLayout>
      {error && (
        <Alert
          severity='error'
          open={Boolean(error)}
          setOpen={setError}
          time={300}
        >
          {error}
        </Alert>
      )}
    </BasicLayout>
  );
}
