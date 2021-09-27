import React, { useState } from 'react';
import { Control, useController } from 'react-hook-form';
import { TextInputProps } from 'react-native';
import * as S from './styles';

interface IInput extends TextInputProps {
  name: string;
  icon: JSX.Element;
  control: Control<any>;
  regex?: RegExp;
  mask?: string;
}

const apply_mask = (value: string, regex: RegExp, mask: string) => {
  return value.replace(regex, mask);
};

const Input: React.FC<IInput> = ({
  icon,
  name,
  control,
  regex,
  mask,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  const { field } = useController({
    control,
    defaultValue: '',
    name: name,
  });

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  return (
    <S.Container focused={focused}>
      <S.Icon>{icon}</S.Icon>

      <S.Input
        placeholderTextColor={'#ccc'}
        value={field.value}
        onChangeText={e =>
          regex && mask
            ? field.onChange(apply_mask(e, regex, mask))
            : field.onChange(e)
        }
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      />
    </S.Container>
  );
};

export default Input;
