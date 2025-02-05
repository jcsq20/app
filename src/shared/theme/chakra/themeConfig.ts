import {
  extendTheme,
  DeepPartial,
  Theme,
  withDefaultColorScheme,
} from '@chakra-ui/react';
import components from './components';
import foundation from './foundation';

export const themeConfig = extendTheme(
  withDefaultColorScheme({
    colorScheme: 'primary',
  }),
  {
    components,
    ...foundation,
  } as DeepPartial<Theme>
);
