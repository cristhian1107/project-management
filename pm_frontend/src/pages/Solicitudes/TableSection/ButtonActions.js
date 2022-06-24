import Grid from '@mui/material/Grid'
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import FindInPageIcon from '@mui/icons-material/FindInPage';
// React
import { useState } from 'react';
// @mui
import DeleteIcon from '@mui/icons-material/Delete';
// Global components
import ModalForm from 'components/ModalForm';
import Button from 'components/button';
import TextFieldFullWidth from 'components/textFieldFullWidth';

export default function ButtonActions ({ idRequest }) {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  
  const handleOpen = () => setOpen(true);

  const handleConfirmation = (e) => {
    e.preventDefault();
    console.log('Open confirmation box');
  }
  const handleRejected = (e) => {
    e.preventDefault();
    console.log('Open confirmation box');
  }

  const handleReportView = (e) => {
    e.preventDefault();
    console.log('Open new view');
  }

  const ContainsTooltip = ({ children, titleOfTooltip, handleClick }) => {
    return (
      <Grid item>
        <Tooltip title={titleOfTooltip} disableInteractive>
          <IconButton
            onClick={handleClick}
            sx={{ '&:hover': { color: 'var(--btn-primary)' } }}
          >
            {children}
          </IconButton>
        </Tooltip>
      </Grid>
    )
  }

  return (
    <Grid container sx={{ justifyContent: 'center', flexWrap: 'nowrap' }}>
      <ContainsTooltip titleOfTooltip='Revisar' handleClick={handleOpen}>
        <EditIcon />
      </ContainsTooltip>
      <ContainsTooltip titleOfTooltip='Rechazar' handleClick={handleRejected}>
        <DeleteIcon />
      </ContainsTooltip>
      <ContainsTooltip titleOfTooltip='Ver informe' handleClick={handleReportView}>
        <FindInPageIcon />
      </ContainsTooltip>
      <ModalForm mode={open} handle={handleClose} title='Revisar solicitud'>
        <Grid
          container
          component="form"
          onSubmit= {handleConfirmation}
          sx={{
            '& > :not(style)': { m: 1 },
            justifyContent: 'space-between',
          }}
          noValidate
          autoComplete="off"
        >
          <Grid
            item
            xs={12}
            sm={8}
          >
            <TextFieldFullWidth
              required
              id="outlined-basic"
              label="Asunto"
              name="subject"
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={3}
          >
          </Grid>
          <Grid
            item
            xs={12}
          >
            <TextFieldFullWidth
              css={{
                "& textarea" : {
                  minHeight: 200,
                }
              }}
              required
              id="outlined-basic"
              label="Razon"
              name="reason"
              variant="outlined"
              multiline={true}
              inputProps={{ maxLength: 500 }}
            />
          </Grid>
          <Grid item>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                background: 'var(--btn-gradient)',
              }}
            >
              Enviar
            </Button>
          </Grid>
        </Grid>
      </ModalForm>
    </Grid>
  );
}
