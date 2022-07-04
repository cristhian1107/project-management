import TextField from '@mui/material/TextField';

export default function TextFieldFull ({ css ,...dataForStructure }) {
  return (
    <TextField
      {...dataForStructure}
      sx={{
         width: '100%',
        ...css,
      }}
    />
  )
}
