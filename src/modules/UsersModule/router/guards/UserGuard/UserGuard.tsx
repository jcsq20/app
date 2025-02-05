import { Progress, useToast } from '@chakra-ui/react';
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useUsersQuery } from 'src/modules/UsersModule/hooks';
import { APIModels } from 'src/shared/api';
import { useI18n } from 'src/shared/i18n';

const UserGuard: React.FC<{
  component?: React.ReactElement;
  children?: (
    user: APIModels.IUserDTO,
    isLoading: boolean
  ) => React.ReactElement;
}> = ({ component, children }) => {
  const { id } = useParams();
  const toast = useToast();
  const { translate } = useI18n();

  const {
    data: user,
    isLoading,
    isError,
  } = useUsersQuery().getById(parseInt(id!, 10));

  const render = () => (children ? children(user!, isLoading) : component!);

  const handleToast = () => {
    const title = translate('users.guard.userId', { userId: id });

    const description = translate('users.guard.userId.description');
    toast({
      title,
      description,
      status: 'warning',
      duration: 3000,
      isClosable: true,
    });
  };

  const redirect = () => {
    setTimeout(handleToast);
    return <Navigate to="/" replace />;
  };

  if (isLoading && !isError) {
    return <Progress size="xs" isIndeterminate />;
  }
  return user && !isError ? render() : redirect();
};

export default UserGuard;
