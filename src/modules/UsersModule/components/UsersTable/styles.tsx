import {
  TableContainer as $TableContainer,
  Thead as $Thead,
  css,
} from '@chakra-ui/react';
import styled from '@emotion/styled';

export const TableContainer = styled($TableContainer)((props) =>
  css({
    height: '100%',
    overflow: 'auto',
  })(props.theme)
);

export const Thead = styled($Thead)((props) =>
  css({
    position: 'sticky',
    top: 0,
    backgroundColor: 'var(--chakra-colors-chakra-body-bg)',
    zIndex: 1,
  })(props.theme)
);
