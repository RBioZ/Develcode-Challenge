import { lighten } from 'polished';
import styled from 'styled-components/native';

interface IContainer {
  focused: boolean;
}

export const Container = styled.View<IContainer>`
  height: 60px;
  background-color: ${props => props.theme.colors.background_item};
  margin: 5px 20px;
  border-radius: 5px;
  border-width: 1px;
  border-color: ${props =>
    lighten(props.focused ? '0.20' : '0.40', props.theme.colors.primary)};
  flex-direction: row;
`;

export const Input = styled.TextInput`
  flex: 1;
  font-size: 18px;
  color: #555;
`;

export const Icon = styled.View`
  justify-content: center;
  padding: 0 10px;
`;
