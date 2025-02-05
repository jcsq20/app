import { Button, Flex, css, useColorModeValue } from '@chakra-ui/react';

import styled from '@emotion/styled';

export const Bottom = styled(Flex)((props) =>
  css({
    flexDirection: 'column',
    borderTop: '1px',
    borderTopColor: useColorModeValue('neutral.200', 'neutral.700'),
    bg: useColorModeValue('neutral.100', 'neutral.900'),
  })(props.theme),
);

export const NewButton = styled(Button)((props) =>
  css({
    alignSelf: 'flex-end',
    m: 4,
  })(props.theme),
);
