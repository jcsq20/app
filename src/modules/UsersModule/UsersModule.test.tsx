import { act } from 'react-dom/test-utils';
import { render } from 'src/shared/utils/tests/test-utils';
import UsersModule from './UsersModule';

test('Render AppModule', async () => {
  await act(async () => {
    const component = render(<UsersModule />);
    expect(component).toBeTruthy();
  });
});
