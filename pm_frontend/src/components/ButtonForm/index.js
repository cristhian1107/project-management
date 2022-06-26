import Button from '@mui/material/Button';

export default function ButtonForm ({ children, variant, sx, ...props }) {
  return (
    <Button
      sx={{
        fontWeight: 'bold',
        color: '#FFFc',
        my: 1,

        background: `var(--${variant}-gradient)`,
        '&:hover': {
          boxShadow: () => `0 3px 10px var(--${variant}-primary)`,
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  )
}
