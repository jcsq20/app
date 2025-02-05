import { Flex, css } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const Nav = styled(Flex)((props) =>
  css({
    h: 'full',
    flexDirection: 'column',
    '@media screen and (min-width: 48em)': {
      flexDirection: 'row',
    },
  })(props.theme)
);

export default Nav;
