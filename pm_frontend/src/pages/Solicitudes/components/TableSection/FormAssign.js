import { useState, useEffect, useContext } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonForm from 'components/ButtonForm';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useBackend } from 'hooks';
import { getFormattedDate } from 'utilities';
import {
  CodeField,
  PriorityField,
  DateTentativeField,
  TitleField,
  UserField,
  UserForTeamField,
  RolesForTeamField
} from 'pages/Solicitudes/components/TableSection/FormFields';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import FiltersContext from 'context/FiltersContext';

function WorkerList ({ workers, setWorkers }) {

  const removeWorker = (id) => {
    setWorkers(current => current.filter(obj => obj.worker_id !== id))
  }
  return (
    <List dense={true} sx={{ maxWidth: '300px' }}>
      {workers.map(({ worker_name, role_name, worker_id }) => (
        <ListItem
          sx={{
            my: 1,
            borderRadius: 2,
            // borderBottom: '1px dashed #0005',
            boxShadow: '0px 1px 3px #0007',
          }}
          key={worker_name}
          secondaryAction={
            <IconButton
              title='Remover'
              sx={{
                color: '#f33a',
                '&:hover': {
                  color: '#f55',
                }
              }}
              edge="end"
              aria-label="delete"
              onClick={() => removeWorker(worker_id)}
            >
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemAvatar>
            <Avatar>
              {worker_name.split(" ").map((value)=> value[0])}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={worker_name}
            secondary={role_name}
          />
        </ListItem>
      ))}
    </List>

  )
}

function AssignTeam ({ workers, setWorkers }) {
  // for the data from Backend
  const [roles, setRoles] = useState([]);
  const [listWorkers, setListWorkers] = useState([]);
  const { getTeamRoles, getWorkers } = useBackend();
  // For local data
  const [worker, setWorker] = useState('');
  const [role, setRole] = useState('');


  useEffect(() => {
    getTeamRoles().then(setRoles);
    getWorkers().then(setListWorkers);
  }, [getTeamRoles, getWorkers]);
  const handleMembers = () => {
    if (workers.map(obj => obj.worker_id).includes(worker.id))
      return null;

    if (worker !== '' && role !== '') {
      const newMember = {
        'worker_id': worker?.id,
        'worker_name': worker?.fullname,
        'code_fun': role,
        'role_name': roles[role - 1]?.name,
      }
      setWorkers((current) => [...current, newMember]);
    }
  }

  return (
    <>
      <Grid item
        xs={12}
        container
        gap={{
          xs: 1,
          sm: 3,
        }}
        sx={{
          pt: 2,
          borderTop: '1px dashed #0005',
          justifyContent: {
            xs: 'center',
          },
          alignItems: 'end',
        }}
      >
        <Grid item xs={5} sm={3.9}>
          <Autocomplete
          fullWidth
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={listWorkers}
          getOptionLabel={(options) => options.fullname}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search input"
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
              variant='standard'
            />
            )}
          onChange={(e, value) => setWorker(value)}
          />
        </Grid>
        <RolesForTeamField
          roles={roles}
          onChange={(e) => setRole(e.target.value)}
          role={role}
        />
        <Grid sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <IconButton
            type='submit'
            id='btn-add-worker'
            onClick={handleMembers}
            sx={{
              border: '1px solid #0005',
              borderRadius: 1,
              opacity: 0.8,
              py: 0.1,
              px: 2,
              '&:hover': {
                boxShadow: '2px 3px 5px #0005',
                opacity: 1,
              },
            }}
          >
            <GroupAddIcon sx={{ fontSize: '1.8rem' }}/>
          </IconButton>
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Typography
          sx={{
            width: '100%',
            color: '#000c',
            fontWeight: 'bolder',
            fontSize: '1rem',
          }}
        >
          Lista de integrantes
        </Typography>
        <Box sx={{ width: '100%' }}>
          {workers.length ? (
            <WorkerList workers={workers} setWorkers={setWorkers}/>
          ): (
            <Typography
              sx={{
                py: 2,
                width: '100%',
                fontSize: {xs: '1.2rem', sm: '1.5rem'},
                color: '#0005',
                textAlign: 'center',
              }}
            >
              No se han selecionado integrantes
            </Typography>
          )}
        </Box>
      </Grid>
    </>
  );
}

export default function FormAssign ({ dataRequest, setOpen, mode, title }) {
  const [workers, setWorkers] = useState([]);
  const { postTeam, getRequests } = useBackend();
  const { filters, setListRequests } = useContext(FiltersContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.nativeEvent.submitter.id === 'btn-add-worker')
      return null;

    if (!workers.length)
      return null;
    
    const payload = {
      'request_id': dataRequest.id,
      'date_issue': getFormattedDate(new Date()),
      'team': workers.map(({ worker_id, code_fun }) => ({worker_id, code_fun}))
    }

    postTeam(payload).then(() => {
      getRequests(filters).then(setListRequests);
      setOpen(false);
    })

  }

  return (
    <Grid
      container
      component="form"
      onSubmit={handleSubmit}
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
        bp={{ xs: 12,  sm: 7.75, md: 7.9 }}
      />
      <UserField
        value={dataRequest.user_fullname}
        bp={{ xs: 12,  sm: 3.8 }}
      />
      <AssignTeam workers={workers} setWorkers={setWorkers} />
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
