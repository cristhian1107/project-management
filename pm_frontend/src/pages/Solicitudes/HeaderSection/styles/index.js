import styled from '@emotion/styled';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextFieldFullWidth from 'components/textFieldFullWidth';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

export const FormGridContainer = ({ children }) => (
  <Form
    sx={{
      '& > *:not(style)': { margin: 8 },
      justifyContent: 'space-between',
    }}
  >
    {children}
  </Form>
)

export const ButtonModal = ({ children }) => (
  <Button
    sx={{
      margin: '8px 0',
      background: 'var(--btn-gradient)',
    }}
  >
    {children}
  </Button>
)

export const TextFieldTextarea = ({ children }) => (
  <TextFieldFullWidth
    sx={{
      "& textarea" : {
        minHeight: 200,
      }
    }}
  >
    {children}
  </TextFieldFullWidth>
)

export const BLBox = styled(Box)({
  pt: 4,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
})

export const BLIconButton = styled(IconButton)({
  display: 'flex',
  borderRadius: 2,
  color: 'var(--btn-primary)',
  border: '1px solid var(--btn-primary)',
  '&:hover': { background: 'var(--btn-gradient)', color: '#fff' }
})

export const BLTypography = styled(Typography)({
  fontWeight: 'inherit',
  fontSize: { lg: '1.15rem' }
})
