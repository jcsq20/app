import {
  DateI18nProviderProps,
  DateI18nProvider,
} from '../DateI18nProvider/DateI18nProvider';
import {
  DatePickerProviderProps,
  DatePickerProvider,
} from '../DateProvider/DateProvider';
import { DateVisualizerProvider } from '../DateVisualizerProvider/DateVisualizerProvider';

const Providers: React.FC<{
  children?: React.ReactNode;
  datePickerProviderProps?: DatePickerProviderProps;
  dateI18nProviderProps?: DateI18nProviderProps;
  disableDate?: (date: Date) => boolean;
}> = ({
  children,
  datePickerProviderProps,
  dateI18nProviderProps,
  disableDate,
}) => (
  <DatePickerProvider {...datePickerProviderProps}>
    <DateVisualizerProvider disableDate={disableDate}>
      <DateI18nProvider {...dateI18nProviderProps}>{children}</DateI18nProvider>
    </DateVisualizerProvider>
  </DatePickerProvider>
);

export default Providers;
