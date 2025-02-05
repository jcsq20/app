import { CustomInput } from './CustomInput';

customElements.define('custom-input', CustomInput, {
  extends: 'input',
});

test('Should exec', () => {
  const input = new CustomInput();

  const date = new Date();

  input.valueAsNumber = date.getTime();
  input.min = date.toISOString();
  input.max = date.toISOString();

  const { minAsDate, maxAsDate, valueAsNumber } = input;

  expect(minAsDate.getTime()).toBe(date.getTime());
  expect(maxAsDate.getTime()).toBe(date.getTime());

  expect(valueAsNumber).toBe(date.getTime());
});

test('Should set undefined when error on parse date', () => {
  const input = new CustomInput();

  input.valueAsNumber = 'ssss' as any;

  expect(input.value).toBe('');
  expect(input.valueAsNumber).toBe(NaN);

  input.valueAsDate = null;
  expect(input.value).toBe('');

  input.valueAsNumber = null as any;
  expect(input.value).toBe('');
});
