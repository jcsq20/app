import { render } from 'src/shared/utils/tests/test-utils';
import AppProviders from 'src/app/providers';
import SideBar from './SideBar';

test('Render SideBar', () => {
  const component = render(
    <AppProviders>
      <SideBar onClose={() => undefined} />
    </AppProviders>
  );
  expect(component).toBeTruthy();
});
