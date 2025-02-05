import ReactDOM from 'react-dom/client';
import SharedModule from './shared';
import AppModule from './app/AppModule';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <SharedModule>
    <AppModule />
  </SharedModule>
);
