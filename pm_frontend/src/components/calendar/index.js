import * as React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import TextFieldFullWidth from 'components/textFieldFullWidth';

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
          <TextFieldFullWidth
            {...params}
            css={{
              '& > div > input ~ div': { pr: 1 },
            }}
            variant='standard'
          />
        }
      />
    </LocalizationProvider>
  );
}
