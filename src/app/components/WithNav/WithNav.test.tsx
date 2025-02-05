import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { render } from 'src/shared/utils/tests/test-utils';
import * as Hooks from 'src/app/hooks';
import { useUserAuthMock } from 'src/app/hooks/useUserAuth/mock';
import { vi } from 'vitest';
import WithNav from './WithNav';

beforeEach(() => {
  vi.spyOn(Hooks, 'useUserAuth').mockImplementation(
    useUserAuthMock().implementation()
  );
});

test('Render WithNav but do not display the children', async () => {
  vi.spyOn(Hooks, 'useUserAuth').mockImplementation(
    useUserAuthMock().implementation({ isSignedIn: false })
  );
  await act(async () => {
    const component = render(
      <WithNav>
        <div />
      </WithNav>
    );
    expect(component).toBeTruthy();
  });

  const nav = screen.queryByTestId('@navContainer');
  expect(nav).toBeFalsy();
});

test('Should display if signedIn', async () => {
  await act(async () => {
    render(
      <WithNav>
        <div />
      </WithNav>
    );
  });
  const nav = screen.queryByTestId('@navContainer');
  expect(nav).toBeTruthy();
});
