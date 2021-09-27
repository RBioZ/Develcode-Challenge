import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled(RectButton)`
  height: 60px;
  background-color: ${props => props.theme.colors.primary};
  margin: 20px 20px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

export const Text = styled.Text`
  font-size: 20px;
  color: ${props => props.theme.colors.background};
`;
