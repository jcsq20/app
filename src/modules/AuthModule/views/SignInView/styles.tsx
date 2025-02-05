import {
  AspectRatio,
  AspectRatioProps,
  Box,
  Button,
  Flex,
  css,
} from '@chakra-ui/react';
import LogoIcon from 'src/shared/assets/icons/logo';
import styled from '@emotion/styled';

export const Container = styled(Flex)((props) =>
  css({
    direction: 'column',
    h: '100%',
    overflow: 'auto',
    p: 5,
    justifyContent: 'center',
    alignItems: 'center',
  })(props.theme)
);

export const LoginBox = styled(Box)((props) =>
  css({
    borderWidth: '1px',
    borderRadius: '1rem',
    maxW: '500px',
    w: '100%',
    overflow: 'hidden',
    boxShadow: 'base',
    bg: 'var(--chakra-colors-chakra-body-bg)',
  })(props.theme)
);

export const LogoArea = styled(Box)((props) =>
  css({
    padding: 5,
    bg: 'primary.500',
  })(props.theme)
);

export const Logo = (props: AspectRatioProps) => (
  <AspectRatio ratio={1} margin="20px auto" maxW="60px" {...props}>
    <LogoIcon
      backgroundColor="var(--chakra-colors-chakra-body-bg)"
      symbolColor="var(--chakra-colors-primary-500)"
    />
  </AspectRatio>
);

export const FormArea = styled(Flex)((props) =>
  css({
    flexDirection: 'column',
    p: 5,
  })(props.theme)
);

export const SubmitButton = styled(Button)((props) =>
  css({
    mt: 5,
  })(props.theme)
);
