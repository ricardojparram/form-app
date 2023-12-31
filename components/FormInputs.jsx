import React, { useState } from 'react';
import { TextInput, Button, Text } from 'react-native-paper';
import { View } from 'react-native'; 
import { Controller } from 'react-hook-form';

export const CustomInput = ({ rules, control, name, placeholder, default_value = '', style, ...props }) => {
	const [text, setText] = useState(default_value);
	return (
		<Controller 
			control={control}
			name={name}
			rules={rules}
			render={({field : { value, onBlur, onChange}, fieldState : { error } }) => (
					<>
						<TextInput
							{...props}
							style={style}
							label={placeholder}
							mode="outlined"
							value={value}
							error={error}
							onBlur={onBlur}
							onChangeText={onChange}
						/>
						{error && ( <Text className="text-theme-error font-bold">{error.message}</Text> )}
					</>
				)}
		/>
	);
};

export const PasswordInput = ({ rules, control, name, placeholder, default_value = '', style, ...props }) => {
	const [text, setText] = useState(default_value);
	const [passwordTypeText, setpasswordTypeText] = useState(true);

	return (
		<Controller 
			control={control}
			name={name}
			rules={rules}
			render={({field : { value, onBlur, onChange}, fieldState : { error } }) => (
					<>
						<TextInput
							style={style}
							label={placeholder}
							secureTextEntry={passwordTypeText}
							mode="outlined"
							autoCapitalize="none"
							value={value}
							error={error}
							onBlur={onBlur}
							onChangeText={onChange}
							right={
								<TextInput.Icon
									icon={passwordTypeText ? 'eye' : 'eye-off'}
									onPress={() => setpasswordTypeText(!passwordTypeText)} 
								/>}
							{...props}
						/>
						{error && ( <Text className="text-theme-error font-bold">{error.message}</Text> )}
					</>
				)}
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
