import { act } from 'react-dom/test-utils';
import { render } from 'src/shared/utils/tests/test-utils';
import locales from 'src/shared/i18n/locales';
import { screen } from '@testing-library/react';
import * as Hooks from 'src/app/hooks';
import { useUserAuthMock } from 'src/app/hooks/useUserAuth/mock';
import { vi, vitest } from 'vitest';
import UserMenu from './UserMenu';

beforeEach(() => {
  vi.spyOn(Hooks, 'useUserAuth').mockImplementation(
    useUserAuthMock().implementation()
  );
});

test('Render UserMenu', () => {
  const component = render(<UserMenu />);
  expect(component).toBeTruthy();
});

test('Should change to darkMode and Then to lightMode', async () => {
  await act(async () => {
    render(<UserMenu />);
  });

  const buttonDark = screen.getByTestId('@dark-button');
  const buttonLight = screen.getByTestId('@light-button');
  const initDarkClass = buttonDark?.className;

  act(() => {
    buttonDark?.click();
  });
  const afterDarkClass = buttonDark?.className;

  expect(initDarkClass).not.toBe(afterDarkClass);

  act(() => {
    buttonLight?.click();
  });
  const afterLightClass = buttonDark?.className;

  expect(initDarkClass).toBe(afterLightClass);
});

test('Should change Locale and back', async () => {
  const component = render(<UserMenu />);

  const getTextToTest = () =>
    component.findByTestId('langContainer').then((e) => e.textContent);
  const locale =
    Object.keys(locales).find((e) => e === navigator.language) || 'en-US';

  const ptButton = screen.getByTestId('@pt-BR-button');
  const enButton = screen.getByTestId('@en-US-button');

  const initButton = locale === 'en-US' ? ptButton : enButton;
  const secButton = locale !== 'en-US' ? ptButton : enButton;

  const initTextValue = await getTextToTest();

  act(() => {
    initButton?.click();
  });

  const afterClickTextValue = await getTextToTest();

  expect(initTextValue).not.toEqual(afterClickTextValue);

  act(() => {
    secButton?.click();
  });

  const afterSecClickTextValue = await getTextToTest();

  expect(initTextValue).toEqual(afterSecClickTextValue);
});

test('Should signOutUser', async () => {
  const signOut = vitest.fn();
  vi.spyOn(Hooks, 'useUserAuth').mockImplementation(
    useUserAuthMock().implementation({
      signOut,
    })
  );
  render(<UserMenu />);

  const signOutBtn = screen.getByTestId('@signOutButton');

  await act(async () => {
    signOutBtn?.click();
  });

  expect(signOut).toBeCalled();
});
