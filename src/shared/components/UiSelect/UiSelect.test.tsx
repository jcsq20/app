import { render } from 'src/shared/utils/tests/test-utils';
import UiSelect from './UiSelect';

const options = [
  {
    label: 'I am red1',
    value: { x: 1 },
  },
  {
    label: 'I am red2',
    value: { x: 1 },
  },
  {
    label: 'I am red3',
    value: { x: 1 },
  },
];

test('Test render component', () => {
  const component = render(<UiSelect options={options} />);
  expect(component).toBeTruthy();
});
