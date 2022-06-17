// React core
import { useState, useEffect } from 'react';
// @mui
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List'
import Search from '@mui/icons-material/Search';
// Custom hooks
import { useBackend } from 'hooks/useBackend'

import TableRoot from 'layouts/solicitudes/components/tableSection/tableRoot';
import Button from 'components/button';
import Input from 'components/input';



export default function TableSection({ css }) {
  useBackend({'states'});
  const [states, setStates] = useState([])

  useEffect(() => {
      .then(res => setStates(res));
  }, []);

  return (
    <Box sx={{ ...css }}>
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
          {
            states.map((state) => {
              return (
                <Button
                  css={{
                    minWidth: 'max-content',
                    background: 'transparent',
                    color: '#000',
                    border: `2px solid ${state.description}`,
                  }}
                >
                  {state.name}
                </Button>
              )
            })
          }
        </List>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: { sm: 'flex-end' } }}>
        <Grid
          container
          sx={{
            background: '#fff',
            width: { xs: 'calc(100vw - 16px)', sm: '380px' },
            boxShadow: '2px 2px 5px #0005',
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
              borderBottom: 0,
              background: 'none',
              color: '#000a',
              boxShadow: 'none',
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
                  boxShadow: '1px 1px 5px var(--box-secondary)',
                },
              }}
            >
              <Search
                sx={{
                  width: 38,
                  height: 38,
                  p: 1,
                  borderRadius: '100%',
                }}
              />
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
