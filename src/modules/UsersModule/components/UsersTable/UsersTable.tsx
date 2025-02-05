import {
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainerProps,
  Stack,
  useDisclosure,
  AspectRatio,
  Image,
  Button,
} from '@chakra-ui/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import useI18n from 'src/shared/i18n/hooks/useI18n/useI18n';
import { APIModels } from 'src/shared/api';
import * as Styles from './styles';
import DeleteUsersModal from '../DeleteUserModal/DeleteUserModal';

export interface UsersTableProps extends TableContainerProps {
  users?: APIModels.IUserDTO[];
  onUserEditClick?: (user: APIModels.IUserDTO) => unknown;
  onUserDelete?: (user: APIModels.IUserDTO) => unknown;
}

const UsersTable: React.FC<UsersTableProps> = ({
  users = [],
  onUserEditClick = () => undefined,
  onUserDelete,
  ...props
}) => {
  const {
    isOpen: isOpenUserDeleteModal,
    onOpen: onOpenUserDeleteModal,
    onClose: onCloseUserDeleteModal,
  } = useDisclosure();
  const useDeleteModalRef = useRef(null);

  const { translate } = useI18n();
  const [userToDelete, setUserToDelete] = useState<
    APIModels.IUserDTO | undefined
  >(undefined);

  useEffect(() => {
    if (userToDelete) {
      onOpenUserDeleteModal();
    } else {
      onCloseUserDeleteModal();
    }
  }, [userToDelete, onOpenUserDeleteModal, onCloseUserDeleteModal]);

  const deleteUser = () => {
    // eslint-disable-next-line no-console
    if (userToDelete) {
      onUserDelete?.(userToDelete);
    }
  };

  const headers = useMemo(
    () =>
      [
        '',
        'id',
        'name',
        'username',
        'email',
        'accessLevel',
        'lastAccess',
        'birthday',
        '',
      ].map((e, i) => <Th key={i}>{e ? translate(`app.${e}`) : ''}</Th>),
    [translate],
  );

  const printRows = () =>
    users.map((user) => (
      <Tr key={user.id}>
        <Td>
          <AspectRatio width="50px" ratio={1}>
            <Image
              src={`https://picsum.photos/200?id=${user.id}`}
              objectFit="cover"
              borderRadius="full"
            />
          </AspectRatio>
        </Td>
        <Td>{user.id}</Td>
        <Td>{user.name}</Td>
        <Td>{user.userName}</Td>
        <Td>{user.email}</Td>
        <Td>
          {translate(
            `user.accessLevel.${user.accessLevel.value.toLowerCase()}`,
          )}
        </Td>
        <Td>{translate('intlDateTime', { date: new Date() })}</Td>
        <Td>{translate('intlDateTime', { date: new Date(user.birthday) })}</Td>

        <Td>
          <Stack direction="row" justifyContent="right" spacing={4}>
            <Button
              data-testid="@deleteUserBtn"
              onClick={() => {
                setUserToDelete(user);
              }}
              size="sm"
              variant="ghost"
              colorScheme="neutral"
            >
              <DeleteIcon />
            </Button>
            <Button
              data-testid="@editUserBtn"
              onClick={() => onUserEditClick(user)}
              leftIcon={<EditIcon />}
              size="sm"
            >
              {translate('app.edit')}
            </Button>
          </Stack>
        </Td>
      </Tr>
    ));

  return (
    <>
      <Styles.TableContainer {...props}>
        <Table variant="simple" colorScheme="neutral">
          <Styles.Thead>
            <Tr>{headers}</Tr>
          </Styles.Thead>
          <Tbody>{printRows()}</Tbody>
        </Table>
      </Styles.TableContainer>

      {userToDelete && (
        <DeleteUsersModal
          user={userToDelete}
          leastDestructiveRef={useDeleteModalRef}
          onConfirm={deleteUser}
          onClose={() => {
            setUserToDelete(undefined);
          }}
          isOpen={isOpenUserDeleteModal}
        />
      )}
    </>
  );
};

export default UsersTable;
