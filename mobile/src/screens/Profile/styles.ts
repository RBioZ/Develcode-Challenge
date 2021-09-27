import styled from 'styled-components/native';

export const Container = styled.ScrollView``;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 20px;
  top: 20px;
`;

export const ImageWraper = styled.View`
  height: 200px;
  width: 200px;
  margin: 40px auto;
`;

export const Image = styled.Image`
  height: 200px;
  width: 200px;
  border-radius: 100px;
  background-color: #ccc;
`;

export const Camera = styled.TouchableOpacity`
  height: 60px;
  width: 60px;
  border-radius: 30px;
  background-color: ${props => props.theme.colors.primary};
  position: absolute;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
`;
