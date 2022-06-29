// React core
import { useState } from 'react';
// @mui
import Grid from '@mui/material/Grid'
import CheckIcon from '@mui/icons-material/Check'; // Confirmar
import CloseIcon from '@mui/icons-material/Close'; // Rechazar
import DeleteIcon from '@mui/icons-material/Delete'; // Cancelar
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'; // Reanudar
import FindInPageIcon from '@mui/icons-material/FindInPage'; // Ver informe
import StopCircleIcon from '@mui/icons-material/StopCircle'; // Pausar
import DoneAllIcon from '@mui/icons-material/DoneAll'; // Aprobar
// Global components
import CustomModal from 'components/CustomModal';
// Local components
import ContainsTooltip from 'pages/Solicitudes/components/ContainsTooltip';
import FormReview from 'pages/Solicitudes/TableSection/FormReview';
import FormApprove from 'pages/Solicitudes/TableSection/FormApprove';
import FormReject from 'pages/Solicitudes/TableSection/FormReject';
import FormCancel from 'pages/Solicitudes/TableSection/FormCancel';
import FormResume from 'pages/Solicitudes/TableSection/FormResume';
import FormStop from 'pages/Solicitudes/TableSection/FormStop';

export default function ButtonActions ({ dataRequest }) {
  const [openReview, setOpenReview] = useState(false);
  const [openApprove, setOpenApprove] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  const [openResume, setOpenResume] = useState(false);
  const [openStop, setOpenStop] = useState(false);

  const typeOf = dataRequest.name_typ ?? 'Solicitud';

  // const ActionButton = ({ open, setOpen, typeOf }) => {
  //   return (
  //     <CustomModal
  //       open={open}
  //       setOpen={setOpen}
  //       renderButton={<ContainsTooltip label='Confirmar' render={<CheckIcon />} />}
  //       title={`Confirmar ${typeOf}`}
  //     >
  //       <FormReview title='Confirmar' mode={dataRequest.name_sta} setOpen={setOpenReview} dataRequest={dataRequest}/>  
  //     </CustomModal>
  //   )
  // }

  // const RenderButtons = ({ currentState }) => {
    
  // }

  return (
    <Grid container sx={{ justifyContent: 'center', flexWrap: 'nowrap' }}>
      <CustomModal
        open={openReview}
        setOpen={setOpenReview}
        renderButton={<ContainsTooltip label='Confirmar' render={<CheckIcon />} />}
        title={`Confirmar ${typeOf}`}
      >
        <FormReview title='Confirmar' mode={dataRequest.name_sta} setOpen={setOpenReview} dataRequest={dataRequest}/>  
      </CustomModal>
      <CustomModal
        open={openApprove}
        setOpen={setOpenApprove}
        renderButton={<ContainsTooltip label='Aprobar' render={<DoneAllIcon />} />}
        title={`Aprobar ${typeOf}`}
      >
        <FormApprove title='Aprobar' mode={dataRequest.name_sta} setOpen={setOpenApprove} dataRequest={dataRequest}/>  
      </CustomModal>
      <CustomModal
        open={openStop}
        setOpen={setOpenStop}
        renderButton={<ContainsTooltip label='Pausar' render={<StopCircleIcon />} />}
        title={`Pausar ${typeOf}`}
      >
        <FormStop title='Pausar' mode={dataRequest.name_sta} setOpen={setOpenStop} dataRequest={dataRequest}/>  
      </CustomModal>
      <CustomModal
        open={openResume}
        setOpen={setOpenResume}
        renderButton={<ContainsTooltip label='Reaundar' render={<PlayCircleOutlineIcon />} />}
        title={`Reanudar ${typeOf}`}
      >
        <FormResume title='Reanudar' mode={dataRequest.name_sta} setOpen={setOpenResume} dataRequest={dataRequest}/>  
      </CustomModal>
      <CustomModal
        open={openCancel}
        setOpen={setOpenCancel}
        renderButton={<ContainsTooltip label='Cancelar' render={<DeleteIcon />} />}
        title={`Cancelar ${typeOf}`}
      >
        <FormCancel title='Cancelar' mode={dataRequest.name_sta} setOpen={setOpenCancel} dataRequest={dataRequest}/>
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
