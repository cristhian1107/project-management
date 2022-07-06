// React core
import { useState, useContext} from 'react';
// @mui
import Grid from '@mui/material/Grid';
import CheckIcon from '@mui/icons-material/Check'; // Confirmar
import CloseIcon from '@mui/icons-material/Close'; // Rechazar
import DeleteIcon from '@mui/icons-material/Delete'; // Cancelar
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'; // Reanudar
import FindInPageIcon from '@mui/icons-material/FindInPage'; // Ver informe
import StopCircleIcon from '@mui/icons-material/StopCircle'; // Pausar
import DoneAllIcon from '@mui/icons-material/DoneAll'; // Aprobar
import GroupsIcon from '@mui/icons-material/Groups'; // Asignar
// Redux
import { useSelector } from 'react-redux';
// Global components
import CustomModal from 'components/CustomModal';
// Local components
import ContainsTooltip from 'pages/Solicitudes/components/common/ContainsTooltip';
import FormReview from 'pages/Solicitudes/components/TableSection/FormReview';
import FormApprove from 'pages/Solicitudes/components/TableSection/FormApprove';
import FormReject from 'pages/Solicitudes/components/TableSection/FormReject';
import FormCancel from 'pages/Solicitudes/components/TableSection/FormCancel';
import FormResume from 'pages/Solicitudes/components/TableSection/FormResume';
import FormStop from 'pages/Solicitudes/components/TableSection/FormStop';
import FormAssign from 'pages/Solicitudes/components/TableSection/FormAssign';
import ReportContext from 'context/ReportContext';

