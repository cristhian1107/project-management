import { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FormFieldItem from 'pages/Solicitudes/components/FormFieldItem';
import ButtonForm from 'components/ButtonForm';
import Calendar from 'components/calendar';
import { useBackend } from 'hooks/useBackend';

export default function FormReview ({ dataRequest, setOpen, mode, title }) {
  const [dateTentative, setDateTentative] = useState(null);
  const [priorities, setPriorities] = useState([]);
  const [types, setTypes] = useState([]);
  const { getPriorities, getTypes } = useBackend();
  const { putRequest } = useBackend();

  useEffect(() => {
    if (mode === 'Solicitado') {
      getPriorities().then(setPriorities);
      getTypes().then(setTypes);
    }
  }, [getPriorities, getTypes]);

  const actions = {
    handleConfirmar: (e) => {
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

      putRequest(payload).then(() => {
        setOpen(false);
      });
    },

    handleReanudar: (e) => {
      e.preventDefault();
      console.log(`Vamos a ${title}`);
    },

    handlePausar: (e) => {
      e.preventDefault();
      console.log(`Vamos a ${title}`);
    },

    handleCancelar: (e) => {
      e.preventDefault();
      console.log(`Vamos a ${title}`);
    }
  }

  return (
    <Grid
      container
      component="form"
      onSubmit= {actions[`handle${title}`]}
      sx={{
        gap: 2,
        justifyContent: 'space-between',
      }}
      autoComplete="off"
    >
      <FormFieldItem
        disabled={mode !== 'Solicitado' ? true : false}
        required
        select={mode !== 'Solicitado' ? false : true}
        bp={{ xs: 5.5, sm: 3.8 }}
        label='Tipo'
        name='code_typ'
        defaultValue={mode !== 'Solicitado' ? dataRequest.name_typ : ''}
      >
        {
          mode === 'Solicitado' && types.map(({ alias, code, name }) => (
            <MenuItem key={alias} value={code}>{name}</MenuItem>
          ))
        }
      </FormFieldItem>
      <FormFieldItem
        disabled={mode !== 'Solicitado' ? true : false}
        required
        select={mode !== 'Solicitado' ? false : true}
        bp={{ xs: 5.5, sm: 3.8 }}
        label='Prioridad'
        name='code_pri'
        defaultValue={mode !== 'Solicitado' ? dataRequest.name_pri : dataRequest.code_pri}
      >
        {
          mode === 'Solicitado' && priorities.map(({ alias, code, name }) => (
            <MenuItem key={alias} value={code}>{name}</MenuItem>
          ))
        }
      </FormFieldItem>
      <Grid item xs={12} sm={3.8}>
        <Calendar
          disabled={mode !== 'Solicitado' ? true : false}
          required
          label='Fecha tentativa'
          value={mode !== 'Solicitado' ? dataRequest.date_tentative : dateTentative}
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
        disabled={mode !== 'Solicitado' ? true : false}
        bp={{ xs: 12 }}
        required
        defaultValue={mode !== 'Solicitado' ? dataRequest.name : ''}
        label='title'
        name='name'
      />
      <FormFieldItem
        disabled={mode !== 'Solicitado' ? true : false}
        bp={{ xs: 12 }}
        label='Descripcion'
        name='description'
        defaultValue={ mode !== 'Solicitado' ? dataRequest.description : ''}
        lines={{ multiline: mode !== 'Solicitado' ? false : true, maxLength: 500 }}
        renderIcon={mode !== 'Solicitado' ? null : <p>Max length 500</p>}
      />
      <Grid item xs={12} sx={{ display: 'flex', justifyContent:' flex-end', gap: 1 }}>
        <ButtonForm
          type="submit"
          variant="success"
          startIcon={<ThumbUpIcon />}
        >
          {title}
        </ButtonForm>
      </Grid>
    </Grid>
  )
}
