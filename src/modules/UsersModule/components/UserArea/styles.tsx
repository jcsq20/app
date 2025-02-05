import { Box, useColorModeValue, Text, css } from '@chakra-ui/react';

import styled from '@emotion/styled';

export const Content = styled(Box)((props) =>
  css({
    bg: useColorModeValue('blackAlpha.50', 'blackAlpha.300'),
    maxW: '100%',
    w: 'full',
    boxShadow: 'md',
    rounded: 'lg',
    p: 6,
    textAlign: 'center',
  })(props.theme),
);

export const Name = styled(Text)((props) =>
  css({
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    fontSize: '2xl',
    fontWeight: 600,
  })(props.theme),
);

export const Username = styled(Text)((props) =>
  css({
    fontWeight: 600,
    color: 'neutral.500',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    mb: 4,
  })(props.theme),
);
