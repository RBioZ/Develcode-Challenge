import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled(RectButton)`
  height: 70px;
  background-color: ${props => props.theme.colors.background_item};
  flex-direction: row;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 5px;
`;

export const Avatar = styled.Image`
  height: 60px;
  width: 60px;
  background-color: #ccc;
`;

export const Name = styled.Text`
  font-weight: 500;
  font-size: 16px;
  color: ${props => props.theme.colors.text_1};
`;

export const Code = styled.Text`
  font-size: 12px;
  color: ${props => props.theme.colors.text_2};
`;

export const Birth = styled.Text`
  color: ${props => props.theme.colors.text_2};
`;

export const Wraper = styled.View`
  padding: 0 5px;
`;
