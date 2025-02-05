import {
  Flex,
  VStack,
  TextProps,
  Text,
  useColorModeValue,
  MenuList,
  css,
} from '@chakra-ui/react';
import styled from '@emotion/styled';

export const Container = styled(Flex)((props) =>
  css({
    justifyContent: 'center',
    py: 2,
    px: 4,
    bg: useColorModeValue('neutral.100', 'neutral.900'),
  })(props.theme),
);

export const TextWrapper = styled(VStack)((props) =>
  css({
    alignItems: 'flex-start',
    spacing: '1px',
    maxW: 'full',
    overflow: 'hidden',
  })(props.theme),
);

export const defaultTextStyle: TextProps = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxW: '100%',
  whiteSpace: 'nowrap',
};

export const TextName = styled(Text)((props) =>
  css({
    ...defaultTextStyle,
    fontSize: 'sm',
    color: useColorModeValue('neutral.900', 'neutral.100'),
  })(props.theme),
);

export const TextUsername = styled(Text)((props) =>
  css({
    ...defaultTextStyle,
    fontSize: 'xs',
    color: useColorModeValue('neutral.600', 'neutral.400'),
  })(props.theme),
);

export const UserMenuList = styled(MenuList)((props) =>
  css({
    bg: useColorModeValue('white', 'neutral.900'),
    borderColor: useColorModeValue('neutral.200', 'neutral.700'),
  })(props.theme),
);
