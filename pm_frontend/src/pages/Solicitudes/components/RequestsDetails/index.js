import { useEffect, useState, useContext } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useBackend } from 'hooks/useBackend';
import ReportContext from "context/ReportContext";

export default function RequestsDetails() {

  const {report }  = useContext(ReportContext);

  // Funcion que se comunica con el API.
  const { getRequest } = useBackend();

  // Contiene la infornmación de las solicitudes.
  const [details, setDetails] = useState({})

  // Consume el API para obtener la información de las solicitudes.
  useEffect(() => {
    getRequest(report.requestId).then(setDetails);
  }, [getRequest, report.requestId]);

  console.log(details);
  return (
    <>
      <Box
        sx={{
          flexGrow: '1',
        }}
      >
        {/* HEADER */}
        <Grid
          container
          sx={{
            marginTop: '1rem',
          }}
        >
          <Grid
            item xs={12} sm={12} md={12} lg={12} xl={12}
            sx={{
              borderRadius: '20px',
              backgroundColor: `${details?.color_sta}`
            }}
          >
            <Typography
              variant="h5"
              component="div"
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
              variant="subtitle1"
              component="div"
              sx={{
                fontWeight: 'bold',
                paddingLeft: '20px',
              }}
              gutterBottom
            >
              {details?.name_typ}: {details?.name}
            </Typography>
          </Grid>
        </Grid>

        {/* INFO */}
        <Grid
          container
          sx={{
            marginTop: '1rem',
            borderRadius: '20px',
            backgroundColor: '#fff',
            padding: '1rem',
          }}
        >
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 'bold',
                paddingTop: '10px',
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
              Fec. Entrega&nbsp;:&nbsp;&nbsp;
            </span>
            {details?.date_tentative ? new Date(details?.date_tentative).toLocaleDateString('es-PE', { year: "numeric", month: "short", day: "2-digit", hour: "numeric", minute: "numeric" }) : '-'}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
