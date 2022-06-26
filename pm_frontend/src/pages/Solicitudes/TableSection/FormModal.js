// @mui 
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// Global components
import ButtonForm from 'components/ButtonForm';
// Local components
import FormFieldItem from 'pages/Solicitudes/components/FormFieldItem';

export default function FormModal ({ dataRequest }) {
  const handleConfirmation = (e) => {
    e.preventDefault();
    console.log('Open confirmation box');
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
        bp={{ xs: 5.5, sm: 3.5 }}
        label='Tipo'
        name='code_typ'
        defaultValue=''
      >
        <MenuItem key='requirement' value='requiremt'>Requerimiento</MenuItem>
        <MenuItem key='project' value='project'>Proyecto</MenuItem>
      </FormFieldItem>
      <FormFieldItem
        required
        select
        bp={{ xs: 5.5, sm: 3.5 }}
        label='Prioridad'
        name='code_pri'
        defaultValue={dataRequest.code_pri}
      >
        <MenuItem key='Alta' value='1'>Baja</MenuItem>
        <MenuItem key='Normal' value='2'>Normal</MenuItem>
        <MenuItem key='Baja' value='3'>Alta</MenuItem>
      </FormFieldItem>
      <FormFieldItem
        disabled
        bp={{ xs: 12, sm: 3.5 }}
        label='Empresa'
        name='company_id'
        value={dataRequest.company_tradename}
      />
      <FormFieldItem
        disabled
        bp={{ xs: 12, md: 5.5 }}
        label='Area'
        name='department'
        value={dataRequest.department}
      />
      <FormFieldItem
        disabled
        bp={{ xs: 12, md: 5.5 }}
        label='Solicitante'
        name='solicitante'
        value={dataRequest.user_id}
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
