import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(code, name, priority, bussines, creation) {
  return { code, name, priority, bussines, creation };
}
// Request, method Get, ENPOINT: http://127.0.0.1:5000/requests

const rows = [
  createData(159, 'Frozen yoghurt', 6.0, 24, 4.0)
];

export default function TableRoot () {
  // fetch(`${process.env.REACT_APP_API_URL}/requestall?date_begin=2022-06-10&date_end=2022-06-15`)
  //   .then(res => res.json())
  //   .then(res => console.log(res));
  return (
    <TableContainer
      component={Paper}
      sx={{
        background: '#fff',
        boxShadow: '2px 2px 5px var(--box-secondary)',
        boxShadow: '2px 2px 5px #0005',
        borderRadius: 2,
        px: 2,
        pb: 2,
      }}
    >
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow
            sx={{
              '& th': {
                color: 'var(--box-secondary)',
                fontWeight: 'bolder',
                py: 1.5,
                fontSize: '1rem',
              }
            }}
          >
            <TableCell>Codigo</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Prioridad</TableCell>
            <TableCell>Empresa</TableCell>
            <TableCell>Creacion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{
                '&:hover': { background: 'rgba(0, 0, 0, .2)' },
                '& td': { py: 3 },
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell component="th" scope="row">
                {row.code}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.priority}</TableCell>
              <TableCell>{row.bussines}</TableCell>
              <TableCell>{row.creation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
