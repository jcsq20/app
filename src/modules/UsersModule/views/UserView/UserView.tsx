import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Progress,
  Radio,
  RadioGroup,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useI18n } from 'src/shared/i18n';
import { UiDatePicker, UiSelect } from 'src/shared/components';
import { API, APIModels } from 'src/shared/api';
import { useQueries } from '@tanstack/react-query';
import { useCallback } from 'react';
import useSignInFormScheme, { IUserForm } from './useUserFormScheme';
import * as Styles from './styles';
import { UserArea } from '../../components';
import { useUsersQuery } from '../../hooks';

export interface UserViewProps {
  user?: APIModels.IUserDTO;
}

const UserView: React.FC<UserViewProps> = ({
  user = {
    id: 0,
    name: '',
    userName: '',
    email: '',
    accessLevel: {
      id: 1,
      value: 'Director',
    },
    picture: '',
    tags: [],
    birthday: '',
  },
}) => {
  const navigate = useNavigate();
  const formScheme = useSignInFormScheme();
  const { translate } = useI18n();
  const toast = useToast();
  const { update, create } = useUsersQuery();

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<IUserForm>({
    resolver: yupResolver(formScheme),
    defaultValues: {
      ...user,
      birthday: user.birthday,
      accessLevel: user?.accessLevel.id.toString(),
      tags: user.tags.map(({ id }) => id),
    },
  });

  const [name, userName, picture] = watch(['name', 'userName', 'picture']);

  const getTags = ({ signal }: { signal?: AbortSignal | undefined }) =>
    API.Tags.list({ signal }).response;
  const getAccessLevels = ({ signal }: { signal?: AbortSignal | undefined }) =>
    API.AccessLevel.list({ signal }).response;

  const combinedRequest = useQueries({
    queries: [
      { queryFn: getTags, queryKey: ['tags'] },
      { queryFn: getAccessLevels, queryKey: ['accessLevel'] },
    ],
  });

  const isLoading = combinedRequest.some(({ isLoading }) => !!isLoading);
  const [{ data: tags }, { data: accessLevelList }] = combinedRequest;

  const onSubmit: SubmitHandler<IUserForm> = async (data) => {
    const userData = {
      ...data,
      accessLevel: parseInt(data.accessLevel, 10),
    };
    try {
      if (user.id) {
        await update.mutateAsync({ id: user.id, user: userData });
      } else {
        await create.mutateAsync(userData);
      }
      navigate('/users');
    } catch {
      toast({ title: 'Err' });
    }
  };

  const handleImageChange = (image?: File) => {
    setValue('picture', image || '');
  };

  const printAccessLevel = useCallback(
    () => (
      <FormControl isInvalid={!!errors.accessLevel} data-testid="test">
        <FormLabel>{translate('app.accessLevel')}</FormLabel>
        <RadioGroup defaultValue={user.accessLevel.id.toString()}>
          <HStack spacing={4}>
            {accessLevelList?.map(({ id, value }) => (
              <Radio
                data-testid={`@inputAccesslevel-${id}`}
                key={id}
                isReadOnly={isSubmitting}
                {...register('accessLevel')}
                value={id.toString()}
              >
                {translate(`user.accessLevel.${value.toLowerCase()}`)}
              </Radio>
            ))}
          </HStack>
        </RadioGroup>
        <FormErrorMessage>{errors.accessLevel?.message}</FormErrorMessage>
      </FormControl>
    ),
    [
      accessLevelList,
      errors.accessLevel,
      isSubmitting,
      register,
      translate,
      user.accessLevel.id,
    ]
  );

  return isLoading ? (
    <Progress size="xs" isIndeterminate data-testid="@userViewLoading" />
  ) : (
    <Flex flexDirection="row" h="full" data-testid="@userView">
      <Styles.LeftArea>
        <UserArea
          name={name}
          userName={userName}
          picture={picture}
          onChangePic={handleImageChange}
        />
      </Styles.LeftArea>

      <Flex direction="column" h="full" w="full">
        <Styles.TopArea>
          <Button
            variant="ghost"
            size="sm"
            mr={2}
            data-testid="@backButton"
            onClick={() => navigate('/users')}
          >
            <ArrowBackIcon />
          </Button>
          {translate(user.id ? 'user.edit' : 'user.new')}
        </Styles.TopArea>

        <Styles.MainView>
          <UserArea
            display={{ base: 'flex', md: 'none' }}
            marginBottom={4}
            name={name}
            userName={userName}
            picture={picture}
            onChangePic={handleImageChange}
          />

          <Stack
            spacing={5}
            onSubmit={handleSubmit(onSubmit)}
            as="form"
            direction="column"
          >
            <FormControl isInvalid={!!errors.name}>
              <FormLabel htmlFor="name">{translate('app.name')}</FormLabel>

              <Input
                id="name"
                placeholder={translate('app.name')}
                {...register('name')}
                isReadOnly={isSubmitting}
                data-testid="@inputName"
              />

              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.userName}>
              <FormLabel htmlFor="userName">
                {translate('app.username')}
              </FormLabel>

              <Input
                data-testid="@inputUsername"
                id="userName"
                autoComplete="off"
                placeholder={translate('app.username')}
                {...register('userName')}
                isReadOnly={isSubmitting}
              />

              <FormErrorMessage>{errors.userName?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">{translate('app.email')}</FormLabel>

              <Input
                data-testid="@inputEmail"
                id="email"
                placeholder="Email"
                {...register('email')}
                isReadOnly={isSubmitting}
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!errors.tags}
              data-testid="@tagSelectFormControl"
            >
              <FormLabel htmlFor="tags">{translate('app.tags')}</FormLabel>
              <Controller
                control={control}
                name="tags"
                render={({ field: { onChange, name, value } }) => (
                  <UiSelect
                    id="tags"
                    noOptionsMessage={() =>
                      translate('components.select.noOptions')
                    }
                    placeholder={translate('app.tags')}
                    isMulti
                    name={name}
                    variant="flushed"
                    options={tags}
                    getOptionLabel={(tag) => tag.value}
                    getOptionValue={(tag) => tag.id.toString()}
                    defaultValue={user.tags?.filter(({ id }) =>
                      value.includes(id)
                    )}
                    onChange={(value) => onChange(value.map(({ id }) => id))}
                  />
                )}
              />
              <FormErrorMessage>{errors.tags?.message}</FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={!!errors.birthday}
              data-testid="@birthdayFormControl"
            >
              <FormLabel htmlFor="birthday">
                {translate('user.birthday')}
              </FormLabel>

              <UiDatePicker
                id="birthday"
                data-testid="@inputBirthday"
                placeholder={translate('user.birthday')}
                {...register('birthday')}
              />
              <FormErrorMessage>{errors.birthday?.message}</FormErrorMessage>
            </FormControl>

            {printAccessLevel()}

            <Button
              data-testid="@submitBtn"
              isLoading={isSubmitting}
              type="submit"
              maxW="max-content"
              alignSelf="flex-end"
            >
              {translate('app.save')}
            </Button>
          </Stack>
        </Styles.MainView>
      </Flex>
    </Flex>
  );
};

export default UserView;
