import { FiTrendingUp } from 'react-icons/fi';
import { render } from 'src/shared/utils/tests/test-utils';
import NavItem from './NavItem';

test('Render NavItem', () => {
  const component = render(
    <NavItem icon={FiTrendingUp} url="/someUrl">
      someLink
    </NavItem>
  );
  expect(component).toBeTruthy();
});
