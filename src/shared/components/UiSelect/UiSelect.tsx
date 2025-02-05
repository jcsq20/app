/* eslint-disable react/no-unstable-nested-components */
import { Select, SelectInstance, Props, GroupBase } from 'chakra-react-select';
import { Ref, forwardRef } from 'react';

type CustomRef<Option, IsMulti extends boolean> =
  | ((instance: SelectInstance<Option, IsMulti, GroupBase<Option>>) => void)
  | Ref<SelectInstance<Option, IsMulti, GroupBase<Option>>>
  | null;

export interface UiSelectProps<Option, IsMulti extends boolean>
  extends Props<Option, IsMulti> {
  ref?: CustomRef<Option, IsMulti>;
}

const FComponent = forwardRef(
  <Option, IsMulti extends boolean = false>(
    props: UiSelectProps<Option, IsMulti>,
    ref: CustomRef<Option, IsMulti>
  ) => (
    <Select
      useBasicStyles
      ref={ref}
      focusBorderColor="primary.500"
      colorScheme="primary"
      selectedOptionColor="primary"
      {...props}
    />
  )
);

export default FComponent as typeof Select;
