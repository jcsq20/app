import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  Button,
  MenuItem,
  Avatar,
  Box,
  Flex,
  HStack,
  MenuDivider,
  useColorMode,
  FlexProps,
} from '@chakra-ui/react';
import { FiChevronDown } from 'react-icons/fi';
import { useI18n } from 'src/shared/i18n';
import { useUserAuth } from '../../../hooks';
import * as Styles from './styles';

const UserMenu: React.FC<FlexProps> = ({ ...props }) => {
  const { user, signOut } = useUserAuth();
  const { colorMode, setColorMode } = useColorMode();
  const { locale, setLocale, translate } = useI18n();

  return (
    <Styles.Container {...props}>
      <Menu>
        <MenuButton maxW="100%">
          <HStack>
            <Avatar size="sm" src={user?.picture} />

            <Styles.TextWrapper>
              <Styles.TextName>{user?.name}</Styles.TextName>
              <Styles.TextUsername>{user?.userName}</Styles.TextUsername>
            </Styles.TextWrapper>

            <Box>
              <FiChevronDown />
            </Box>
          </HStack>
        </MenuButton>

        <Styles.UserMenuList>
          <MenuItem
            closeOnSelect={false}
            as="div"
            _hover={{ background: 'inherit' }}
          >
            <Flex justifyContent="space-between" w="full">
              {translate('app.theme')}
              <HStack>
                <Button
                  data-testid="@dark-button"
                  variant={colorMode === 'dark' ? 'solid' : 'ghost'}
                  onClick={() => setColorMode('dark')}
                  size="xs"
                >
                  <MoonIcon />
                </Button>

                <Button
                  data-testid="@light-button"
                  variant={colorMode === 'dark' ? 'ghost' : 'solid'}
                  size="xs"
                  onClick={() => setColorMode('light')}
                >
                  <SunIcon />
                </Button>
              </HStack>
            </Flex>
          </MenuItem>

          <MenuItem
            closeOnSelect={false}
            as="div"
            _hover={{ background: 'inherit' }}
          >
            <Flex
              justifyContent="space-between"
              w="full"
              data-testid="langContainer"
            >
              {translate('app.language')}
              <HStack>
                <Button
                  data-testid="@en-US-button"
                  variant={locale === 'en-US' ? 'solid' : 'ghost'}
                  onClick={() => setLocale('en-US')}
                  size="xs"
                >
                  🇺🇸
                </Button>
                <Button
                  data-testid="@pt-BR-button"
                  variant={locale === 'pt-BR' ? 'solid' : 'ghost'}
                  size="xs"
                  onClick={() => setLocale('pt-BR')}
                >
                  🇧🇷
                </Button>
              </HStack>
            </Flex>
          </MenuItem>
          <MenuDivider />
          <MenuItem data-testid="@signOutButton" onClick={signOut}>
            {translate('app.signOut')}
          </MenuItem>
        </Styles.UserMenuList>
      </Menu>
    </Styles.Container>
  );
};

export default UserMenu;
