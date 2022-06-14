// @mui
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List'
import Search from '@mui/icons-material/Search';

import Button from 'layouts/solicitudes/components/button';
import Input from 'layouts/solicitudes/components/input';
import TableRoot from 'layouts/solicitudes/components/tableRoot';

export default function TableSection ({ css }) {

  return (
    <Box sx={{ ...css}}>
      <Box
        sx={{
          position: 'realtive',
          display: 'flex',
          alignItems: 'center',
          overflowX: 'auto',
          flexWrap: 'wrap',
        }}
      >
        <Typography
          sx={{
            position: 'sticky',
            left: 0,
            fontSize: '1rem',
            fontWeight: 'bold',
          }}
        >
          Filtrar por estado:
        </Typography>
        <List
          sx={{
            minWidth: 558,
            display: 'flex',
            gap: 1,
            pl: { sm: 1 },
          }}
        >
          <Button>Todos</Button>
          <Button
            css={{
              background: 'transparent',
              color: '#000',
              border: 1,
            }}
          >
            Pendientes
          </Button>
          <Button
            css={{
              background: 'transparent',
              color: '#000',
              border: 1,
            }}
          >
            Solicitados
          </Button>
          <Button
            css={{
              background: 'transparent',
              color: '#000',
              border: 1,
            }}
          >
            En proceso
          </Button>
        </List>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: {sm: 'flex-end'} }}>
        <Grid
          container
          sx={{
            background: '#fff',
            width: {xs: 'calc(100vw - 16px)', sm: '380px' },
            boxShadow: '1px 2px 5px var(--box-secondary)',
            borderRadius: 4,
            overflow: 'hidden',
          }}
          component='form'
        >
          <Input
            xs={10}
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
            component='div'
          >
            <Button
              css={{
                py: 1,
                borderRadius: 0,
                background: 'none',
                color: '#000a',
                px: 0,
                minWidth: 'fit-content',
                width: '100%',
              }}
            >
              <Search />
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 2 }}>
        <TableRoot />
      </Box>
    </Box>
  )
}
