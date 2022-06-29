import { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Calendar from 'components/calendar';
import { useBackend } from 'hooks/useBackend';
import FormFieldItem from 'pages/Solicitudes/components/FormFieldItem';

function TypeField ({ mode, value }) {
  const [types, setTypes] = useState([]);
  const { getTypes } = useBackend();

  useEffect(() => {
    if (mode === 'Solicitado') {
      getTypes().then(setTypes);
    }
  }, [getTypes]);

  return (
    <FormFieldItem
      disabled={mode !== 'Solicitado' ? true : false}
      required
      select={mode !== 'Solicitado' ? false : true}
      bp={{ xs: 5.5, sm: 3.8 }}
      label='Tipo'
      name='code_typ'
      defaultValue={mode !== 'Solicitado' ? value : ''}
    >
      {
        mode === 'Solicitado' && types.map(({ alias, code, name }) => (
          <MenuItem key={alias} value={code}>{name}</MenuItem>
        ))
      }
    </FormFieldItem>
  )
}

function PriorityField ({ mode, name, code }) {
  const [priorities, setPriorities] = useState([]);
  const { getPriorities } = useBackend();

  useEffect(() => {
    if (mode === 'Solicitado') {
      getPriorities().then(setPriorities);
    }
  }, [getPriorities]);

  return (
    <FormFieldItem
      disabled={mode !== 'Solicitado' ? true : false}
      required
      select={mode !== 'Solicitado' ? false : true}
      bp={{ xs: 5.5, sm: 3.8 }}
      label='Prioridad'
      name='code_pri'
      defaultValue={mode !== 'Solicitado' ? name : code}
    >
      {
        mode === 'Solicitado' && priorities.map(({ alias, code, name }) => (
          <MenuItem key={alias} value={code}>{name}</MenuItem>
        ))
      }
    </FormFieldItem>
  );
}

function DateTentativeField ({ mode, value, date, handleDate }) {
  
  return (
    <Grid item xs={12} sm={3.8}>
      <Calendar
        disabled={mode !== 'Solicitado' ? true : false}
        required
        label='Fecha tentativa'
        name='date_tentative'
        value={mode !== 'Solicitado' ? value : (date ?? '')}
        handleDate={handleDate ?? (() => {})}
        variant='outlined'
      />
    </Grid>
  );
}

function CompanyField ({ value }) {

  return (
    <FormFieldItem
      disabled
      bp={{ xs: 12, md: 3.8 }}
      label='Empresa'
      name='company_id'
      value={value}
    />
  )
}

function DepartmentField ({ value }) {

  return (
    <FormFieldItem
      disabled
      bp={{ xs: 12, md: 3.8 }}
      label='Area'
      name='department'
      value={value}
    />
  )
}

function UserField ({ value }) {

  return (
    <FormFieldItem
      disabled
      bp={{ xs: 12, md: 3.8 }}
      label='Solicitante'
      name='solicitante'
      value={value}
    />
  )
}

function SubjectField ({ value }) {

  return (
    <FormFieldItem
      disabled
      bp={{ xs: 12 }}
      label='Asunto'
      name='subjects'
      value={value}
    />
  )
}

function ReasonField ({ value }) {

  return (
    <FormFieldItem
      disabled
      bp={{ xs: 12 }}
      label='Razon'
      name='reason'
      value={value}
      lines={{ multiline: true, maxLength: 500 }}
    />
  )
}

function TitleField ({ mode, value }) {

  return (
    <FormFieldItem
      disabled={mode !== 'Solicitado' ? true : false}
      bp={{ xs: 12 }}
      required
      defaultValue={mode !== 'Solicitado' ? value : ''}
      label='title'
      name='name'
    />
  )
}

function DescriptionField ({ mode, value }) {

  return (
    <FormFieldItem
      disabled={mode !== 'Solicitado' ? true : false}
      bp={{ xs: 12 }}
      label='Descripcion'
      name='description'
      defaultValue={ mode !== 'Solicitado' ? value : ''}
      lines={{ multiline: mode !== 'Solicitado' ? false : true, maxLength: 500 }}
      renderIcon={mode !== 'Solicitado' ? null : <p>Max length 500</p>}
    />
  )
}

function ReasonRejecteField () {

  return (
    <FormFieldItem
      bp={{ xs: 12 }}
      label='Motivo de rechazo'
      name='reason_reject'
      lines={{ multiline: true, maxLength: 500 }}
    />
  )
}

function CodeField ({ value }) {

  return (
    <FormFieldItem
      disabled
      bp={{ xs: 5.5, sm: 3.8 }}
      label='Code'
      name='code'
      value={value}
    />
  )
}

export {
  TypeField,
  PriorityField,
  DateTentativeField,
  CompanyField,
  DepartmentField,
  UserField,
  SubjectField,
  ReasonField,
  TitleField,
  DescriptionField,
  ReasonRejecteField,
  CodeField
};
