import {
  useDateI18n,
  DAY_NAMES,
  MONTH_NAMES,
  SELECTING_YEAR_BACK_STRING,
} from '../DateI18nProvider';

/*
  Hook mock implementation for usage in components test
*/
type IUseDateI18nMock = ReturnType<typeof useDateI18n>;
export const useDateI18nMock = () => {
  const defaultMock: IUseDateI18nMock = {
    dayNames: DAY_NAMES,
    monthNames: MONTH_NAMES,
    selectingYearBackString: SELECTING_YEAR_BACK_STRING,
  };

  return {
    implementation:
      (mock?: Partial<IUseDateI18nMock>) => (): IUseDateI18nMock => ({
        ...defaultMock,
        ...mock,
      }),
  };
};
