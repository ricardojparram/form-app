import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';

export const CustomInput = ({ placeholder, default_value = '', icon, style, ...props }) => {
  const [text, setText] = useState(default_value);

  return (
    <TextInput
      style={style}
      label={placeholder}
      mode="outlined"
      value={text}
      onChangeText={text => setText(text)}
      right={
        <TextInput.Icon
          icon={icon}
        />}
      {...props}
    />
  );
};

export const PasswordInput = ({ placeholder, default_value = '', style, ...props }) => {
  const [text, setText] = useState(default_value);
  const [passwordTypeText, setpasswordTypeText] = useState(true);

  return (
    <TextInput
      style={style}
      label={placeholder}
      secureTextEntry={passwordTypeText}
      mode="outlined"
      value={text}
      autoCapitalize="none"
      onChangeText={text => setText(text)}
      right={
        <TextInput.Icon
          icon={passwordTypeText ? 'eye' : 'eye-off'}
          onPress={() => setpasswordTypeText(!passwordTypeText)} 
        />}
      {...props}
    />
  );
};
