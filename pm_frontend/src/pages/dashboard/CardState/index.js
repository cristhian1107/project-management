import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Warning from "@mui/icons-material/Warning";
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import Typography from "@mui/material/Typography";

const iconDict = {
    "Solicitado": <AccessibilityIcon
    sx={{
      fontSize: "2.5rem",
    }}
    />,
    "Confirmado": "URL",
    "Aprobado": "URL",
    "Definido": "URL",
    "En Proceso": "URL",
    "Culminado": "URL",
    "Rechazado": "URL",
    "Cancelado": "URL",
    "Pausado": "URL",
  }

export default function CardState({ state, number, total }) {
    console.log(state)
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa")
    return (
        <Grid item xs={12} sm={5.7} lg={2.7} md={3.7}>
        <Card
            sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "1rem",
            height: "150px",
            width: "100%",
            alignSelf: "center",
            marginTop: "50px",
            overflow: "unset",
            }}
        >
            <Box>
                <Icon
                sx={{
                    background: "linear-gradient(60deg, #ffa726, #fb8c00)",
                    width: "100px",
                    height: "100px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "5px 5px 5px black",
                    position: "relative",
                    top: "-50px",
                }}
                >
                {iconDict[state]}
                </Icon>
            </Box>
            <Box>
            <Typography>{state}</Typography>
            <Typography>{number} / {total}</Typography>
            </Box>
        </Card>
        </Grid>
    );
  }