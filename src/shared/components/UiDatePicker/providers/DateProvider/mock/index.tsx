import { useDatePicker } from '../DateProvider';

/*
  Hook mock implementation for usage in components test
*/
type IUseDatePickerMock = ReturnType<typeof useDatePicker>;
export const useDatePickerMock = () => {
  const defaultMock: IUseDatePickerMock = {
    date: [new Date(), () => undefined],
  };

  return {
    implementation:
      (mock?: Partial<IUseDatePickerMock>) => (): IUseDatePickerMock => ({
        ...defaultMock,
        ...mock,
      }),
  };
};
