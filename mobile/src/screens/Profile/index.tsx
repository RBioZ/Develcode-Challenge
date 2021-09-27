import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components';
import * as yup from 'yup';
import Button from '../../components/Button/index';
import Input from '../../components/Input/index';
import IUser from '../../models/User';
import api from '../../services/api';
import * as S from './styles';

const schema = yup.object().shape({
  name: yup.string().required('Name é um campo obrigatório'),
  birth: yup.string().required('Data de Nascimento é um campo obrigatório'),
  code: yup.string().required('Código é um campo obrigatório'),
});

const Profile: React.FC = () => {
  const [loadingDel, setLoadingDel] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const route = useRoute<RouteProp<{ params: { data?: IUser } }, 'params'>>();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: route.params.data?.name ?? '',
      birth_date:
        (route.params.data?.birth_date &&
          format(
            new Date(String(route.params.data?.birth_date)),
            'yyyy-MM-dd',
          )) ??
        '',
      code: route.params.data?.code ?? '',
    },
  });
  const [image, setImage] = useState('');
  const { goBack } = useNavigation();

  const handleImagePicker = async () => {
    await ImagePicker.launchImageLibrary({ mediaType: 'photo' }, res => {
      if (!res.didCancel && res.assets) {
        setImage(String(res.assets[0].uri));
      }
    });
  };

  const handleUpdateCreateUser = useCallback(
    async data => {
      setLoading(true);
      try {
        if (route.params.data?.id) {
          await api.patch(`/users/update/${route.params.data?.id}`, data);
          if (image) {
            let formData = new FormData();

            formData.append(
              'avatar',
              JSON.parse(
                JSON.stringify({
                  uri: image,
                  type: 'image/jpeg',
                  name: 'image.jpeg',
                }),
              ),
            );

            await api.put(`/users/avatar/${route.params.data?.id}`, formData);
          }
        } else {
          const user = await api.post('/users/create', data);
          if (image) {
            let formData = new FormData();

            formData.append(
              'avatar',
              JSON.parse(
                JSON.stringify({
                  uri: image,
                  type: 'image/jpeg',
                  name: 'image.jpeg',
                }),
              ),
            );

            await api.put(`/users/avatar/${user.data.id}`, formData);
          }
        }
        setLoading(false);
        goBack();
      } catch (error) {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: 'Ocorreu um erro ao requisitar ao Criar/Atualizar o usuário',
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      }
    },
    [route, image],
  );

  const handleDeleteUser = useCallback(async () => {
    setLoadingDel(true);
    try {
      const response = await api.delete(
        `/users/remove/${route.params.data?.id}`,
      );
      goBack();
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Ocorreu um erro ao requisitar ao Deletar o usuário',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
    setLoadingDel(false);
  }, []);

  return (
    <S.Container>
      <S.BackButton onPress={goBack}>
        <Ionicons name="chevron-back" size={30} color={theme.colors.primary} />
      </S.BackButton>

      <S.ImageWraper>
        <S.Image
          source={{
            uri:
              image ??
              `${api.defaults.baseURL}/files/${route.params.data?.avatar}`,
          }}
        />
        <S.Camera onPress={handleImagePicker}>
          <Feather name="camera" size={24} color="white" />
        </S.Camera>
      </S.ImageWraper>
      <Input
        control={control}
        name="name"
        placeholder="Nome"
        icon={<Feather name="user" size={24} color={theme.colors.primary} />}
      />
      <Input
        mask="$1-$2-$3"
        regex={/(\d{4})(\d{2})(\d{2})/}
        keyboardType="number-pad"
        control={control}
        name="birth_date"
        placeholder="Data de Nascimento"
        icon={
          <Feather name="calendar" size={24} color={theme.colors.primary} />
        }
        maxLength={10}
      />
      <Input
        control={control}
        name="code"
        placeholder="Código"
        icon={<Feather name="hash" size={24} color={theme.colors.primary} />}
        keyboardType="number-pad"
        maxLength={4}
      />
      {route.params.data && (
        <Button
          loading={loadingDel}
          onPress={handleSubmit(handleDeleteUser)}
          style={{ backgroundColor: '#E02041', marginBottom: 0 }}>
          Excluir
        </Button>
      )}

      <Button loading={loading} onPress={handleSubmit(handleUpdateCreateUser)}>
        Salvar
      </Button>
    </S.Container>
  );
};

export default Profile;
