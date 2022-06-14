// @mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Input from 'layouts/solicitudes/components/input';

export default function FiltersSection ({ css }) {
  return (
    <Box sx={{ ...css }}>
      <Typography variant='h5' textAlign='center'>
        Filtros Generales
      </Typography>
      <Grid
        container
        component='form'
        sx={{
          pt: 2,
          px: { sm: 2 },
          justifyContent: { xs: 'space-between', sm: 'space-around', lg: 'center' },
          gap: { xs: 1, sm: 0 },
        }}
      >
        <Input
          component='input'
          type='date'
          placeholder='Fecha Inicio'
          xs={5.8}
          sm={2.5}
          lg={1.5}
          css={{
            borderRadius: { xs: 4, sm: '16px 0 0 16px' },
          }}
        />
        <Input
          component='input'
          type='date'
          placeholder='Fecha Fin'
          xs={5.8}
          sm={2.5}
          lg={1.5}
        />
        <Input
          component='input'
          type='text'
          placeholder='Empresa'
          xs={12}
          sm={2.5}
          lg={1.5}
        />
        <Input
          component='input'
          type='select'
          placeholder='Area'
          xs={12}
          sm={2.5}
          lg={1.5}
          css={{
            borderRadius: { xs: 4, sm: '0 16px 16px 0' },
          }}
        />
        <Grid
          item
          component='div'
          sx={{
            // ml: { sm: 2 },
            display: 'flex',
            justifyContent: { xs: 'flex-end', sm: 'auto' },
          }}
          xs={12}
          sm={2}
          lg={1}
        >
          <IconButton
            type='submit'
            sx={{
              color: 'inherit',
              width: 'min-content',
              background: 'var(--box-gradient)',
              color: '#fff',
              borderRadius: 4,
              px: 4,
            }}
          >
            <SearchIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  )
}
