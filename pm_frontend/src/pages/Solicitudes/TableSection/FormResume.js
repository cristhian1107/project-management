import Grid from '@mui/material/Grid';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ButtonForm from 'components/ButtonForm';
import { useHandleState } from 'pages/Solicitudes/TableSection/hooks';
import {
  CodeField,
  PriorityField,
  CompanyField,
  DateTentativeField,
  DepartmentField,
  UserField
} from 'pages/Solicitudes/TableSection/FormFields';

export default function FormResume ({ dataRequest, setOpen, mode, title }) {
  const { handleState } = useHandleState();

  return (
    <Grid
      container
      component="form"
      onSubmit={e => handleState(e, dataRequest.id, 5, setOpen)}
      sx={{
        gap: 2,
        justifyContent: 'space-between',
      }}
      autoComplete="off"
    >
      <CodeField
        mode={mode}
        value={dataRequest.code}
      />
      <PriorityField
        mode={mode}
        name={dataRequest.name_pri}
        code={dataRequest.code_pri}
      />
      <DateTentativeField
        value={dataRequest.date_tentative}
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

      <Grid item xs={12} sx={{ display: 'flex', justifyContent:' flex-end', gap: 1 }}>
        <ButtonForm
          type='submit'
          variant='success'
          startIcon={<ThumbUpIcon />}
        >
          {title}
        </ButtonForm>
      </Grid>
    </Grid>
  )
}
