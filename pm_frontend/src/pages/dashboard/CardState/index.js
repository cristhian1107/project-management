import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import HandshakeIcon from '@mui/icons-material/Handshake';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import PendingIcon from '@mui/icons-material/Pending';
import FactCheckIcon from '@mui/icons-material/FactCheck';

const iconDict = {
    "Solicitado": <AccessibilityIcon/>,
    "Confirmado": <CheckCircleIcon/>,
    "Aprobado": <ThumbUpIcon/>,
    "Definido": <HandshakeIcon/>,
    "En Proceso": <PendingIcon/>,
    "Culminado": <FactCheckIcon/>,
    "Rechazado": <ThumbDownIcon/>,
    "Cancelado": <CancelIcon/>,
    "Pausado": <StopCircleIcon/>,
  }

export default function CardState({ name_sta, number_sta, total, color_sta: clr }) {
    const newColor = clr.slice(0,2) + clr[3] + clr[5];
    return (
        <Grid item xs={12} sm={5.7} md={3.7} lg={3.7} xl={2.7} >
        <Card
            sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "1rem",
            height: "120px",
            width: "100%",
            alignSelf: "center",
            marginTop: "50px",
            overflow: "unset",
            }}
        >
            <Box>
                <Icon
                sx={{
                    background: newColor,/*`linear-gradient(60deg, #ffa726, ${newColor})`,*/
                    width: "100px",
                    height: "100px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "5px 5px 5px black",
                    position: "relative",
                    top: "-50px",
                    "& svg": {
                        fontSize: "5rem",
                    },
                }}
                >
                {iconDict[name_sta]}
                </Icon>
            </Box>
            <Box>
            <Typography
                sx={{
                    color: "gray",
                    fontSize: "1.5em",
                }}
            >{name_sta}</Typography>
            <Typography
                sx={{
                    fontSize: "2em",
                }}
            >{number_sta} / {total}</Typography>
            </Box>
        </Card>
        </Grid>
    );
}