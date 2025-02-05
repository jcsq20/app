import { BoxProps, Image } from '@chakra-ui/react';
import { useI18n } from 'src/shared/i18n';
import Logo from 'src/shared/assets/imgs/logo.svg';
import UserMenu from '../UserMenu/UserMenu';
import { LinkItems } from '../LinkItem';
import NavItem from '../NavItem/NavItem';
import * as Styles from './styles';

interface SidebarProps extends BoxProps {
  onClose?: () => void;
}

const SidebarContent: React.FC<SidebarProps> = ({ onClose, ...rest }) => {
  const { translate } = useI18n();

  return (
    <Styles.Container {...rest}>
      <Styles.Top>
        <Styles.IconAspectRation ratio={1}>
          <Image src={Logo} />
        </Styles.IconAspectRation>

        <Styles.CloseButtonIcon onClick={onClose} />
      </Styles.Top>

      <UserMenu />

      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          url={link.url}
          onClick={onClose}
        >
          {translate(`app.menus.${link.name}`)}
        </NavItem>
      ))}
    </Styles.Container>
  );
};

export default SidebarContent;
