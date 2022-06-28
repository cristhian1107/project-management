// @mui
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import ContainsTooltip from 'pages/Solicitudes/components/ContainsTooltip';

const style = {
  position: 'relative',
  height: 'fit-content',
  width: { sm: '90%' },
  maxWidth: 950,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: { xs: 2, sm: 4 },
};

export default function BoxModal ({ title, children, mode, handle, css }) {
  return (
    <>
      <Modal
        open={mode}
        onClose={handle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          ...css,
          backdropFilter: 'blur(2px)',
          overflowY: 'auto',
          display: 'flex',
          justifyContent: 'center',
          p: 2,
        }}
      >
          <Box sx={style}>
            <ContainsTooltip
              label='cerrar'
              placement='bottom-start'
              handleClick={handle}
              sx={{
                position: 'absolute',
                color: 'var(--box-primary)',
                borderRadius: '50%',
                right: 10,
                top: 10,
              }}
            >
              <CloseIcon />
            </ContainsTooltip>
            <Typography variant='h6' align='center' sx={{ mb: 2 }}>
              {title}
            </Typography>
            {children}
          </Box>
      </Modal>
    </>
  );
}
