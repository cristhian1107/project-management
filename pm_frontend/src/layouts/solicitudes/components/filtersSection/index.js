// React core
import { useState, useEffect, useContext } from 'react';
// @mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
// Custom hooks
import { useBackend } from 'hooks/useBackend';
// Context
import FiltersContext from 'context/FiltersContext';

import TextFieldFullWidth from 'components/textFieldFullWidth';
import Calendar from 'components/calendar';

export default function FiltersSection ({ css }) {

  const {filters, setFilters} = useContext(FiltersContext);
  const {startDate, endDate, idCompany, department} = filters;
  console.log(filters)
  // const [startDate, setStartDate] = useState('');
  // const [endDate, setEndDate] = useState('');
  // const [company, setCompany] = useState('');
  // const [department, setDepartment] = useState('');

  // Fill selects.
  const [companies, setCompanies] = useState([]);
  const [departments, setDepartments] = useState([]);
  const { getCompanies, getDepartments } = useBackend();

  useEffect(() => {
    getCompanies().then(setCompanies);
    getDepartments().then(setDepartments);
  }, [])

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
        }}
      >
        <Grid item xs={5.8} sm={2.8} xl={2}>
          <Calendar
            label='Fecha inicio'
            value={startDate}
            handleDate={e => setFilters(obj => ({...obj, ...{startDate:e}}))}
          />
        </Grid>
        <Grid item xs={5.8} sm={2.8} xl={2}>
          <Calendar
            label='Fecha fin'
            value={endDate}
            handleDate={e => setFilters(obj => ({...obj, ...{endDate:e}}))}
          />
        </Grid>
        <Grid item xs={12} sm={2.8} xl={2}>
          <TextFieldFullWidth
            select
            id="filter_empresa"
            label="Empresa"
            value={idCompany}
            variant="standard"
            onChange={e => setFilters(obj => ({...obj, ...{idCompany:e.target.value}}))}
          >
            {companies.map(({ tradename, id}) =>
              (<MenuItem key={tradename} value={id}>{tradename}</MenuItem>)
            )}
          </TextFieldFullWidth>
        </Grid>
        <Grid item xs={12} sm={2.8} xl={2}>
          <TextFieldFullWidth
            select
            id="filter_area"
            label="Area"
            value={department}
            variant="standard"
            onChange={e => setFilters(obj => ({...obj, ...{deparment:e.target.value}}))}
          >
            {departments.map(({ department: name }) =>
              (<MenuItem key={name} value={name}>{name}</MenuItem>)
            )}
          </TextFieldFullWidth>
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
              width: 'min-content',
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
