import Grid from '@mui/material/Grid';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ButtonForm from 'components/ButtonForm';
import { useHandleState } from 'pages/Solicitudes/components/TableSection/hooks';
import {
  PriorityField,
  CompanyField,
  DepartmentField,
  UserField,
  SubjectField,
  ReasonField,
  ReasonRejecteField
} from 'pages/Solicitudes/components/TableSection/FormFields';

export default function FormReject ({ dataRequest, setOpen, mode, title }) {
  const { handleState } = useHandleState();

  return (
    <Grid
      container
      component="form"
      onSubmit={e => handleState(e, dataRequest.id, 7, setOpen)}
      sx={{
        gap: 2,
        justifyContent: 'space-between',
      }}
      autoComplete="off"
    >
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
