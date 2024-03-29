import { useState, useContext } from 'react';
import Grid from '@mui/material/Grid';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ButtonForm from 'components/ButtonForm';
import { useBackend } from 'hooks/useBackend';
import FiltersContext from 'context/FiltersContext';
import { getFormattedDate } from 'utilities';
import {
  TypeField,
  PriorityField,
  DateTentativeField,
  CompanyField,
  DepartmentField,
  UserField,
  SubjectField,
  ReasonField,
  TitleField,
  DescriptionField
} from 'pages/Solicitudes/components/TableSection/FormFields';

export default function FormReview ({ dataRequest, setOpen, mode, title }) {
  const [dateTentative, setDateTentative] = useState(null);
  const { putRequest, getRequests } = useBackend();
  const { filters, setListRequests } = useContext(FiltersContext);

  const handleConfirm = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const date_issue = getFormattedDate(new Date());
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
      getRequests(filters).then(setListRequests);
      setOpen(false);
    });
  };

  return (
    <Grid
      container
      component='form'
      onSubmit={handleConfirm}
      sx={{
        gap: 2,
        justifyContent: 'space-between'
      }}
      autoComplete='off'
    >
      <TypeField
        mode={mode}
        value={dataRequest.name_typ}
      />
      <PriorityField
        mode={mode}
        name={dataRequest.name_pri}
        code={dataRequest.code_pri}
      />
      <DateTentativeField
        mode={mode}
        value={dataRequest.date_tentative}
        date={dateTentative}
        handleDate={setDateTentative}
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
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: ' flex-end', gap: 1 }}>
        <ButtonForm
          type='submit'
          variant='success'
          startIcon={<ThumbUpIcon />}
        >
          {title}
        </ButtonForm>
      </Grid>
    </Grid>
  );
}
