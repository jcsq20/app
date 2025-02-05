import { Button, css } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const DotsBtn = styled(Button)((props) =>
  css({
    pointerEvents: 'none',
    variant: 'unstyled',
    colorScheme: 'neutral',
    _before: {
      content: '"..."',
    },
  })(props.theme),
);
