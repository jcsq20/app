import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render, RenderOptions } from '@testing-library/react';
import SharedModule from 'src/shared';
// import AppProviders from '../../../app/providers';

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <SharedModule>{children}</SharedModule>
);

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options });

export { customRender as render };
