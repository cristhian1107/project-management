import { useEffect, createRef } from 'react';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import './style.css';

export default function CustomAlert ({ time, children, setOpen, open, severity, sx, ...props }) {
  const ref = createRef(null);
  const [mounted, setMounted] = useState(true);

  const handleClose = () => {
    setTimeout(() => setOpen(false), time);
    setMounted(false)
  }

  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        if (e.target.id === 'btn-login') {
          setOpen(false);
        } else {
          setTimeout(() => {
            setOpen(false);
          }, time)
        }
        setMounted(false);
      }
    })
  }, [ref, setOpen, time])

  return (
    <>
      {open && (
        <Alert
          variant='filled'
          ref={ref}
          onClose={handleClose}
          severity={severity}
          sx={{
            animationName: mounted ? 'Mounted' : 'UnMounted',
            animationDuration: time,
            ...sx
          }}
          {...props}
          className='alert'
        >
          {children}
        </Alert>
      )}
    </>
  )
}
