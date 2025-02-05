import { DeepPartial, InputProps, Theme } from '@chakra-ui/react';

type IInput = DeepPartial<Theme['components']['Input']>;
type ExtIInput = IInput & {
  defaultProps: InputProps;
};

export const Input: ExtIInput = {
  defaultProps: {
    variant: 'flushed',
    focusBorderColor: 'primary.500',
  },
};
