// @mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

import SearchIcon from '@mui/icons-material/Search';

import Calendar from 'components/calendar';

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
          justifyContent: { xs: 'space-between', lg: 'center' },
          gap: { xs: 1, xl: 2 },
          '& > div > div': { width: '100%' },
        }}
      >
        <Grid item xs={5.8} sm={2.8} xl={2}>
          <Calendar label='Fecha inicio' onChange={() => console.log('set start date')} />
        </Grid>
        <Grid item xs={5.8} sm={2.8} xl={2}>
          <Calendar label='Fecha fin' onChange={() => console.log('set end date')} />
        </Grid>
        <Grid item xs={12} sm={2.8} xl={2}>
        <TextField
          select
          id="filter_empresa"
          label="Empresa"
          variant="standard"
        />
        </Grid>
        <Grid item xs={12} sm={2.8} xl={2}>
        <TextField
          select
          id="filter_area"
          label="Area"
          variant="standard"
        />
        </Grid>
        <Grid
          item
          component='div'
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mr: { lg: 2 },
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
