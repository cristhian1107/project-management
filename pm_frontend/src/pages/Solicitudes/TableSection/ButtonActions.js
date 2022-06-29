// React core
import { useState } from 'react';
// @mui
import Grid from '@mui/material/Grid'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FindInPageIcon from '@mui/icons-material/FindInPage';
// Global components
import CustomModal from 'components/CustomModal';
// Local components
import FormModal from 'pages/Solicitudes/TableSection/FormModal';
import ContainsTooltip from 'pages/Solicitudes/components/ContainsTooltip';

export default function ButtonActions ({ dataRequest }) {
  const [open, setOpen] = useState(false);

  const handleRejected = (e) => {
    e.preventDefault();
  }

  const handleReportView = (e) => {
    e.preventDefault();
  }


  return (
    <Grid container sx={{ justifyContent: 'center', flexWrap: 'nowrap' }}>
      <CustomModal
        open={open}
        setOpen={setOpen}
        renderButton={<ContainsTooltip label='Revisar' render={<EditIcon />} />}
        title='Revisar Solicitud'
      >
        <FormModal setOpen={setOpen} dataRequest={dataRequest}/>  
      </CustomModal>
      <ContainsTooltip label='Rechazar' handleClick={handleRejected}>
        <DeleteIcon />
      </ContainsTooltip>
      <ContainsTooltip label='Ver informe' handleClick={handleReportView}>
        <FindInPageIcon />
      </ContainsTooltip>
    </Grid>
  );
}
