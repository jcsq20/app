import {
  ChakraProvider,
  ChakraProviderProps,
  ColorModeProvider,
  extendTheme,
} from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { themeConfig } from '../../chakra/themeConfig';

export type UiThemeProviderProps = ChakraProviderProps;

/**
 * Theme provider, It already comes with a theme
 *
 * Can be overwritten by passing `theme` props
 * @see Docs https://chakra-ui.com/docs/styled-system/theming/theme
 */
const UiThemeProvider: React.FC<UiThemeProviderProps> = ({
  children,
  ...chakraProviderProps
}) => {
  const theme = useMemo(
    () => extendTheme({ ...themeConfig, ...chakraProviderProps.theme }),
    [chakraProviderProps.theme]
  );
  return (
    <ChakraProvider {...chakraProviderProps} theme={theme}>
      <ColorModeProvider>{children}</ColorModeProvider>
    </ChakraProvider>
  );
};

export default UiThemeProvider;
