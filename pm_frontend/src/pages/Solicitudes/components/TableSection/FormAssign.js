import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import ButtonForm from 'components/ButtonForm';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useHandleState } from 'pages/Solicitudes/components/TableSection/hooks';
import {
  CodeField,
  PriorityField,
  DateTentativeField,
  TitleField,
  UserField,
  UserForTeamField,
  RolesForTeamField
} from 'pages/Solicitudes/components/TableSection/FormFields';

export default function FormAssign ({ dataRequest, setOpen, mode, title }) {
  const [member, setMember] = useState('');
  const [role, setRole] = useState('');
  const [members, setMembers] = useState([]);
  const { handleState } = useHandleState();

  const handleMembers = () => {
    const newMember = {
      'worker_id': member,
      'code_fun': role,
    }
    if (member !== '' && role !== '') {
      setMembers((current) => [...current, newMember]);
      setMember('');
      setRole('');
    }
  }

  return (
    <Grid
      container
      component="form"
      onSubmit={e => handleState(e, dataRequest.id, 8, setOpen)}
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
        value={dataRequest.date_tentative}
      />
      <TitleField
        mode={mode}
        value={dataRequest.name}
        bp={{ xs: 12, sm: 7.9 }}
      />
      <UserField
        value={dataRequest.user_fullname}
        bp={{ xs: 12, sm: 3.8 }}
      />

      <Grid
        item
        xs={12}
        container
        gap={{
          xs: 1,
          sm: 3,
        }}
        sx={{
          justifyContent: {
            xs: 'space-between',
            sm: 'flex-start',
          }
        }}
      >
        <UserForTeamField
          member={member}
          onChange={(e) => setMember(e.currentTarget.value)}
        />
        <RolesForTeamField
          onChange={(e) => setRole(e.target.value)}
          role={role}
        />
        <Grid sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <IconButton
            onClick={handleMembers}
            sx={{
              p: 0,
              '&:hover': {
                opacity: 1,
              }
            }}
          >
            <GroupAddIcon sx={{ fontSize: '1.8rem' }}/>
          </IconButton>
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Typography
          sx={{
            color: '#000a',
            fontSize: '1.1rem',
          }}
        >
          Lista de integrantes
        </Typography>
        <ListItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          {members.length ? (
            members.map(({ worker_id, code_fun }) => (
              <Box
                key={worker_id}
                sx={{
                  width: {xs: '100%', sm: '50%'},
                  display: 'flex',
                  gap: 2,
                  justifyContent: 'space-between',
                }}
              >
                {/* <CheckIcon sx={{ color: '000a' }}/> */}
                <Typography>
                  {`${worker_id} - ${code_fun}`}
                </Typography>
                <IconButton>
                  <CloseIcon sx={{ color: '#f55' }}/>
                </IconButton>
              </Box>
            ))
          ): (
            <Typography
              sx={{
                width: '100%',
                fontSize: {xs: '1rem', sm: '1.5rem'},
                color: '#0005',
                textAlign: 'center',
              }}
            >
              No se han selecionado integrantes
            </Typography>
          )}
        </ListItem>
      </Grid>

      <Grid item xs={12} sx={{ display: 'flex', justifyContent:' flex-end', gap: 1 }}>
        <ButtonForm
          type='submit'
          variant='btn'
          startIcon={<ThumbUpIcon />}
        >
          {title}
        </ButtonForm>
      </Grid>
    </Grid>
  )
}
