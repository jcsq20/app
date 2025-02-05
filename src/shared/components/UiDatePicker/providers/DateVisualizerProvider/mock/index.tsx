/*
  Hook mock implementation for usage in components test
*/

import { useVisualizeDatePicker } from '../../../hooks';
import { findYearIndex } from '../../../utils/findYearIndex';

type IUseVisualizeDatePickerMock = ReturnType<typeof useVisualizeDatePicker>;
export const useVisualizeDatePickerMock = () => {
  const defaultMock: IUseVisualizeDatePickerMock = {
    date: [new Date(), () => undefined],
    selectingYear: [false, () => undefined],
    yearScrollIndex: [findYearIndex(new Date()), () => undefined],
    disableDate: () => undefined as any,
  };

  return {
    implementation:
      (mock?: Partial<IUseVisualizeDatePickerMock>) =>
      (): IUseVisualizeDatePickerMock => ({ ...defaultMock, ...mock }),
  };
};
