// @mui
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

const style = {
  height: 'fit-content',
  width: { sm: '90%' },
  maxWidth: 950,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: { xs: 2, sm: 4 },
};

export default function ModalForm({ title, children, mode, handle, css }) {

  return (
    <>
      <Modal
        open={mode}
        onClose={handle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          ...css,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(5px)',
          overflowY: 'auto',
          display: 'flex',
          justifyContent: 'center',
          p: 2,
        }}
      >
          <Box sx={style}>
            <Typography variant='h6' align='center' sx={{ mb: 2 }}>
              {title}
            </Typography>
            {children}
          </Box>
      </Modal>
    </>
  );
}
