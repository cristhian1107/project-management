import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import FindInPageIcon from '@mui/icons-material/FindInPage';

export default function ButtonActions () {

  return (
    <Grid container sx={{ justifyContent: 'center', flexWrap: 'nowrap' }}>
      <Grid item>
        <Tooltip title='Revisar' disableInteractive>
          <IconButton sx={{ '&:hover': { color: 'var(--btn-primary)' } }}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip title='Rechazar' disableInteractive>
          <IconButton sx={{ '&:hover': { color: 'var(--btn-primary)' } }}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip title='Ver Informe' disableInteractive>
          <IconButton sx={{ '&:hover': { color: 'var(--btn-primary)' } }}>
            <FindInPageIcon />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
}
