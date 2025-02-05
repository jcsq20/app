import { FlexProps, Image } from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import Logo from 'src/shared/assets/imgs/logo.svg';
import * as Styles from './styles';

export interface MobileNavProps extends FlexProps {
  onOpen?: () => unknown;
}

const MobileNav: React.FC<MobileNavProps> = ({ onOpen, ...rest }) => (
  <Styles.Container {...rest}>
    <Styles.MenuButton
      aria-label="open menu"
      onClick={onOpen}
      icon={<FiMenu />}
    />
    <Styles.IconAspectRation>
      <Image src={Logo} />
    </Styles.IconAspectRation>
  </Styles.Container>
);

export default MobileNav;
