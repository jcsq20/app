import { useDisclosure } from '@chakra-ui/react';
import { screen, act } from '@testing-library/react';
import { useRef } from 'react';
import { render } from 'src/shared/utils/tests/test-utils';
import { vi } from 'vitest';
import DeleteUserModal from './DeleteUserModal';

function setupHook(fn?: () => undefined) {
  const hook = {} as ReturnType<typeof useDisclosure>;
  // let hook: ReturnType<typeof useUserAuth> | undefined;
  function TestComponent() {
    const disclosure = useDisclosure();
    const ref = useRef(null);

    Object.assign(hook, disclosure);
    return (
      <div>
        <DeleteUserModal
          onClose={disclosure.onClose}
          user={{
            name: 'Test',
            userName: 'Test',
            id: 1,
            accessLevel: { id: 1, value: 'test' },
            email: 'test@',
            picture: '',
            tags: [{ id: 1, value: 'Patamon' }],
            birthday: new Date().toISOString(),
          }}
          isOpen={disclosure.isOpen}
          leastDestructiveRef={ref}
          onConfirm={fn}
        />
      </div>
    );
  }
  const component = () => render(<TestComponent />);
  return {
    component,
    hook,
  };
}

test('Should open modal', async () => {
  const mockFn = vi.fn();

  const { hook, component } = setupHook(mockFn);

  await act(async () => {
    component();
  });

  await act(async () => {
    hook.onOpen();
  });

  const modal = screen.getByTestId('@deleteUserModal');
  expect(modal).toBeTruthy();
});

test('Should trigger confirm default fn', async () => {
  const { hook, component } = setupHook();

  await act(async () => {
    component();
  });

  await act(async () => {
    hook.onOpen();
  });

  await act(async () => {
    const btn = screen.getByTestId('@deleteUserModalYes');
    btn.click();
  });
});

test('Should trigger confirm', async () => {
  const mockFn = vi.fn();

  const { hook, component } = setupHook(mockFn);

  await act(async () => {
    component();
  });

  await act(async () => {
    hook.onOpen();
  });

  await act(async () => {
    const btn = screen.getByTestId('@deleteUserModalYes');
    btn.click();
  });

  expect(mockFn).toBeCalled();
});
