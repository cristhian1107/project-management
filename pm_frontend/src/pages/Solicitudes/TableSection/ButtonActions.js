// React core
import { useState } from 'react';
// @mui
import Grid from '@mui/material/Grid'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import StopCircleIcon from '@mui/icons-material/StopCircle';
// Global components
import CustomModal from 'components/CustomModal';
// Local components
import FormReview from 'pages/Solicitudes/TableSection/FormReview';
import FormReject from 'pages/Solicitudes/TableSection/FormReject';
import ContainsTooltip from 'pages/Solicitudes/components/ContainsTooltip';

export default function ButtonActions ({ dataRequest }) {
  const [openReview, setOpenReview] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  const [openPlay, setOpenPlay] = useState(false);
  const [openStop, setOpenStop] = useState(false);

  return (
    <Grid container sx={{ justifyContent: 'center', flexWrap: 'nowrap' }}>
      <CustomModal
        open={openReview}
        setOpen={setOpenReview}
        renderButton={<ContainsTooltip label='Confirmar' render={<CheckIcon />} />}
        title='Confirmar Solicitud'
      >
        <FormReview title='Confirmar' mode={dataRequest.name_sta} setOpen={setOpenReview} dataRequest={dataRequest}/>  
      </CustomModal>
      <CustomModal
        open={openStop}
        setOpen={setOpenStop}
        renderButton={<ContainsTooltip label='Pausar' render={<StopCircleIcon />} />}
        title='Pausar'
      >
        <FormReview title='Pausar' mode={dataRequest.name_sta} setOpen={setOpenReview} dataRequest={dataRequest}/>  
      </CustomModal>
      <CustomModal
        open={openPlay}
        setOpen={setOpenPlay}
        renderButton={<ContainsTooltip label='Reaundar' render={<PlayCircleOutlineIcon />} />}
        title='Reanudar'
      >
        <FormReview title='Reanudar' mode={dataRequest.name_sta} setOpen={setOpenReview} dataRequest={dataRequest}/>  
      </CustomModal>
      <CustomModal
        open={openCancel}
        setOpen={setOpenCancel}
        renderButton={<ContainsTooltip label='Cancelar' render={<DeleteIcon />} />}
        title='Cancelar'
      >
        <FormReview title='Cancelar' mode={dataRequest.name_sta} setOpen={setOpenCancel} dataRequest={dataRequest}/>
      </CustomModal>
      <CustomModal
        open={openReject}
        setOpen={setOpenReject}
        renderButton={<ContainsTooltip label='Rechazar' render={<CloseIcon />} />}
        title='Rechazar Solicitud'
      >
        <FormReject title='Rechazar' mode={dataRequest.name_sta} setOpen={setOpenReject} dataRequest={dataRequest}/>
      </CustomModal>
      <ContainsTooltip label='Ver informe'>
        <FindInPageIcon />
      </ContainsTooltip>
    </Grid>
  );
}
