import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';
import AuthModule from './AuthModule';

test('Render AppModule', async () => {
  await act(async () => {
    const component = render(<AuthModule onSignIn={() => {}} />);
    expect(component).toBeTruthy();
  });
});
