import { useContext } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import TextFieldFullWidth from 'components/textFieldFullWidth';
import FiltersContext from 'context/FiltersContext';

export default function Calendar({ label, value }) {
  const { setFilters } = useContext(FiltersContext)
  let handleDate;
  if (label === 'Fecha inicio'){
    console.log(label)
    handleDate = (e) => setFilters(obj => ({...obj, ...{startDate:e}}))
  }else
    handleDate = (e) => setFilters(obj => ({...obj, ...{endDate:e}}))

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={value}
        //onChange={(newValue) => {
          //console.log(newValue);
          //setValue(newValue);
        //}}
        onChange={(e)=> handleDate(e)}
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
