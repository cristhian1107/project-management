import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import TextFieldFullWidth from 'components/textFieldFullWidth';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function ModalFormInsertRequest(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box onClick={handleOpen}>{props.children}</Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <Box sx={style}>
            <Typography variant='h6' align='center'>
              Nueva Solicitud
            </Typography>
            <Grid
              container
              component="form"
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
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={3}
              >
                <TextFieldFullWidth
                  required
                  select
                  id="outlined-basic"
                  label="Prioridad"
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <TextFieldFullWidth
                  required
                  id="outlined-basic"
                  label="Razon"
                  variant="outlined"
                  multiline={true}
                  inputProps={{ maxLength: 500 }}
                />
              </Grid>
              <Grid item>
                <Button>
                  Enviar
                </Button>
              </Grid>
            </Grid>
          </Box>
      </Modal>
    </>
  );
}
