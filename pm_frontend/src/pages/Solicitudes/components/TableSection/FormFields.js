import { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Calendar from 'components/calendar';
import { useBackend } from 'hooks/useBackend';
import FormFieldItem from 'pages/Solicitudes/components/common/FormFieldItem';

function TypeField ({ mode, value, bp }) {
  const [types, setTypes] = useState([]);
  const { getTypes } = useBackend();

  useEffect(() => {
    if (mode === 'Solicitado') {
      getTypes().then(setTypes);
    }
  }, [getTypes]);

  return (
    <FormFieldItem
      disabled={mode !== 'Solicitado'}
      required
      select={mode !== 'Solicitado' ? false : true}
      bp={bp ? bp : { xs: 5.5, sm: 3.8 }}
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
  );
}

function PriorityField ({ mode, name, code, bp }) {
  const [priorities, setPriorities] = useState([]);
  const { getPriorities } = useBackend();

  useEffect(() => {
    if (mode === 'Solicitado') {
      getPriorities().then(setPriorities);
    }
  }, [getPriorities]);

  return (
    <FormFieldItem
      disabled={mode !== 'Solicitado'}
      required
      select={mode !== 'Solicitado' ? false : true}
      bp={bp ? bp : { xs: 5.5, sm: 3.8 }}
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

function DateTentativeField ({ mode, value, date, handleDate, bp }) {
  const breakPoints = bp ? bp : {xs: 12, sm: 3.8};

  return (
    <Grid item {...breakPoints}>
      <Calendar
        disabled={mode !== 'Solicitado'}
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

function CompanyField ({ value, bp }) {

  return (
    <FormFieldItem
      disabled
      bp={bp ? bp : { xs: 12, md: 3.8 }}
      label='Empresa'
      name='company_id'
      value={value}
    />
  );
}

function DepartmentField ({ value, bp }) {

  return (
    <FormFieldItem
      disabled
      bp={bp ? bp : { xs: 12, md: 3.8 }}
      label='Area'
      name='department'
      value={value}
    />
  );
}

function UserField ({ value, bp }) {

  return (
    <FormFieldItem
      disabled
      bp={bp ? bp : { xs: 12, md: 3.8 }}
      label='Solicitante'
      name='solicitante'
      value={value}
    />
  );
}

function SubjectField ({ value, bp }) {

  return (
    <FormFieldItem
      disabled
      bp={bp ? bp : { xs: 12 }}
      label='Asunto'
      name='subjects'
      value={value}
    />
  );
}

function ReasonField ({ value, bp }) {

  return (
    <FormFieldItem
      disabled
      bp={bp ? bp : { xs: 12 }}
      label='Razon'
      name='reason'
      value={value}
      lines={{ multiline: true, maxLength: 500 }}
    />
  );
}

function TitleField ({ mode, value, bp }) {

  return (
    <FormFieldItem
      disabled={mode !== 'Solicitado' ? true : false}
      bp={bp ? bp : { xs: 12 }}
      required
      defaultValue={mode !== 'Solicitado' ? value : ''}
      label='Titulo'
      name='name'
      maxChars='50'
    />
  );
}

function DescriptionField ({ mode, value, bp }) {

  return (
    <FormFieldItem
      disabled={mode !== 'Solicitado' ? true : false}
      bp={bp ? bp : { xs: 12 }}
      label='Descripcion'
      name='description'
      defaultValue={mode !== 'Solicitado' ? value : ''}
      lines={{ multiline: mode === 'Solicitado', maxLength: 500 }}
      renderIcon={mode !== 'Solicitado' ? null : <p>Max length 500</p>}
    />
  );
}

function ReasonRejecteField ({ label, bp }) {

  return (
    <FormFieldItem
      bp={bp ? bp : { xs: 12 }}
      required
      label={label ?? 'Motivo de rechazo'}
      name='reason_reject'
      lines={{ multiline: true, maxLength: 500 }}
    />
  );
}

function CodeField ({ value, bp }) {

  return (
    <FormFieldItem
      disabled
      bp={bp ? bp : { xs: 5.5, sm: 3.8 }}
      label='Code'
      name='code'
      value={value}
    />
  );
}

function UserForTeamField ({ value, bp, member, ...props }) {

  return (
    <FormFieldItem
      required
      bp={bp ? bp : { xs: 5.5, sm: 3.8 }}
      label='Integrante'
      name='name_user'
      value={member}
      variant='standard'
      {...props}
    />
  )
}

function RolesForTeamField ({ value, bp, role, ...props }) {
  const [roles, setRoles] = useState([]);
  const { getTeamRoles } = useBackend();

  useEffect(() => {
    getTeamRoles().then(setRoles);
  }, [getTeamRoles]);

  return (
    <FormFieldItem
      required
      select
      bp={bp ? bp : { xs: 5.5, sm: 3.8 }}
      label='Rol'
      name='rol'
      value={role}
      variant='standard'
      {...props}
    >
      {
        roles.map(({ alias, code, name }) => (
          <MenuItem key={alias} value={code}>{name}</MenuItem>
        ))
      }
    </FormFieldItem>
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
  CodeField,
  RolesForTeamField,
  UserForTeamField
};
