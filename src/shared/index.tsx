import { ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { I18nProvider } from 'src/shared/i18n';
import { UiThemeProvider } from 'src/shared/theme';
import ReactQueryClientProvider from './reactQuery/providers/ReactQueryClientProvider';

const SharedModule: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  // Translate Provider
  <I18nProvider>
    {/* // Router controller for web */}
    <BrowserRouter>
      {/* // UiTheme provider from the UiPackage */}
      <UiThemeProvider>
        {/* React query provider */}
        <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
      </UiThemeProvider>
      <ColorModeScript />
    </BrowserRouter>
  </I18nProvider>
);

export default SharedModule;
