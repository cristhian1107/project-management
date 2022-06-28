// @mui
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
// Global components
import CustomModal from 'components/CustomModal';

export default function BasicLayout({ children, open, setOpen }) {
  const ButtonToHandleModal = () => {
    return (
      <IconButton
        sx={{
          display: 'flex',
          borderRadius: 2,
          color: 'var(--btn-primary)',
          border: '1px solid var(--btn-primary)',
          '&:hover': { background: 'var(--btn-gradient)', color: '#fff' },
        }}
      >
        <AddIcon />
        <Typography sx={{ fontWeight: 'inherit', fontSize: { lg: '1.15rem' } }}>
          Nueva solicitud
        </Typography>
      </IconButton>
    )
  }

  return (
    <Box
      sx={{
        pt: 4,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant='h4'>
        Solicitudes
      </Typography>
      <CustomModal
        title='Nueva solicitud'
        renderButton={<ButtonToHandleModal />}
        open={open}
        setOpen={setOpen}
      >
        {children}
      </CustomModal>
    </Box>
  )
}
