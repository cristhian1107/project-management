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
            ? 'var(--success-gradient)'
            : 'var(--error-gradient)'
        ),
        '&:hover': {
          boxShadow: () => (
            props.variant === 'success'
              ? '0 3px 10px var(--success-primary)'
              : '0 3px 10px var(--error-primary)'
          ),
        },
      }}
      {...props}
    >
      {children}
    </Button>
  )
}
