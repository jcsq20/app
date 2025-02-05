import { Flex } from '@chakra-ui/react';
import { WithNav } from './components';
import AppProviders from './providers';

import AppRouter from './router/AppRouter';

function AppModule() {
  return (
    // App Providers
    <AppProviders>
      <WithNav>
        {/* Wrapper view where the modules are printed */}
        <Flex
          direction="column"
          h="full"
          w="full"
          overflow="hidden"
          style={{ zIndex: 0 }}
        >
          {/* App Router */}
          <AppRouter />
        </Flex>
      </WithNav>
    </AppProviders>
  );
}

export default AppModule;
