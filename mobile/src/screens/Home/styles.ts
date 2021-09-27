import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 0 20px;
`;

export const Logo = styled.Image``;

export const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #333;
`;

export const SubTitle = styled.Text`
  color: #737380;
  font-size: 18px;
`;

export const Header = styled.View`
  margin: 20px 0;
`;

export const FloatButton = styled(RectButton)`
  position: absolute;
  right: 20px;
  bottom: 20px;
  background-color: ${props => props.theme.colors.primary};
  height: 60px;
  width: 60px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
`;
