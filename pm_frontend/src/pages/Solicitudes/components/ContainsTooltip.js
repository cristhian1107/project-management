import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Zoom from '@mui/material/Zoom';

export default function ContainsTooltip ({ children, label, handleClick, render, placement, sx }) {

  return (
    <Grid item sx={{ ...sx }}>
      <Tooltip
        title={label}
        disableInteractive
        arrow
        TransitionComponent={Zoom}
        placement={placement}
      >
        <IconButton
          onClick={handleClick}
          sx={{ '&:hover': { color: 'var(--btn-primary)' } }}
        >
          {children || render}
        </IconButton>
      </Tooltip>
    </Grid>
  )
}
