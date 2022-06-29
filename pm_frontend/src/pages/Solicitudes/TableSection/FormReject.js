import Grid from '@mui/material/Grid';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ButtonForm from 'components/ButtonForm';
import { useBackend } from 'hooks/useBackend';
import {
  PriorityField,
  CompanyField,
  DepartmentField,
  UserField,
  SubjectField,
  ReasonField,
  ReasonRejecteField
} from 'pages/Solicitudes/TableSection/FormFields';

export default function FormReject ({ dataRequest, setOpen, mode, title }) {
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
      <PriorityField
        mode={mode}
        name={dataRequest.name_pri}
        code={dataRequest.code_pri}
      />
      <CompanyField
        value={dataRequest.company_tradename}
      />
      <DepartmentField
        value={dataRequest.department}
      />
      <UserField
        value={dataRequest.user_fullname}
      />
      <SubjectField
        value={dataRequest.subject}
      />
      <ReasonField
        value={dataRequest.reason}
      />
      <ReasonRejecteField />

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
