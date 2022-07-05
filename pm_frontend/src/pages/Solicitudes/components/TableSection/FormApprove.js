import Grid from '@mui/material/Grid';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ButtonForm from 'components/ButtonForm';
import { useHandleState } from 'pages/Solicitudes/components/TableSection/hooks';
import {
  PriorityField,
  DateTentativeField,
  CompanyField,
  DepartmentField,
  UserField,
  SubjectField,
  ReasonField,
  TitleField,
  DescriptionField,
  CodeField
} from 'pages/Solicitudes/components/TableSection/FormFields';

export default function FormApprove ({ dataRequest, setOpen, mode, title }) {
  const { handleState }= useHandleState();

  return (
    <Grid
      container
      component="form"
      onSubmit={e => handleState(e, dataRequest.id, 3, setOpen)}
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
        mode={mode}
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
      <SubjectField
        value={dataRequest.subject}
      />
      <ReasonField
        value={dataRequest.reason}
      />
      <TitleField
        mode={mode}
        value={dataRequest.name}
      />
      <DescriptionField
        mode={mode}
        value={dataRequest.description}
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
