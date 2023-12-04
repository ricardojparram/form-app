import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomInput, PasswordInput, AnchorText } from '../components/FormInputs';


export default function SignInScreen({ navigation }) {

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-theme-background">
      <StatusBar style="auto"/>
      <View className="py-7 px-5 w-[90%]">
        <Text className="text-[20px] text-theme-primar text-center font-bold mb-[20px]">Registrarse</Text>

        <View className="flex gap-2">
          <View className="flex flex-row space-x-2">
            <CustomInput
              className="w-[48%]"
              placeholder="Nombre"
              autoComplete="name"
            />

            <CustomInput
              className="w-[49%]"
              placeholder="Apellido"
              autoComplete="family-name"
            />
          </View>

          <CustomInput
            placeholder="Email"
            autoComplete="email"
            autoCapitalize="none"
          />
          <PasswordInput 
            placeholder="Contraseña"
            autoComplete="password"
          />
          <PasswordInput 
            placeholder="Repetir contraseña"
            autoComplete="password"
          />
        </View>

      </View>
      <AnchorText
        href={() => navigation.navigate('LogIn')}
        // additionalText="No tienes cuenta? "
      >
        ¿Quieres iniciar sesión?
      </AnchorText>

    </SafeAreaView>
  );
}
