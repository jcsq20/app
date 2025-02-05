import { Drawer, DrawerContent, useDisclosure } from '@chakra-ui/react';
import { useUserAuth } from '../../hooks';
import MobileNav from './MobileNav/MobileNav';
import SidebarContent from './Sidebar/SideBar';
import * as Styles from './styles';

const WithNav: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isSignedIn } = useUserAuth();

  return isSignedIn ? (
    <Styles.Nav data-testid="@navContainer">
      <SidebarContent
        onClose={onClose}
        display={{ base: 'none', md: 'flex' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} display={{ base: 'flex', md: 'none' }} />

      {children}
    </Styles.Nav>
  ) : (
    <>{children}</>
  );
};

export default WithNav;
