// Styles @mui
import CssBaseline from '@mui/material/CssBaseline';
import {
  LoginLayout,
  FormCardContainer
} from 'pages/Login/components/styled-components';

export default function BasicLayout ({ children }) {
  return (
    <LoginLayout
      container
      component='main'
    >
      <CssBaseline />
      <FormCardContainer
        item
        elevation={6}
        xs={12}
        sm={6}
      >
        {children}
      </FormCardContainer>
    </LoginLayout>
  );
}
