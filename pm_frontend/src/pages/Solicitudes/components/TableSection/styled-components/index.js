import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';

import Input from 'components/input';
import Button from 'components/button';

export const ContainerFilters = (props) => (
  <Box
    sx={{
      position: 'realtive',
      display: 'flex',
      alignItems: 'center',
      overflowX: 'auto',
      flexWrap: 'wrap'
    }}
    {...props}
  />
);

export const LabelTypography = (props) => (
  <Typography
    sx={{
      position: 'sticky',
      left: 0,
      fontSize: '1rem',
      fontWeight: 'bold'
    }}
    {...props}
  />
);

export const ListFilters = (props) => (
  <List
    sx={{
      minWidth: 558,
      display: 'flex',
      gap: 1,
      pl: { sm: 1 }
    }}
    {...props}
  />
);

export const ItemToFilter = ({ colorBorder, BG, ...props }) => (
  <Button
    css={{
      minWidth: 'max-content',
      background: BG ? `rgb(${BG[0]},${BG[1]},${BG[2]}, 0.4)`: 'transparent',
      color: '#000',
      border: `2px solid ${colorBorder}`,
      "&:hover": {background: `rgb(${BG[0]},${BG[1]},${BG[2]})`}
    }}
    {...props}
  />
);

export const ContainerBoxSearch = (props) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: { sm: 'flex-end' }
    }}
    {...props}
  />
);

export const FormGrid = (props) => (
  <Grid
    sx={{
      background: '#fff',
      width: { xs: 'calc(100vw - 16px)', sm: '380px' },
      boxShadow: '2px 2px 5px #0005',
      borderRadius: 4,
      overflow: 'hidden'
    }}
    {...props}
  />
);

export const BoxInput = (props) => (
  <Input
    css={{
      borderBottom: 0,
      background: 'none',
      color: '#000a',
      boxShadow: 'none',
      '&::placeholder': { color: '#0007' }
    }}
    {...props}
  />
);

export const ButtonToSearch = (props) => (
  <Button
    css={{
      px: 0.5,
      py: 0.5,
      color: '#000a',
      width: '100%',
      borderRadius: 0,
      background: 'none',
      justifyContent: 'flex-end',
      '&:hover > svg': {
        background: 'var(--box-secondary)',
        color: '#fff',
        boxShadow: '1px 1px 5px var(--box-secondary)'
      }
    }}
    {...props}
  />
);

export const StyleSearchIcon = (props) => (
  <SearchIcon
    sx={{
      width: 38,
      height: 38,
      p: 1,
      borderRadius: '100%'
    }}
    {...props}
  />
);

export const ContainerTable = (props) => (
  <Box
    sx={{
      mt: 2
    }}
    {...props}
  />
);
