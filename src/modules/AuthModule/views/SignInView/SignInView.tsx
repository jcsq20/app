import {
  Button,
  FlexProps,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { API } from 'src/shared/api';
import { useI18n } from 'src/shared/i18n';
import useSignInFormScheme, { ISingInForm } from './useSigninFormScheme';
import * as Styles from './styles';

export interface SignInViewProps extends FlexProps {
  onSignIn?: (user: any) => unknown;
}

const SignInView: React.FC<SignInViewProps> = ({
  onSignIn = () => undefined,
  ...flexProps
}) => {
  const { translate } = useI18n();
  const formScheme = useSignInFormScheme();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ISingInForm>({
    resolver: yupResolver(formScheme),
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onSubmit: SubmitHandler<ISingInForm> = async (data) => {
    const { response } = API.Auth.signIn(data);
    const user = await response;
    onSignIn(user);
  };

  return (
    <Styles.Container {...flexProps} data-testid="@signInView">
      <Styles.LoginBox>
        <Styles.LogoArea>
          <Styles.Logo />
        </Styles.LogoArea>

        <Styles.FormArea onSubmit={handleSubmit(onSubmit)} as="form">
          <FormControl isInvalid={!!errors.userName}>
            <Input
              data-testid="@usernameInput"
              placeholder={translate('app.username')}
              {...register('userName')}
              isReadOnly={isSubmitting}
            />
            <FormErrorMessage data-testid="@usernameError">
              {errors.userName && errors.userName.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <InputGroup mt={5}>
              <Input
                data-testid="@passwordInput"
                isReadOnly={isSubmitting}
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder={translate('app.password')}
                {...register('password')}
              />

              <InputRightElement width="auto">
                <Button
                  data-testid="@showPass"
                  variant="link"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? (
                    <ViewIcon color="primary.500" />
                  ) : (
                    <ViewOffIcon color="neutral.500" />
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>

            <FormErrorMessage data-testid="@passwordError">
              {errors.password?.message}
            </FormErrorMessage>
          </FormControl>

          <Styles.SubmitButton
            data-testid="@submitBtn"
            isLoading={isSubmitting}
            type="submit"
          >
            {translate('app.signIn')}
          </Styles.SubmitButton>
        </Styles.FormArea>
      </Styles.LoginBox>
    </Styles.Container>
  );
};

export default SignInView;
