import ModalForm from './BoxModal';
import Box from '@mui/material/Box';

export default function CustomModal ({ renderButton, children, title, open, setOpen }) {
  // Modal handlers
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box
        sx={{ width: 'fit-content', height: 'fit-content' }}
        onClick={handleOpen}
      >
        {renderButton}
      </Box>
      <ModalForm mode={open} handle={handleClose} title={title}>
        {children}
      </ModalForm>
    </>
  );
}
