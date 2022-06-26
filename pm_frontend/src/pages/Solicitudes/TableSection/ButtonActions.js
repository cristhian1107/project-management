// React
import { useState, useCallback } from 'react';
// @mui
import Grid from '@mui/material/Grid'
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Icon from '@mui/material/Icon';
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
  const [counter, setCounter] = useState(0);
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const handleOpen = () => setOpen(true);

  const handleConfirmation = (e) => {
    e.preventDefault();
    console.log('Open confirmation box');
  }
  const handleRejected = (e) => {
    e.preventDefault();
    console.log('Open confirmation box');
    console.log(dataRequest);
  }

  const handleReportView = (e) => {
    e.preventDefault();
    console.log('Open new view');
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
  
  const LetterCounter = ({ current, total }={ current: 0, total: 0 }) => {
    return (
      <Icon
        sx={{
          width: 'fit-content',
          height: 'fit-content',
          fontSize: '1.2rem',
        }}
      >
        {`${current}/${total}`}
      </Icon>
    )
  }
  const FormFieldItem = useCallback(({ bp, css, renderIcon, lines, ...props }) => {

    return (
      <Grid
        item
        {...bp}
      >
        <TextFieldFullWidth
          css={{
            background: props.disabled ? '#77a2': '#fff',
            "& textarea" : {
              minHeight: lines && props?.value ? 'fit-content' : 200,
              maxHeight: lines && props?.value && 200,
            },
            ...css,
          }}
          variant="outlined"
          multiline={lines?.multiline ? true : false}
          {...props}
          inputProps={{
            maxLength: lines?.multiline ? lines?.maxLength : 'auto',
          }}
          InputProps={{
            sx: { fontSize: { xs: '.85rem', sm:'inherit' } },
            endAdornment: renderIcon && (
              <InputAdornment position='end' sx={{ position: 'absolute', right: 10, alignSelf: 'end' }}>
                {renderIcon}
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    )
  }, []);

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
            // '& > :not(style)': { m: 1 },
            gap: 2,
            justifyContent: 'space-between',
          }}
          // noValidate
          autoComplete="off"
        >
          <FormFieldItem
            required
            select
            bp={{ xs: 5.5, sm: 3.5 }}
            label='Tipo'
            name='code_typ'
            defaultValue=''
          >
            <MenuItem key='requirement' value='requiremt'>Requerimiento</MenuItem>
            <MenuItem key='project' value='project'>Proyecto</MenuItem>
          </FormFieldItem>
          <FormFieldItem
            required
            select
            bp={{ xs: 5.5, sm: 3.5 }}
            label='Prioridad'
            name='code_pri'
            defaultValue={dataRequest.code_pri}
          >
            <MenuItem key='Alta' value='1'>Baja</MenuItem>
            <MenuItem key='Normal' value='2'>Normal</MenuItem>
            <MenuItem key='Baja' value='3'>Alta</MenuItem>
          </FormFieldItem>
          <FormFieldItem
            disabled
            bp={{ xs: 12, sm: 3.5 }}
            label='Empresa'
            name='company_id'
            value={dataRequest.company_tradename}
          />
          <FormFieldItem
            disabled
            bp={{ xs: 12, md: 5.5 }}
            label='Area'
            name='department'
            value={dataRequest.department}
          />
          <FormFieldItem
            disabled
            bp={{ xs: 12, md: 5.5 }}
            label='Solicitante'
            name='solicitante'
            value={dataRequest.user_id}
          />
          <FormFieldItem
            disabled
            bp={{ xs: 12 }}
            label='Asunto'
            name='subjects'
            value={dataRequest.subject}
          />
          <FormFieldItem
            disabled
            bp={{ xs: 12 }}
            label='Razon'
            name='reason'
            value={dataRequest.reason}
            lines={{ multiline: true, maxLength: 500 }}
          />
          <FormFieldItem
            css={{ background: '#fff' }}
            bp={{ xs: 12 }}
            label='Descripcion'
            name='description'
            lines={{ multiline: true, maxLength: 500 }}
            onChange={e => setCounter(e.target.value.length)}
            renderIcon={<LetterCounter current={counter} total={500}/>}
          />
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
