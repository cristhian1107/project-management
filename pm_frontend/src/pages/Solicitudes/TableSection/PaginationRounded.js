import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationRounded() {
  return (
    <Stack spacing={3}>
      <Pagination 
      count={100}
      variant="outlined"
      shape="rounded"

       />
    </Stack>
  );
}