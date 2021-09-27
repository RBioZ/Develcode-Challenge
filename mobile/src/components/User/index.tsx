import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import React from 'react';
import IUser from '../../models/User';
import api from '../../services/api';
import * as S from './styles';

const User: React.FC<{ data: IUser }> = ({ data }) => {
  const { navigate } = useNavigation();

  return (
    <S.Container onPress={() => navigate('Profile', { data: data })}>
      <S.Avatar
        source={{
          uri: `${api.defaults.baseURL}/files/${data.avatar}` ?? '',
        }}
      />
      <S.Wraper>
        <S.Name>{data.name}</S.Name>

        <S.Birth>
          {format(new Date(String(data.birth_date)), 'dd/MM/yyyy')}
        </S.Birth>
        <S.Code>#{data.code}</S.Code>
      </S.Wraper>
    </S.Container>
  );
};

export default User;
