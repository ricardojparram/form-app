import React, { useState } from 'react';
import { TextInput, Button, Text } from 'react-native-paper';
import { View } from 'react-native';

export const CustomInput = ({ placeholder, default_value = '', icon, style, ...props }) => {
  const [text, setText] = useState(default_value);

  return (
    <TextInput
      style={style}
      label={placeholder}
      mode="outlined"
      value={text}
      onChangeText={text => setText(text)}
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

export const AnchorText = ({children, additionalText = '', href, style}) => {
  return (
      <Button mode="text" onPress={href} style={style}>
        <Text className="">{additionalText}</Text>
        {children}
      </Button>
  );
}
