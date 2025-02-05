import {
  Flex as $Flex,
  Icon as $Icon,
  useColorModeValue,
  css,
} from '@chakra-ui/react';
import styled from '@emotion/styled';

export const Flex = styled($Flex)((props) =>
  css({
    align: 'center',
    p: '2',
    mx: '2',
    borderRadius: 'md',
    cursor: 'pointer',
    _hover: {
      bg: useColorModeValue('neutral.400', 'neutral.700'),
      color: 'white !important',
    },
    [`.active > &`]: {
      fontWeight: 'bold',
      color: 'var(--chakra-colors-primary-600)',
    },
  })(props.theme),
);

export const Icon = styled($Icon)((props) =>
  css({ mr: 5, fontSize: '16px' })(props.theme),
);
