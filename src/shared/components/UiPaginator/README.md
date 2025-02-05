# Description

Component that behavior similarly to the input type date from `html <input type='date'>`

# Contents

- [Usage](#usage)
  - [Basic Usage](#basic-usage)
- [Props](#props)
- [Extra Props](#extra-props)
  - [`totalPages`](#totalpages-number-required)
  - [`page`](#page-number-required)
  - [`onPageChange`](#onpagechange-page-number-unknown-default-undefined)
  - [`size`](#size-lg-md-sm-xs-default-md)
  - [`colorScheme`](#colorscheme-string-default-primary)

# Usage

## Basic usage

```tsx
const [page, setPage] = useState<number>(1)

<UiPaginator totalPages={20} page={page} onPageChange={(page: number) => setPage(page)} />
```

# Props

`<UiPaginator />` is an extension of `<HStack />` from [Chakra UI](https://chakra-ui.com/docs/components/stack)

So it receives all props from `StackProps` interface : [StackProps](https://chakra-ui.com/docs/components/stack/props)

# Extra Props

#### `totalPages: number` required

Number of the pages of the paginator

```tsx
<UiPaginator totalPages={20} page={1} />
```

#### `page: number` required

Current page

```tsx
<UiPaginator totalPages={20} page={1} />
```

#### `onPageChange?: (page: number) => unknown ` - Default `undefined`

Event that is fired when ever the user changes the page

```tsx
<UiPaginator totalPages={20} page={1} onPageChange={handlePageChange} />
```

#### `size?: "lg" | "md" | "sm" | "xs" ` - Default `"md"`

Size for the paginator buttons

```tsx
<UiPaginator totalPages={20} page={1} size={'xs'} />
```

#### `colorScheme?: string ` - Default `"primary"`

Color scheme for the buttons

```tsx
<UiPaginator totalPages={20} page={1} colorScheme="red" />
```
