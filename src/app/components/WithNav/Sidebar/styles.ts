import {
  AspectRatio,
  CloseButton,
  Flex,
  css,
  useColorModeValue,
} from '@chakra-ui/react';
import styled from '@emotion/styled';

export const Container = styled(Flex)((props) =>
  css({
    flexDirection: 'column',
    bg: useColorModeValue('neutral.100', 'neutral.900'),
    borderRight: '1px',
    borderRightColor: useColorModeValue('neutral.200', 'neutral.700'),
    w: { base: 'full', md: 60 },
    h: 'full',
  })(props.theme),
);

export const Top = styled(Flex)((props) =>
  css({
    alignItems: 'center',
    m: 4,
    justifyContent: 'space-between',
  })(props.theme),
);

export const IconAspectRation = styled(AspectRatio)((props) =>
  css({
    width: '40px',
  })(props.theme),
);

export const CloseButtonIcon = styled(CloseButton)((props) =>
  css({
    display: { base: 'flex', md: 'none' },
  })(props.theme),
);
