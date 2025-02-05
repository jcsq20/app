import { QueryClientProvider } from '@tanstack/react-query';
import { client } from '../client';

const ReactQueryClientProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;

export default ReactQueryClientProvider;
