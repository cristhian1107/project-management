import Button from '@mui/material/Button';

export default function ButtonModal ({ children, ...props }) {
  return (
    <Button
      sx={{
        fontWeight: 'bold',
        color: '#FFFc',
        my: 1,

        background: (
          props.variant === 'success'
            ? 'var(--btn-gradient)'
            : 'var(--box-gradient)'
        ),
        '&:hover': {
          boxShadow: () => (
            props.variant === 'success'
              ? '0 3px 10px var(--btn-secondary)'
              : '0 3px 10px var(--box-secondary)'
          ),
        },
      }}
      {...props}
    >
      {children}
    </Button>
  )
}
