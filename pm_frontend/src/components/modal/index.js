import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import TextFieldFullWidth from 'components/textFieldFullWidth';
import { useBackend } from 'hooks/useBackend';
import { useState, useEffect } from 'react';
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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [priorities, setPriorities] = useState([]);
  const { getPriorities, postRequest } = useBackend();
  useEffect(() => {
    getPriorities().then(setPriorities);
  }, [getPriorities]);

  function handleSubmit (e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = data.get('subject');
    const code_pri = data.get('priority');
    const reason = data.get('reason');
    let date_current = new Date();
    date_current.setDate(date_current.getDate() - 1);
    const date_issue = date_current.toISOString();

    console.log({subject, code_pri, reason, date_issue});
    postRequest({subject, code_pri, reason, date_issue});
  }
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
          <Button
            fullWidth
            onClick={handleClose}
            sx={{
              justifyContent: 'end',
            }}
          >
            X</Button>
            <Typography variant='h6' align='center'>
              Nueva Solicitud
            </Typography>
            <Grid
              container
              component="form"
              onSubmit= {handleSubmit}
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
                <TextFieldFullWidth
                  required
                  select
                  id="outlined-basic"
                  label="Prioridad"
                  name="priority"
                  variant="outlined"
                >
                  {
                    priorities.map(({ alias, code, name }) => {
                      return (
                        <MenuItem key={alias} value={code}>{name}</MenuItem>)
                    })
                  }
                </TextFieldFullWidth>
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
          </Box>
      </Modal>
    </>
  );
}
