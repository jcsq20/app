import { act } from 'react-dom/test-utils';
import { render } from 'src/shared/utils/tests/test-utils';
import AppModule from './AppModule';

test('Render AppModule', async () => {
  await act(async () => {
    const component = render(<AppModule />);
    expect(component).toBeTruthy();
  });
});
