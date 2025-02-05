/* eslint-disable react/jsx-no-bind */
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogProps,
  Button,
  Text,
} from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { Trans } from 'react-i18next';
import { APIModels } from 'src/shared/api';
import { useI18n } from 'src/shared/i18n';

type IAlertDialogProps = Omit<AlertDialogProps, 'children'>;

export interface DeleteUsersModalProps extends IAlertDialogProps {
  onConfirm?: () => unknown;
  user: APIModels.IUserDTO;
}

const DeleteUsersModal: React.FC<DeleteUsersModalProps> = ({
  leastDestructiveRef,
  user,
  onClose,
  onConfirm = () => undefined,
  ...props
}) => {
  const handleConfirm = useCallback(() => {
    onConfirm();
    onClose();
  }, [onConfirm, onClose]);

  const { translate } = useI18n();

  return (
    <AlertDialog
      leastDestructiveRef={leastDestructiveRef}
      onClose={onClose}
      {...props}
    >
      <AlertDialogOverlay />

      <AlertDialogContent data-testid="@deleteUserModal">
        <AlertDialogHeader>
          {translate('users.modal.delete.title')}
        </AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          <Trans
            i18nKey="users.modal.delete.username"
            values={{ username: user.name }}
            username={user.name}
          >
            <Text as="span">
              {'<0>'}
              <Text as="span" fontWeight="bold">
                {'<1>'}
              </Text>
              {'</0>'}
            </Text>
          </Trans>
          {/* {translate('users.modal.delete.userName', {
              userName: (
                <Text as="span" fontWeight="bold">
                  {user.name}
                </Text>
              ),
            })} */}
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button
            data-testid="@deleteUserModalYes"
            variant="link"
            colorScheme="secondary"
            onClick={handleConfirm}
          >
            {translate('app.yes')}
          </Button>
          <Button
            data-testid="@deleteUserModalNo"
            ml={3}
            ref={leastDestructiveRef as React.LegacyRef<HTMLButtonElement>}
            onClick={onClose}
          >
            {translate('app.no')}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUsersModal;
