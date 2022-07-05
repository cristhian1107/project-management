import {
  FormCard,
  CardHeader,
  AvatarStyled,
  LockIconStyled
} from 'pages/Login/components/styled-components';

export default function FormLayout ({ children }) {
  return (
    <FormCard>
      <CardHeader>
        <AvatarStyled>
          <LockIconStyled />
        </AvatarStyled>
      </CardHeader>
      {children}
    </FormCard>
  );
}
