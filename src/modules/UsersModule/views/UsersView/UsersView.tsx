import { Flex, Progress } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUserDTO } from 'src/shared/api/models';
import { UiPaginator } from 'src/shared/components';
import { useI18n } from 'src/shared/i18n';
import { UsersTable } from '../../components';
import { useUsersQuery } from '../../hooks';
import * as Styles from './styles';

const UsersView: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const { list, remove } = useUsersQuery();
  const { translate } = useI18n();

  const { isLoading, data, refetch } = list(page);
  const { isLoading: isRemoving } = remove;

  const handleRemove = useCallback(
    (user: IUserDTO) => {
      const deleteCall = async () => {
        await remove.mutateAsync(user.id);
        refetch();
      };
      deleteCall();
    },
    [refetch, remove]
  );

  return (
    <Flex
      direction="column"
      h="full"
      data-testid="@usersView"
      overflow="hidden"
    >
      <Flex direction="column" h="full" overflow="hidden">
        {!isLoading && !isRemoving ? (
          <UsersTable
            onUserEditClick={(user) => navigate(user.id.toString())}
            onUserDelete={(user) => handleRemove(user)}
            users={data}
          />
        ) : (
          <Progress size="xs" isIndeterminate />
        )}
      </Flex>
      <UiPaginator
        totalPages={10}
        page={page}
        onPageChange={setPage}
        style={{ padding: 20, alignSelf: 'center' }}
      />
      <Styles.Bottom>
        <Styles.NewButton
          onClick={() => navigate('new')}
          data-testid="@newUserBtn"
        >
          {translate('users.add')}
        </Styles.NewButton>
      </Styles.Bottom>
    </Flex>
  );
};

export default UsersView;
