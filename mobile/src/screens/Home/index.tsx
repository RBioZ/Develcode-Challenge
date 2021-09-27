import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import Toast from 'react-native-toast-message';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTheme } from 'styled-components';
import logo from '../../assets/images/logo.png';
import User from '../../components/User';
import IUser from '../../models/User';
import api from '../../services/api';
import * as S from './styles';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { navigate } = useNavigation();
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState<IUser[]>([]);
  const theme = useTheme();

  const handleLoadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(`/users/feed?page=${page}`);
      setUsers(response.data);
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Ocorreu um erro ao requisitar a lista dos usuários',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    handleLoadUsers();
  }, []);

  return (
    <S.Container>
      <FlatList
        refreshControl={
          <RefreshControl
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
            refreshing={loading}
            onRefresh={handleLoadUsers}
          />
        }
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <S.Header>
            <S.Logo source={logo} />
            <S.Title>Bem-vindo!</S.Title>
            <S.SubTitle>Gerencie seus usuários pelo App!</S.SubTitle>
          </S.Header>
        )}
        data={users}
        renderItem={({ item }) => <User data={item} />}
      />
      <S.FloatButton onPress={() => navigate('Profile', {})}>
        <AntDesign name="pluscircleo" size={40} color="white" />
      </S.FloatButton>
    </S.Container>
  );
};

export default Home;
