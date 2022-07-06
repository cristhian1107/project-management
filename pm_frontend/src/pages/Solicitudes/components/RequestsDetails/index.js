import { useEffect, useState, useContext } from 'react';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { useBackend } from 'hooks/useBackend';
import ReportContext from 'context/ReportContext';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';


export default function RequestsDetails() {

  // Cambia el componente que se muestra en solicitudes.
  const { report, setReport } = useContext(ReportContext);

  // Funcion que se comunica con el API.
  const { getRequest } = useBackend();

  // Contiene la infornmación de las solicitudes.
  const [details, setDetails] = useState({})

  // Consume el API para obtener la información de las solicitudes.
  useEffect(() => {
    getRequest(report.requestId).then(setDetails);
  }, [getRequest, report.requestId]);

  return (
    <>
      <Box>
        {/* HEADER */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Grid
            sx={{
              width: { xs: '100%', sm: '100%', md: '65%', lg: '65%', xl: '80%' },
              marginTop: '5px',
              borderRadius: '20px',
              backgroundColor: `${details?.color_sta}`,
              border: '1px solid var(--box-primary)',
            }}
          >
            <Typography
              variant='h5'
              component='div'
              sx={{
                fontWeight: 'bold',
                paddingTop: '10px',
                paddingLeft: '20px',
              }}
              gutterBottom
            >
              {details?.code}
            </Typography>

            <Typography
              variant='subtitle1'
              component='div'
              sx={{
                fontWeight: 'bold',
                paddingLeft: '20px',
              }}
              gutterBottom
            >
              {details?.name_typ}: {details?.name}
            </Typography>
          </Grid>
          <IconButton
            sx={{
              display: 'flex',
              width: { xs: '100%', sm: '100%', md: '30%', lg: '30%', xl: '15%' },
              marginTop: '5px',
              borderRadius: 2,
              color: '#fff',
              border: '1px solid var(--box-primary)',
              background: 'var(--box-gradient)',
              '&:hover': { background: '#fff', color: 'var(--btn-gradient)' }
            }}
            onClick={() => { setReport((current) => ({ ...current, showReport: false, requestId: 0 })); }}
          >
            <ArrowCircleLeftIcon />
            <Typography sx={{ fontWeight: 'inherit', fontSize: { lg: '1.15rem' } }}>
              &nbsp;Regresar
            </Typography>
          </IconButton>
        </Box>

        {/* INFO */}
        <Grid
          container
          sx={{
            marginTop: '1rem',
            borderRadius: '20px',
            backgroundColor: '#fff',
            padding: '1rem',
            border: '1px solid var(--box-primary)',
          }}
        >
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
            sx={{
              background: 'var(--box-gradient)',
              borderRadius: '20px',
              marginBottom: '15px',
            }}
          >
            <Typography
              variant='h6'
              component='div'
              sx={{
                fontWeight: 'bold',
                margin: '10px 20px 10px 20px',
                color: '#fff',
              }}
              gutterBottom
            >
              Datos Generales
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4} sx={{ padding: '5px' }}>
            <span style={{ fontWeight: 'bold' }}>
              Tipo&nbsp;:&nbsp;&nbsp;
            </span>
            {details?.name_typ}
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4} sx={{ padding: '5px' }}>
            <span style={{ fontWeight: 'bold' }}>
              Código&nbsp;:&nbsp;&nbsp;
            </span>
            {details?.code}
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4} sx={{ padding: '5px' }}>
            <span style={{ fontWeight: 'bold' }}>
              Estado&nbsp;:&nbsp;&nbsp;
            </span>
            {details?.name_sta}
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4} sx={{ padding: '5px' }}>
            <span style={{ fontWeight: 'bold' }}>
              Prioridad&nbsp;:&nbsp;&nbsp;
            </span>
            {details?.name_pri}
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4} sx={{ padding: '5px' }}>
            <span style={{ fontWeight: 'bold' }}>
              Empresa&nbsp;:&nbsp;&nbsp;
            </span>
            {details?.company_tradename}
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4} sx={{ padding: '5px' }}>
            <span style={{ fontWeight: 'bold' }}>
              Porcentaje&nbsp;:&nbsp;&nbsp;
            </span>
            {details?.percentage + '%'}
          </Grid>
          <Grid item xs={12} sm={6} md={8} lg={8} xl={8} sx={{ padding: '5px' }}>
            <span style={{ fontWeight: 'bold' }}>
              Título&nbsp;:&nbsp;&nbsp;
            </span>
            {details?.name}
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4} sx={{ padding: '5px' }}>
            <span style={{ fontWeight: 'bold' }}>
              Fec. Entrega&nbsp;:&nbsp;&nbsp;
            </span>
            {details?.date_tentative ? new Date(details?.date_tentative).toLocaleDateString('es-PE', { year: 'numeric', month: 'short', day: '2-digit', hour: 'numeric', minute: 'numeric' }) : '-'}
          </Grid>
          {details?.description ? (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ padding: '5px' }}>
              <span style={{ fontWeight: 'bold' }}>
                Descripción&nbsp;:&nbsp;&nbsp;
              </span>
              {details?.description}
            </Grid>
          ) : null}
        </Grid>
        <Grid
          container
          sx={{
            marginTop: '1rem',
            borderRadius: '20px',
            backgroundColor: '#fff',
            padding: '1rem',
            border: '1px solid var(--box-primary)',
          }}
        >
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
            sx={{
              background: 'var(--box-gradient)',
              borderRadius: '20px',
              marginBottom: '15px',
            }}
          >
            <Typography
              variant='h6'
              component='div'
              sx={{
                fontWeight: 'bold',
                margin: '10px 20px 10px 20px',
                color: '#fff',
              }}
              gutterBottom
            >
              Datos de la Solicitud
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4} sx={{ padding: '5px' }}>
            <span style={{ fontWeight: 'bold' }}>
              Solicitante&nbsp;:&nbsp;&nbsp;
            </span>
            {details?.user_fullname}
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4} sx={{ padding: '5px' }}>
            <span style={{ fontWeight: 'bold' }}>
              Área&nbsp;:&nbsp;&nbsp;
            </span>
            {details?.department}
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4} sx={{ padding: '5px' }}>
            <span style={{ fontWeight: 'bold' }}>
              Sucursal&nbsp;:&nbsp;&nbsp;
            </span>
            {details?.campus}
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4} sx={{ padding: '5px' }}>
            <span style={{ fontWeight: 'bold' }}>
              Fec. Solicitud&nbsp;:&nbsp;&nbsp;
            </span>
            {details?.date_issue ? new Date(details?.date_issue).toLocaleDateString('es-PE', { year: 'numeric', month: 'short', day: '2-digit', hour: 'numeric', minute: 'numeric' }) : '-'}
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8} sx={{ padding: '5px' }}>
            <span style={{ fontWeight: 'bold' }}>
              Asunto&nbsp;:&nbsp;&nbsp;
            </span>
            {details?.subject}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ padding: '5px' }}>
            <span style={{ fontWeight: 'bold' }}>
              Motivo&nbsp;:&nbsp;&nbsp;
            </span>
            {details?.reason}
          </Grid>
        </Grid>

        {/* Status */}
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={7} xl={7}
            sx={{
              marginTop: '1rem',
              borderRadius: '20px',
              backgroundColor: '#fff',
              padding: '1rem',
              border: '1px solid var(--box-primary)',
            }}
          >
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
              sx={{
                background: 'var(--box-gradient)',
                borderRadius: '20px',
                marginBottom: '15px',
              }}
            >
              <Typography
                variant='h6'
                component='div'
                sx={{
                  fontWeight: 'bold',
                  margin: '10px 20px 10px 20px',
                  color: '#fff',
                }}
                gutterBottom
              >
                Historial de Estados
              </Typography>
            </Grid>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', }}>Estado</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', }}>Usuario</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', }}>Fecha</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', }}>Razón</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {details?.states?.map((row) => (
                    <TableRow
                      key={row.item}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>{row.name_sta}</TableCell>
                      <TableCell>{row.user_fullname}</TableCell>
                      <TableCell>{new Date(row.date_issue).toLocaleDateString('es-PE', { year: 'numeric', month: 'short', day: '2-digit', hour: 'numeric', minute: 'numeric' })}</TableCell>
                      <TableCell component='th' scope='row'>{row.reason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={0} sm={0} md={0.5} lg={0.5} xl={0.5}></Grid>

          {details?.team?.length ? (
            <Grid item xs={12} sm={12} md={5.5} lg={4.5} xl={4.5}
              sx={{
                marginTop: '1rem',
                borderRadius: '20px',
                backgroundColor: '#fff',
                padding: '1rem',
                border: '1px solid var(--box-primary)',
              }}
            >
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
                sx={{
                  background: 'var(--box-gradient)',
                  borderRadius: '20px',
                  marginBottom: '15px',
                }}
              >
                <Typography
                  variant='h6'
                  component='div'
                  sx={{
                    fontWeight: 'bold',
                    margin: '10px 20px 10px 20px',
                    color: '#fff',
                  }}
                  gutterBottom
                >
                  Equipo de Trabajo
                </Typography>
              </Grid>
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {details?.team?.map((row) => (
                  <Box key={row.worker_id}>
                    <ListItem alignItems='flex-start'>
                      <ListItemAvatar>
                        <Avatar>
                          {row.worker_name.charAt(0).toUpperCase()}
                          {row.worker_lastname.charAt(0).toUpperCase()}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={row.worker_fullname}
                        secondary={row.name_fun}
                      />
                    </ListItem>
                    <Divider variant='inset' component='li'/>
                  </Box>
                ))}
              </List>
            </Grid>
          ) : null}
        </Grid>
      </Box>
    </>
  );
}
