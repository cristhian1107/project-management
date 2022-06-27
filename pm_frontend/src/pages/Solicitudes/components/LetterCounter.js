import Icon from '@mui/material/Icon';

export default function LetterCounter ({ current, total }={ current: 0, total: 0 }) {
  return (
    <Icon
      sx={{
        width: 'fit-content',
        height: 'fit-content',
        fontSize: '1.2rem',
      }}
    >
      {`${current}/${total}`}
    </Icon>
  )
}
