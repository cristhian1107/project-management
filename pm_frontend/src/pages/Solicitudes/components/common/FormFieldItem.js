import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import TextFieldFullWidth from 'components/textFieldFullWidth';

export default function FormFieldItem ({ bp, css, renderIcon, lines, maxChars, ...props }) {

  return (
    <Grid
      item
      {...bp}
    >
      <TextFieldFullWidth
        css={{
          background: props.disabled ? '#77a2': '#fff',
          "& textarea" : {
            minHeight: lines && props?.value ? 'fit-content' : 200,
            maxHeight: lines && props?.value && 200,
          },
          ...css,
        }}
        variant="outlined"
        multiline={lines?.multiline ? true : false}
        {...props}
        inputProps={{
          maxLength: lines?.multiline ? lines?.maxLength : (maxChars ? maxChars: 'auto'),
        }}
        InputProps={{
          sx: { fontSize: { xs: '.85rem', sm:'inherit' } },
          endAdornment: renderIcon && (
            <InputAdornment
              position='end'
              sx={{
                fontStyle: 'italic',
                fontSize: '0.9rem',
                position: 'absolute',
                left: 4,
                bottom: 10,
                alignSelf: 'end'
              }}
            >
              {renderIcon}
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  )
}
