import { FlexProps } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { NavLink } from 'react-router-dom';
import * as Styles from './styles';

export interface NavItemProps extends FlexProps {
  icon: IconType;
  url: string;
  children: React.ReactNode;
}
const NavItem: React.FC<NavItemProps> = ({ icon, children, url, ...rest }) => (
  <NavLink to={url}>
    <Styles.Flex {...rest}>
      <Styles.Icon as={icon} />
      {children}
    </Styles.Flex>
  </NavLink>
);

export default NavItem;
