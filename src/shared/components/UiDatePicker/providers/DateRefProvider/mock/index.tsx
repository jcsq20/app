import { RefObject } from 'react';
import { useDateRef } from '../../../hooks';
import { CustomInput } from '../../../utils/CustomInput';

/*
  Hook mock implementation for usage in components test
*/
customElements.define('custom-input', CustomInput, {
  extends: 'input',
});
const input = document.createElement('custom-input');

type IUseDateRefMock = ReturnType<typeof useDateRef>;
export const useDateRefMock = () => {
  const defaultMock: IUseDateRefMock = {
    current: input,
  } as RefObject<CustomInput>;

  return {
    implementation:
      (mock?: Partial<IUseDateRefMock>) => (): IUseDateRefMock => ({
        ...defaultMock,
        ...mock,
      }),
  };
};
