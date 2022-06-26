import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';

export default function ViewDatePicker () {
  const [value, setValue] = React.useState(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}
        sx={{
          display: "flex",
          alignItems: "end",
        }}
      >

        <DatePicker
          views={['year', 'month']}
          label="Año y mes"
          minDate={new Date('2012-03-01')}
          maxDate={new Date('2023-06-01')}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} helperText={null}
          sx={{
            display: "flex",
            width: "300px",
            justifyContent: "end"
          }}
           />}
        />
      </Stack>
    </LocalizationProvider>
  );
}