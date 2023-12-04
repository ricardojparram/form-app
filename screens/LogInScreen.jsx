import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomInput, PasswordInput } from './components/FormInputs';

export default function LogInScreen({ navigation }) {

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-gray-100">
      <StatusBar style="auto"/>
      <View className="bg-white p-5 w-[85%] shadow-md hover:shadow-lg rounded">
        <Text className="text-[20px] text-center font-bold">Iniciar sesión</Text>
        <CustomInput
          placeholder="Email"
          autoComplete="email"
          autoCapitalize="none"
        />
        <PasswordInput 
          placeholder="Contraseña"
          autoComplete="password"
        />
      </View>
    </SafeAreaView>
  );
}