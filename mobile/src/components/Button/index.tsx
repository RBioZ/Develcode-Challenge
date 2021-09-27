import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { UIActivityIndicator } from 'react-native-indicators';
import * as S from './styles';

interface IButton extends RectButtonProps {
  loading: boolean;
}

const Button: React.FC<IButton> = ({ children, loading, ...rest }) => {
  return (
    <S.Container {...rest}>
      {loading ? (
        <UIActivityIndicator size={30} color="white" />
      ) : (
        <S.Text>{children}</S.Text>
      )}
    </S.Container>
  );
};

export default Button;
