import { render } from 'src/shared/utils/tests/test-utils';
import MobileNav from './MobileNav';

test('Render WithNav', () => {
  const component = render(<MobileNav />);
  expect(component).toBeTruthy();
});
