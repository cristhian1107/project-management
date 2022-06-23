// React core
import { useState, useEffect } from 'react';
// @mui
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import IconButton from "@mui/material/IconButton";
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
// Global components
import ModalForm from 'components/ModalForm';
import TextFieldFullWidth from 'components/textFieldFullWidth';
// Custom hooks
import { useBackend } from 'hooks/useBackend';

export default function HeaderSection() {
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
    date_current.setDate(date_current.getDate() - 1)
    const date_issue = date_current.toISOString()

    postRequest({subject, code_pri, reason, date_issue});
  }

  return (
    <Box
      sx={{
        pt: 4,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant='h4'>
        Solicitudes
      </Typography>
      <IconButton
        sx={{
          display: 'flex',
          borderRadius: 2,
          color: 'var(--btn-primary)',
          border: '1px solid var(--btn-primary)',
          '&:hover': { background: 'var(--btn-gradient)', color: '#fff' },
        }}
        onClick={handleOpen}
      >
        <AddIcon />
        <Typography sx={{ fontWeight: 'inherit', fontSize: { lg: '1.15rem' } }}>
          Nueva solicitud
        </Typography>
      </IconButton>
      <ModalForm mode={open} handle={handleClose} title='Nueva Solicitud'>
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
      </ModalForm>
    </Box>
  )
}

