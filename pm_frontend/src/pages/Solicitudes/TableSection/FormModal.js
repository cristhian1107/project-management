// React core
import { useState, useEffect } from 'react';
// @mui 
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// Global components
import ButtonForm from 'components/ButtonForm';
import Calendar from 'components/calendar';
// Local components
import FormFieldItem from 'pages/Solicitudes/components/FormFieldItem';
// Custom hooks
import { useBackend } from 'hooks/useBackend';

export default function FormModal ({ dataRequest, setOpen }) {
  const [dateTentative, setDateTentative] = useState(null);
  const [priorities, setPriorities] = useState([]);
  const [types, setTypes] = useState([]);
  const { getPriorities, getTypes, putRequest } = useBackend();

  useEffect(() => {
    getPriorities().then(setPriorities);
    getTypes().then(setTypes);
  }, [getPriorities, getTypes]);

  const handleConfirmation = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let date_current = new Date();
    date_current.setDate(date_current.getDate() - 1)
    const date_issue = date_current.toISOString()

    const payload = {
      id: dataRequest.id,
      date_issue,
      date_tentative: dateTentative.toISOString(),
      name: data.get('name'),
      description: data.get('description'),
      code_typ: data.get('code_typ'),
      code_pri: data.get('code_pri')
    };

    console.log(payload);
    putRequest(payload).then(() => {
      setOpen(false);
    });
  }

  return (
    <Grid
      container
      component="form"
      onSubmit= {handleConfirmation}
      sx={{
        gap: 2,
        justifyContent: 'space-between',
      }}
      // noValidate
      autoComplete="off"
    >
      <FormFieldItem
        required
        select
        bp={{ xs: 5.5, sm: 3.8 }}
        label='Tipo'
        name='code_typ'
        defaultValue=''
      >
        {
          types.map(({ alias, code, name }) => (
            <MenuItem key={alias} value={code}>{name}</MenuItem>
          ))
        }
      </FormFieldItem>
      <FormFieldItem
        required
        select
        bp={{ xs: 5.5, sm: 3.8 }}
        label='Prioridad'
        name='code_pri'
        defaultValue={dataRequest.code_pri}
      >
        {
          priorities.map(({ alias, code, name }) => (
            <MenuItem key={alias} value={code}>{name}</MenuItem>
          ))
        }
      </FormFieldItem>
      <Grid item xs={12} sm={3.8}>
        <Calendar
          required
          label='Fecha tentativa'
          value={dateTentative}
          handleDate={setDateTentative}
          variant='outlined'
        />
      </Grid>
      <FormFieldItem
        disabled
        bp={{ xs: 12, md: 3.8 }}
        label='Empresa'
        name='company_id'
        value={dataRequest.company_tradename}
      />
      <FormFieldItem
        disabled
        bp={{ xs: 12, md: 3.8 }}
        label='Area'
        name='department'
        value={dataRequest.department}
      />
      <FormFieldItem
        disabled
        bp={{ xs: 12, md: 3.8 }}
        label='Solicitante'
        name='solicitante'
        value={dataRequest.user_fullname}
      />
      <FormFieldItem
        disabled
        bp={{ xs: 12 }}
        label='Asunto'
        name='subjects'
        value={dataRequest.subject}
      />
      <FormFieldItem
        disabled
        bp={{ xs: 12 }}
        label='Razon'
        name='reason'
        value={dataRequest.reason}
        lines={{ multiline: true, maxLength: 500 }}
      />
      <FormFieldItem
        bp={{ xs: 12 }}
        required
        label='title'
        name='name'
      />
      <FormFieldItem
        css={{ background: '#fff' }}
        bp={{ xs: 12 }}
        label='Descripcion'
        name='description'
        lines={{ multiline: true, maxLength: 500 }}
        renderIcon={<p>Max length 500</p>}
      />
      <Grid item xs={12} sx={{ display: 'flex', justifyContent:' flex-end', gap: 1 }}>
        <ButtonForm
          type="submit"
          variant="success"
          startIcon={<ThumbUpIcon />}
        >
          Confirmar
        </ButtonForm>
        <ButtonForm
          type="submit"
          variant='error'
          startIcon={<ThumbDownIcon />}
        >
          Rechazar
        </ButtonForm>
      </Grid>
    </Grid>
  )
}
