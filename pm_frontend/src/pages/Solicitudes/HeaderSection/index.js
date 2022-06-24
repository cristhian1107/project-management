// React core
import { useState, useEffect } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
// Global components
import TextFieldFullWidth from 'components/textFieldFullWidth';
// Custom hooks
import { useBackend } from 'hooks/useBackend';
// Parts of the component
import BasicLayout from 'pages/Solicitudes/HeaderSection/BasicLayout';

export default function HeaderSection() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [priorities, setPriorities] = useState([]);
  const { getPriorities, postRequest } = useBackend();

  useEffect(() => {
    getPriorities().then(setPriorities);
  }, [getPriorities]);

  const FormGridContainer = styled(Grid)({
    '& > *:not(style)': { margin: 8 },
    justifyContent: 'space-between',
  })

  const ButtonModal = styled(Button)({
    margin: '8px 0',
    background: 'var(--btn-gradient)',
  })

  const TextFieldTextarea = styled(TextFieldFullWidth)({
    "& textarea" : {
      minHeight: 200,
    }
  })

  const handleSubmit = (e) => {
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
    <BasicLayout {...{open, handleOpen, handleClose}}>
      <FormGridContainer
        container
        component="form"
        onSubmit= {handleSubmit}
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
          <TextFieldTextarea
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
          <ButtonModal
            type="submit"
            fullWidth
            variant="contained"
          >
            Enviar
          </ButtonModal>
        </Grid>
      </FormGridContainer>
    </BasicLayout>
  )
}
