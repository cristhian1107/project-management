// @mui
import Grid from "@mui/material/Grid";

export default function Input({ css, ...data }) {

  return (
    <Grid
      item
      {...data}
      sx={{
        border: 'none',
        borderRadius: 0,
        px: 1,
        py: 1,
        fontSize: '1.15rem',
        outline: 'none',
        background: 'transparent',
        borderBottom: '1px solid #0005',
        color: '#000a',
        '&::placeholder': { color: '#0005' },
        ...css,
      }}
    />
  )
}
