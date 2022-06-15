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
          gap: { xs: 1, sm: 1, xl: 2 },
        }}
      >
        <Input
          component='input'
          type='date'
          placeholder='Fecha Inicio'
          xs={5.8}
          sm={2.8}
          xl={2}
        />
        <Input
          component='input'
          type='date'
          placeholder='Fecha Fin'
          xs={5.8}
          sm={2.8}
          xl={2}
        />
        <Input
          component='input'
          type='text'
          placeholder='Empresa'
          xs={12}
          sm={2.8}
          xl={2}
        />
        <Input
          component='input'
          type='select'
          placeholder='Area'
          xs={12}
          sm={2.8}
          xl={2}
        />
        <Grid
          item
          component='div'
          sx={{
            display: 'flex',
            justifyContent: { xs: 'flex-end', sm: 'auto' },
            mr: { sm: 0.4 },
          }}
          xs={12}
          xl={1}
        >
          <IconButton
            type='submit'
            sx={{
              color: 'inherit',
              width: 'min-content',
              background: 'var(--box-gradient)',
              background: 'transparent',
              color: 'var(--box-primary)',
              borderRadius: 4,
              border: '1px solid var(--box-primary)',
              mt: 1,
              px: 4,
              py: 0.5,
              '&:hover': {
                background: 'var(--box-gradient)',
                color: '#fff',
              },
            }}
          >
            <SearchIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  )
}
