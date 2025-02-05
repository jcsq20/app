import { Flex, IconButton, css, useColorModeValue } from '@chakra-ui/react';

import styled from '@emotion/styled';

export const Container = styled(Flex)((props) =>
  css({
    padding: 2,
    alignItems: 'center',
    bg: useColorModeValue('white', 'neutral.900'),
    borderBottomWidth: '1px',
    borderBottomColor: useColorModeValue('neutral.200', 'neutral.700'),
    justifyContent: 'flex-start',
  })(props.theme),
);

export const MenuButton = styled(IconButton)((props) =>
  css({
    variant: 'outline',
  })(props.theme),
);

export const IconAspectRation = styled(Flex)((props) =>
  css({
    ratio: '1',
    width: '40px',
    ml: 2,
  })(props.theme),
);
