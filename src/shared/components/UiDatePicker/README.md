# Description

Component that behavior similarly to the input type date from `html <input type='date'>`

# Contents

- [Usage](#usage)
  - [Basic Usage](#basic-usage)
  - [Basic Usage as `Date`](#basic-usage-as-date)
  - [React Hook form](#use-with-react-hook-form)
  - [React Hook form as `Date`](#use-with-react-hook-form-as-date)
- [props](#props)
  - [`min`](#min-string-default-)
  - [`max`](#max-string-default-)
  - [`placeholder`](#placeholderstring-default-)
  - [`format`](#format-date-date-string-default-intldatetimeformat)
  - [`monthNames`](#monthnames-string-default-undefined)
  - [`dayNames`](#daynames-string-default-undefined)
  - [`selectingYearBackString`](#selectingyearbackstring-string-default-back)
  - [`disableDate`](#disabledate-date-date-boolean-default-undefined)

# Usage

## Basic usage

```tsx
const [value, setValue] = useState<string | undefined>(
  new Date().toISOString()
)

<UiDatePicker value={value} onChange={(ev) => setValue(ev.target.value)} />
```

## Basic usage as `Date`

```tsx
const [value, setValue] = useState<Date | undefined>(new Date())

<UiDatePicker
  value={value.toISOString()}
  onChange={(ev) => setValue(ev.target.valueAsDate)}
/>
```

# `React Hook form` (Full compatibility)

## Use with React Hook Form

```tsx
const { register } = useForm<{ date: string }>({
  defaultValues: {
    date: new Date().toISOString(),
  },
});

<UiDatePicker {...register('date')} />;
```

## Use with React Hook Form as `Date`

```tsx
const { register } = useForm<{ date: Date }>({
  defaultValues: {
    date: new Date(),
  },
})

<UiDatePicker {...register('date', { valueAsDate: true })} />
```

# Props

#### `min?: string` - Default: `''`

Any `string` that can be parsed to a Date object

```ts
<UiDatePicker min={new Date('2000-1-1').toISOString()} />
```

#### `max?: string` - Default: `''`

Any `string` that can be parsed to a Date object

```tsx
<UiDatePicker max={new Date('2000-1-1').toISOString()} />
```

#### `placeholder?: string` - Default: `''`

`String` to be displayed when no date is selected

```ts
<UiDatePicker placeholder="Birthday" />
```

#### `format?: (date: Date) => string` - Default: `Intl.DateTimeFormat`

`Function` that can be passed to format the Date to string, the default will convert the date to the users browsers `Intl.DateTimeFormat`, example: if the browser is set to `en`, the format will be: `M/DD/YYYY -> 1/30/2000`; for `pt-BR` the format will be `DD/MM/YYYY -> 30/01/2000`

But you can convert or use any converter library like `moment.js`

The below example will convert to `YYYY, M/D -> 2000, 1/30`

```tsx
<UiDatePicker
  format={(date: Date) =>
    `${date.getFullYear()}, ${date.getMonth() + 1}/${date.getDate()}`
  }
/>
```

#### `monthNames?: string[][]` - Default: `undefined`

An Array of 12 Arrays that contains the long and short names of the month `string[][]`; The index 0 is January, and index 11 is December. The default is the short and long names in `en`

```tsx
const monthNames = [
    ["Janeiro", "Jan"],
    ["Fevereiro", "Fev"],
    ["Março", "Mar"],
    ["Abril", "Abr"],
    ["Maio", "Mai"],
    ["Junho", "Jun"],
    ["Julho", "Jul"],
    ["Agosto", "Ago"],
    ["Setembro", "Set"],
    ["Outubro", "Out"],
    ["Novembro", "Nov"],
    ["Dezembro", "Dez"],
  ]

<UiDatePicker monthNames={monthNames} />;
```

#### `dayNames?: string[][]` - Default: `undefined`

An Array of 7 strings `string[]`; The index 0 is Sunday, and index 6 is Saturday. The default is the short names in `en`

```tsx
const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']

<UiDatePicker monthNames={monthNames} />
```

#### `selectingYearBackString?: string` - Default: `Back`

`String` on the button to return to Dates views

```tsx
<UiDatePicker selectingYearBackString="Voltar" />
```

#### `disableDate?: (date: Date) => boolean` - Default: `undefined`

`Function` that will disable dates when returning true

The bellow example will disable all Sundays and Saturdays

```tsx
<UiDatePicker
  disableDate={(date: Date) => date.getDay() === 0 || date.getDay() === 6}
/>
```
