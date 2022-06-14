// @mui
import Grid from "@mui/material/Grid";

export default function Input({ css, ...data }) {

  return (
    <Grid
      item
      {...data}
      sx={{
        border: 'none',
        borderRadius:{ xs: 4, sm: 0} ,
        color: '#fff',
        px: 1,
        py: 1,
        fontSize: '1.15rem',
        outline: 'none',
        background: 'var(--btn-gradient)',
        '&::placeholder': { color: '#fffa' },
        ...css,
      }}
    />
  )
}
