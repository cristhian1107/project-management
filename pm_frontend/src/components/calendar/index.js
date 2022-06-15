import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function BasicDatePicker({ label, onChange }) {
  const [value, setValue] = React.useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={value}
        //onChange={(newValue) => {
          //console.log(newValue);
          //setValue(newValue);
        //}}
        onChange={onChange}
        renderInput={(params) => 
          <TextField
            {...params}
            sx={{
              '& > div > input ~ div': { pr: 1 },
            }}
            variant='standard'
          />
        }
      />
    </LocalizationProvider>
  );
}
