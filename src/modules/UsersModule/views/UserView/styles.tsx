import { Flex, Box, css } from '@chakra-ui/react';

import styled from '@emotion/styled';

export const LeftArea = styled(Flex)((props) =>
  css({
    maxW: '350px',
    padding: 4,
    justifyContent: 'start',
    flexDirection: 'column',
    alignItems: 'center',
    display: { base: 'none', md: 'flex' },
  })(props.theme)
);

export const TopArea = styled(Box)((props) =>
  css({
    borderBottomWidth: 2,
    borderColor: 'primary.500',
    mx: 4,
    py: 4,
  })(props.theme)
);

export const MainView = styled(Flex)((props) =>
  css({
    flexDirection: 'column',
    h: 'full',
    w: 'full',
    overflow: 'auto',
    p: 4,
  })(props.theme)
);
