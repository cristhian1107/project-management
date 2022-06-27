// React
import { useState } from 'react';
// @mui
import Grid from '@mui/material/Grid'
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import EditIcon from '@mui/icons-material/Edit';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// Global components
import ModalForm from 'components/ModalForm';
import ButtonModal from 'components/ModalForm/ButtonModal';
import TextFieldFullWidth from 'components/textFieldFullWidth';

export default function ButtonActions ({ dataRequest }) {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  
  const handleOpen = () => setOpen(true);

  const handleConfirmation = (e) => {
    e.preventDefault();
  }
  const handleRejected = (e) => {
    e.preventDefault();
  }

  const handleReportView = (e) => {
    e.preventDefault();
  }

  const ContainsTooltip = ({ children, titleOfTooltip, handleClick }) => {
    return (
      <Grid item>
        <Tooltip title={titleOfTooltip} disableInteractive>
          <IconButton
            onClick={handleClick}
            sx={{ '&:hover': { color: 'var(--btn-primary)' } }}
          >
            {children}
          </IconButton>
        </Tooltip>
      </Grid>
    )
  }

  return (
    <Grid container sx={{ justifyContent: 'center', flexWrap: 'nowrap' }}>
      <ContainsTooltip titleOfTooltip='Revisar' handleClick={handleOpen}>
        <EditIcon />
      </ContainsTooltip>
      <ContainsTooltip titleOfTooltip='Rechazar' handleClick={handleRejected}>
        <DeleteIcon />
      </ContainsTooltip>
      <ContainsTooltip titleOfTooltip='Ver informe' handleClick={handleReportView}>
        <FindInPageIcon />
      </ContainsTooltip>
      <ModalForm mode={open} handle={handleClose} title='Revisar solicitud'>
        <Grid
          container
          component="form"
          onSubmit= {handleConfirmation}
          sx={{
            '& > :not(style)': { m: 1 },
            justifyContent: 'space-between',
          }}
          // noValidate
          autoComplete="off"
        >
          <Grid
            item
            xs={12}
          >
            <TextFieldFullWidth
              label="Asunto"
              name="subject"
              variant="outlined"
              value={dataRequest.subject}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position='end'>
                    <CheckCircleOutlineIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <TextFieldFullWidth
              label="Empresa"
              name="company_id"
              value={dataRequest.company_tradename}
              variant="outlined"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position='end'>
                    <CheckCircleOutlineIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <TextFieldFullWidth
              id="outlined-basic"
              label="Area"
              name="department"
              value={dataRequest.department}
              variant="outlined"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position='end'>
                    <CheckCircleOutlineIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <TextFieldFullWidth
              css={{
                "& textarea" : {
                  // minHeight: 200,
                  height: 'fit-content',
                }
              }}
              id="outlined-basic"
              label="Razon"
              name="reason"
              value={dataRequest.reason}
              variant="outlined"
              multiline={true}
              InputProps={{
                readOnly: true,
                maxLength: 500,
                endAdornment: (
                  <InputAdornment position='end'>
                    <CheckCircleOutlineIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <TextFieldFullWidth
              css={{
                "& textarea" : {
                  minHeight: 200,
                }
              }}
              required
              id="outlined-basic"
              label="Descripcion"
              name="description"
              variant="outlined"
              multiline={true}
              InputProps={{
                maxLength: 500,
              }}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent:' flex-end', gap: 1 }}>
            <ButtonModal
              type="submit"
              variant="success"
              startIcon={<ThumbUpIcon />}
            >
              Confirmar
            </ButtonModal>
            <ButtonModal
              type="submit"
              variant='rejected'
              startIcon={<ThumbDownIcon />}
            >
              Rechazar
            </ButtonModal>
          </Grid>
        </Grid>
      </ModalForm>
    </Grid>
  );
}
