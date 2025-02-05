import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { Center, Avatar, Button, VStack, CenterProps } from '@chakra-ui/react';
import React, { ChangeEvent, useRef } from 'react';
import { useI18n } from 'src/shared/i18n';
import AvatarPlaceholder from 'src/shared/assets/imgs/avatarPlaceholder.png';
import * as Styles from './styles';

export interface UserAreaProps extends CenterProps {
  name?: string;
  userName?: string;
  picture?: string | File;
  onChangePic?: (picture?: File) => unknown;
}

const UserArea: React.FC<UserAreaProps> = ({
  name = '',
  userName = '',
  picture = '',
  onChangePic = () => undefined,
  ...rest
}) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const { translate } = useI18n();

  const handleImageChange = (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.files) {
      const file = ev.target.files[0];
      onChangePic(file);
      ev.target.value = '';
    }
  };

  const handleImageRemove = () => {
    onChangePic();
  };

  const convertImageToURI = (image: File | string) => {
    if (image instanceof File) return URL.createObjectURL(image);
    return image;
  };

  const imagePreview = convertImageToURI(picture);

  return (
    <Center maxW="100%" w="full" {...rest}>
      <Styles.Content>
        <Avatar
          data-testid="@avatarPicture"
          size="xl"
          mb={4}
          src={imagePreview || AvatarPlaceholder}
        />

        <Styles.Name>{name}</Styles.Name>

        <Styles.Username>{userName}</Styles.Username>

        <VStack mt={1} direction="row" spacing={4}>
          <Button
            leftIcon={<EditIcon />}
            size="sm"
            mt={2}
            data-testid="@changeImgBtn"
            onClick={() => fileInput.current?.click()}
          >
            {translate('user.updatePicture')}
          </Button>

          <input
            data-testid="@fileInput"
            type="file"
            style={{ display: 'none' }}
            ref={fileInput}
            onChange={handleImageChange}
          />

          {picture && (
            <Button
              data-testid="@removeImgBtn"
              variant="link"
              leftIcon={<DeleteIcon />}
              size="sm"
              onClick={handleImageRemove}
            >
              {translate('user.removePicture')}
            </Button>
          )}
        </VStack>
      </Styles.Content>
    </Center>
  );
};

export default UserArea;
