import { act, fireEvent, screen } from '@testing-library/react';
import { render } from 'src/shared/utils/tests/test-utils';

import { vi } from 'vitest';
import UserArea from './UserArea';

const blob = new Blob(['0'], { type: 'image/png' });
const imageFile = new File([blob], 'test.png', { type: 'image/png' });

test('Render UsersView', async () => {
  await act(async () => {
    const component = render(<UserArea />);
    expect(component).toBeTruthy();
  });
});

test('should trigger image change handler', async () => {
  const mockFn = vi.fn();

  await act(async () => {
    render(<UserArea onChangePic={mockFn} />);
  });
  const btn = screen.getByTestId('@changeImgBtn');
  const fileInput = screen.getByTestId('@fileInput');

  await act(async () => {
    btn.click();
    fireEvent.change(fileInput, { target: { files: [imageFile] } });
  });

  expect(mockFn).toBeCalled();
});

test('should not trigger image change handler', async () => {
  const mockFn = vi.fn();

  await act(async () => {
    render(<UserArea onChangePic={mockFn} />);
  });
  const btn = screen.getByTestId('@changeImgBtn');
  const fileInput = screen.getByTestId('@fileInput');
  const fn = vi.fn();

  await act(async () => {
    fileInput.addEventListener('click', fn);
    btn.click();
    fireEvent.change(fileInput, { target: { files: false } });
  });
  expect(fn).toBeCalled();
  expect(mockFn).not.toBeCalled();
});

test('should not trigger default onChangePick', async () => {
  await act(async () => {
    render(<UserArea />);
  });
  const btn = screen.getByTestId('@changeImgBtn');
  const fileInput = screen.getByTestId('@fileInput');

  await act(async () => {
    btn.click();
    fireEvent.change(fileInput, { target: { files: [imageFile] } });
  });
});

test('should covert the image to URI', async () => {
  const mockFn = vi.fn().mockReturnValue('blob:myURI');
  global.URL.createObjectURL = mockFn;
  await act(async () => {
    render(<UserArea picture={imageFile} />);
  });

  expect(mockFn).toBeCalled();
});

// test('should removeImg and trigger on change', async () => {
//   const mockFn = vi.fn();
//   await act(async () => {
//     render(<UserArea picture={imageFile} onChangePic={mockFn} />);
//   });

//   const removeBtn = screen.getByTestId('@removeImgBtn');
//   await act(async () => {
//     removeBtn.click();
//   });
//   expect(mockFn).toBeCalledWith();
// });

// Q: how to mock URL object in vitest?
// test('should not covert the image to URI', async () => {
//   const mockFn = vi.fn().mockReturnValue('blob:myURI');
//   global.URL.createObjectURL = mockFn;
//   await act(async () => {
//     render(<UserArea />);
//   });

test('should removeImg and trigger on change', async () => {
  const mockFn = vi.fn();
  const mockUrlFn = vi.fn().mockReturnValue('blob:myURI');
  global.URL.createObjectURL = mockUrlFn;
  await act(async () => {
    render(<UserArea picture={imageFile} onChangePic={mockFn} />);
  });

  const removeBtn = screen.getByTestId('@removeImgBtn');
  await act(async () => {
    removeBtn.click();
  });
  expect(mockFn).toBeCalledWith();
});
