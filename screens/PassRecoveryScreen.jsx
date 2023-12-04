import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomInput, PasswordInput, AnchorText } from '../components/FormInputs';

export default function PassRecoveryScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-theme-background">
      <StatusBar style="auto"/>
      <View>
        {/*<Image></Image>*/}
      </View>
      <View className="py-7 px-5 w-[90%]">
        <Text 
          className="text-[20px] text-theme-primar text-center font-bold mb-[20px]"
        >
          Recuperar contraseña
        </Text>
        <CustomInput
          placeholder="Email"
          autoComplete="email"
          autoCapitalize="none"
        />
      </View>
      <AnchorText
        className="h-[45px]" 
        href={() => navigation.navigate('LogIn')}
        // additionalText="No tienes cuenta? "
      >
        ¿Quieres iniciar sesión?
      </AnchorText>

      <AnchorText 
        href={() => navigation.navigate('SignIn')}
        // additionalText="No tienes cuenta? "
      >
        ¿No tienes cuenta?
      </AnchorText>

    </SafeAreaView>
  );
}