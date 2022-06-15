import Button from '@mui/material/Button';

export default function ItemButton ({ css, children }) {
  return (
    <Button
      sx={{
        background: 'var(--box-gradient)',
        color: '#fff',
        borderRadius: 2,
        textTransform: 'none',
        px: 4,
        py: 0,
        ...css,
      }}
    >
      {children}
    </Button>
  )
}
