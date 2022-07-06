import { useState, useEffect, useContext } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Send from '@mui/icons-material/Send';
import ButtonForm from 'components/ButtonForm';
import { useBackend } from 'hooks';
import BasicLayout from 'pages/Solicitudes/components/HeaderSection/BasicLayout';
import { FormFieldItem } from 'pages/Solicitudes/components/common';
import FiltersContext from 'context/FiltersContext';
import { getFormattedDate } from 'utilities';

export default function HeaderSection () {
  const [open, setOpen] = useState(false);
  const [priorities, setPriorities] = useState([]);
  const { getPriorities, postRequest } = useBackend();
  const { setListRequests } = useContext(FiltersContext);

  useEffect(() => {
    getPriorities().then(setPriorities);
  }, [getPriorities]);

  /**
   * Make the request to the backend to insert a new request
   * @event
   * @param {object} e - Submit event
   */
  const handleSubmit = (e) => {
    // The default behavior of the event stops.
    e.preventDefault();

    // Recovery data of the inputs in the form
    const data = new FormData(e.currentTarget);
    const subject = data.get('subject');
    const code_pri = data.get('priority');
    const reason = data.get('reason');
    const date_issue = getFormattedDate(new Date());


    // Making the request
    postRequest({ subject, code_pri, reason, date_issue })
      .then(({ data }) => {
        setListRequests((currentState) => {
          setOpen(false);
          return [data, ...currentState];
        });
      });
  };

  return (
    <BasicLayout open={open} setOpen={setOpen}>
      <Grid
        container
        component='form'
        onSubmit={handleSubmit}
        sx={{
          gap: 2,
          justifyContent: 'space-between'
        }}
        // noValidate
        autoComplete='off'
      >
        <FormFieldItem
          bp={{ xs: 12, md: 8 }}
          required
          label='Asunto'
          name='subject'
          maxChars='50'
        />
        <FormFieldItem
          bp={{ xs: 12, md: 3.5 }}
          required
          select
          label='Prioridad'
          name='priority'
          defaultValue=''
        >
          {
            priorities.map(({ alias, code, name }) => (
              <MenuItem key={alias} value={code}>{name}</MenuItem>
            ))
          }
        </FormFieldItem>
        <FormFieldItem
          bp={{ xs: 12 }}
          required
          label='Razon'
          name='reason'
          lines={{ multiline: true, maxLength: 500 }}
          renderIcon={<p>Max length 500</p>}
        />
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <ButtonForm
            type='submit'
            variant='btn'
            sx={{ px: 2 }}
            startIcon={<Send />}
          >
            Enviar
          </ButtonForm>
        </Grid>
      </Grid>
    </BasicLayout>
  );
}
