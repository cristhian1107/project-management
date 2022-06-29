import Grid from '@mui/material/Grid';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import FormFieldItem from 'pages/Solicitudes/components/FormFieldItem';
import ButtonForm from 'components/ButtonForm';
import { useBackend } from 'hooks/useBackend';

export default function FormReview ({ dataRequest, setOpen, mode, title }) {
  const { postEvent } = useBackend();

  const handleReject = (e) => {
    e.preventDefault();
    let date_current = new Date();
    date_current.setDate(date_current.getDate() - 1)
    const date_issue = date_current.toISOString()

    const payload = {
      request_id: dataRequest.id,
      date_issue,
      code_sta: 7
    }
    console.log(payload);
    postEvent(payload).then(() => {
      setOpen(false);
    })
  }

  return (
    <Grid
      container
      component="form"
      onSubmit= {handleReject}
      sx={{
        gap: 2,
        justifyContent: 'space-between',
      }}
      autoComplete="off"
    >
      <FormFieldItem
        disabled
        bp={{ xs: 5.5, sm: 3.8 }}
        label='Prioridad'
        name='code_pri'
        defaultValue={dataRequest.name_pri}
      >
      </FormFieldItem>
      <FormFieldItem
        disabled
        bp={{ xs: 5.5, md: 3.8 }}
        label='Empresa'
        name='company_id'
        value={dataRequest.company_tradename}
      />
      <FormFieldItem
        disabled
        bp={{ xs: 5.5, md: 3.8 }}
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
        bp={{ xs: 12, md: 7.9  }}
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
        required
        css={{ background: '#fff' }}
        bp={{ xs: 12 }}
        label='Motivo'
        name='motivo'
        lines={{ multiline: true, maxLength: 500 }}
        renderIcon={<p>Max length 500</p>}
      />
      <Grid item xs={12} sx={{ display: 'flex', justifyContent:' flex-end', gap: 1 }}>
        <ButtonForm
          type='submit'
          variant='error'
          startIcon={<ThumbDownIcon />}
        >
          {title}
        </ButtonForm>
      </Grid>
    </Grid>
  )
}
