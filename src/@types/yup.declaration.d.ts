declare module '@hookform/resolvers/yup' {
  import { ValidationOptions } from 'yup';
  import { FieldValues, ResolverError } from 'react-hook-form';

  export function yupResolver<T>(
    schema: T,
    options?: ValidationOptions
  ): (data: FieldValues) => Promise<ResolverError<T>>;
}
