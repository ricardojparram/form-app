import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Image } from "react-native";
import { Text, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomInput, AnchorText } from "../components/FormInputs";
import { LogoHeader } from "../components/LogoHeader";
import { useForm } from "react-hook-form";
import { useCheckSession } from "../hooks/useCheckSession";

export default function PassRecoveryScreen({ navigation }) {
  useCheckSession();

  const { control, handleSubmit } = useForm();
  const onSubmit = (data) => {};

  return (
    <SafeAreaView className="bg-theme-background h-[100%]">
      <StatusBar style="auto" />
      <LogoHeader />

      <View className="flex-1 items-center  w-[100vw]">
        <View className="px-5 w-[90%]">
          <Text className="text-[20px] text-theme-primar text-center font-bold mb-[20px]">
            Recuperar contraseña
          </Text>
          {/* <CustomInput */}
          {/*   placeholder="Email" */}
          {/*   autoComplete="email" */}
          {/*   autoCapitalize="none" */}
          {/* /> */}
          <CustomInput
            placeholder="Email"
            autoComplete="email"
            autoCapitalize="none"
            control={control}
            name="email"
            rules={{
              required: "Complete el correo.",
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: "El correo tiene que ser válido",
              },
            }}
          />
          <Button
            className="w-[80%] m-auto mt-4"
            mode="contained"
            onPress={handleSubmit(onSubmit)}
          >
            Recuperar contraseña
          </Button>
        </View>
        <AnchorText
          className="h-[45px]"
          href={() => navigation.navigate("LogIn")}
          // additionalText="No tienes cuenta? "
        >
          ¿Quieres iniciar sesión?
        </AnchorText>
      </View>
    </SafeAreaView>
  );
}