export default function ButtonActions ({ dataRequest }) {
  const { setReport } = useContext(ReportContext);
  const userState = useSelector(state => state.user);
  // Define states to control modals
  const [openReview, setOpenReview] = useState(false);
  const [openApprove, setOpenApprove] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  const [openResume, setOpenResume] = useState(false);
  const [openStop, setOpenStop] = useState(false);
  const [openAssign, setOpenAssign] = useState(false);

  // Define the type and current state of the record
  const typeOf = dataRequest.name_typ ?? 'Solicitud';
  const currentState = dataRequest.name_sta;

  // Define permissions
  const { filters, ...allowedActions } = userState.permissions;

  // All actions grouped into states
  // Different actions correspond to a record in a current state.
  // Each action visually defines a modal and a button
  const actions = {
    Solicitado: [
      {
        title: 'Confirmar',
        open: openReview,
        isActive: allowedActions.btn_confirmar,
        setOpen: setOpenReview,
        Button: <ContainsTooltip label='Confirmar' render={<CheckIcon />} />,
        Form: ({ title, mode, setOpen, data }) => (
          <FormReview title={title} mode={mode} setOpen={setOpen} dataRequest={data} />
        )
      },
      {
        title: 'Rechazar',
        open: openReject,
        setOpen: setOpenReject,
        isActive: allowedActions.btn_rechazar,
        Button: <ContainsTooltip label='Rechazar' render={<CloseIcon />} />,
        Form: ({ title, mode, setOpen, data }) => (
          <FormReject title={title} mode={mode} setOpen={setOpen} dataRequest={data} />
        )
      }
    ],
    Confirmado: [
      {
        title: 'Aprobar',
        open: openApprove,
        setOpen: setOpenApprove,
        isActive: allowedActions.btn_aprobar,
        Button: <ContainsTooltip label='Aprobar' render={<DoneAllIcon />} />,
        Form: ({ title, mode, setOpen, data }) => (
          <FormApprove title={title} mode={mode} setOpen={setOpen} dataRequest={data} />
        )
      },
      {
        title: 'Rechazar',
        open: openReject,
        setOpen: setOpenReject,
        isActive: allowedActions.btn_rechazar,
        Button: <ContainsTooltip label='Rechazar' render={<CloseIcon />} />,
        Form: ({ title, mode, setOpen, data }) => (
          <FormReject title={title} mode={mode} setOpen={setOpen} dataRequest={data} />
        )
      }
    ],
    Aprobado: [
      {
        title: 'Asignar',
        open: openAssign,
        setOpen: setOpenAssign,
        isActive: allowedActions.btn_asignar,
        Button: <ContainsTooltip label='Asignar equipo' render={<GroupsIcon />} />,
        Form: ({ title, mode, setOpen, data }) => (
          <FormAssign title={title} mode={mode} setOpen={setOpen} dataRequest={data}/>
        )
      },
      {
        title: 'Cancelar',
        open: openCancel,
        setOpen: setOpenCancel,
        isActive: allowedActions.btn_cancelar,
        Button: <ContainsTooltip label='Cancelar' render={<DeleteIcon />} />,
        Form: ({ title, mode, setOpen, data }) => (
          <FormCancel title={title} mode={mode} setOpen={setOpen} dataRequest={data} />
        )
      }
    ],
    'En Proceso': [
      {
        title: 'Pausar',
        open: openStop,
        setOpen: setOpenStop,
        isActive: allowedActions.btn_pausar,
        Button: <ContainsTooltip label='Pausar' render={<StopCircleIcon />} />,
        Form: ({ title, mode, setOpen, data }) => (
          <FormStop title={title} mode={mode} setOpen={setOpen} dataRequest={data} />
        )
      },
      {
        title: 'Cancelar',
        open: openCancel,
        setOpen: setOpenCancel,
        isActive: allowedActions.btn_cancelar,
        Button: <ContainsTooltip label='Cancelar' render={<DeleteIcon />} />,
        Form: ({ title, mode, setOpen, data }) => (
          <FormCancel title={title} mode={mode} setOpen={setOpen} dataRequest={data} />
        )
      }
    ],
    Culminado: [],
    Rechazado: [],
    Cancelado: [],
    Pausado: [
      {
        title: 'Reanudar',
        open: openResume,
        setOpen: setOpenResume,
        isActive: allowedActions.btn_reanudar,
        Button: <ContainsTooltip label='Reaundar' render={<PlayCircleOutlineIcon />} />,
        Form: ({ title, mode, setOpen, data }) => (
          <FormResume title={title} mode={mode} setOpen={setOpen} dataRequest={data} />
        )
      },
      {
        title: 'Cancelar',
        open: openCancel,
        setOpen: setOpenCancel,
        isActive: allowedActions.btn_cancelar,
        Button: <ContainsTooltip label='Cancelar' render={<DeleteIcon />} />,
        Form: ({ title, mode, setOpen, data }) => (
          <FormCancel title={title} mode={mode} setOpen={setOpen} dataRequest={data} />
        )
      }
    ]
  };

  // Component converts each action object to an element in the DOM
  const GenerateButton = ({ open, setOpen, typeOf, title, data, Form, Button }) => {
    return (
      <CustomModal
        open={open}
        setOpen={setOpen}
        renderButton={Button}
        title={title !== 'Asignar' ? `Confirmar ${typeOf}` : 'Asignar Equipo'}
      >
        <Form title={title} mode={data.name_sta} setOpen={setOpen} data={data} />
      </CustomModal>
    );
  };

  return (
    <Grid container sx={{ justifyContent: 'center', flexWrap: 'nowrap' }}>
      {
        actions[currentState]?.map(({ isActive, title, open, setOpen, Form, Button }) => {
          if (!isActive) { return null; }

          return (
            <GenerateButton
              key={title}
              open={open}
              setOpen={setOpen}
              typeOf={typeOf}
              title={title}
              data={dataRequest}
              Form={Form}
              Button={Button}
            />
          );
        })
      }
      <ContainsTooltip
        label='Ver informe'
        handleClick={() => {setReport((current) => ({ ...current, showReport: true, requestId: dataRequest.id}));}}
      >
        <FindInPageIcon/>
      </ContainsTooltip>
    </Grid>
  );
}
