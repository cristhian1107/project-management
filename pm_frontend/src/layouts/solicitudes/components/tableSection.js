// @mui
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List'
import IconButton from '@mui/material/IconButton';
import Search from '@mui/icons-material/Search';

import Button from 'layouts/solicitudes/components/button';
import Input from 'layouts/solicitudes/components/input';


export default function TableSection ({ css }) {

  return (
    <Box sx={{ ...css }}>
      <Box sx={{ display: 'flex', alignItems: 'center'}}>
        <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
          Filtrar por estado:
        </Typography>
        <List sx={{ display: 'flex', gap: 1, pl: 1 }}>
          <Button>Todos</Button>
          <Button>Pendientes</Button>
          <Button>Solicitados</Button>
          <Button>En proceso</Button>
        </List>
      </Box>
      <Grid
        container
        sx={{
          background: '#fff',
          width: {xs: 'calc(100vw - 16px)', sm: 'auto'},
          boxShadow: '2px 3px 5px var(--box-secondary)',
          borderRadius: 4,
          overflow: 'hidden',
        }}
        component='form'
      >
        <Input
          xs={10}
          sm={2}
          component='input'
          type='text'
          placeholder='Buscar'
          css={{
            borderRadius: 0,
            background: 'none',
            color: '#000a',
            '&::placeholder': { color: '#0007' },
          }}
        />
        <Grid
          item
          xs={2}
          sm={2}
          component='div'
        >
          <Button
            css={{
              px: 0,
              py: 1,
              borderRadius: 0,
              background: 'none',
              color: '#000a',
            }}
          >
            <Search />
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ mt: 2 }}>
        Póngame la tabla here!!
      </Box>
    </Box>
  )
}
