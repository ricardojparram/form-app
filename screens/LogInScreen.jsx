import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { Text, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CustomInput,
  PasswordInput,
  AnchorText,
} from "../components/FormInputs";
import { LogoHeader } from "../components/LogoHeader";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/authStore";

// const getSedes = async () => {
//   const req = await fetch(API_SRC + "?url=sede", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: JSON.stringify({
//       login: "app",
//     }),
//   })
// }

export default function LogInScreen({ navigation }) {
  const login = useAuthStore((state) => state.login);
  const { control, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log("xd");
    login("1", "V-123123123", "123123123");
  };

  return (
    <SafeAreaView className="flex-1 bg-theme-background">
      <StatusBar style="auto" />
      <LogoHeader />
      <View className="flex-1 items-center ">
        <View className="px-5 w-[90%]">
          <Text className="text-[20px] text-theme-primar text-center font-bold mb-[20px]">
            Iniciar sesión
          </Text>

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
          <PasswordInput
            className="mt-[10px]"
            control={control}
            name="password"
            placeholder="Contraseña"
            autoComplete="password"
            rules={{
              required: "Complete la contraseña.",
              minLength: {
                value: 5,
                message: "La contraseña debe tener mínimo 5 carácteres.",
              },
              maxLength: {
                value: 20,
                message: "La contraseña no puede pasar de los 20 carácteres.",
              },
            }}
          />

          <Button
            className="w-[50%] m-auto mt-4"
            mode="contained"
            onPress={handleSubmit(onSubmit)}
          >
            Iniciar sesión
          </Button>
        </View>
        <AnchorText
          className=""
          href={() => navigation.navigate("SignIn")}
          // additionalText="No tienes cuenta? "
        >
          ¿No tienes cuenta?
        </AnchorText>
        <AnchorText></AnchorText>
        <AnchorText
          href={() => navigation.navigate("Recovery")}
          // additionalText="No tienes cuenta? "
        >
          ¿Olvidaste tu contraseña?
        </AnchorText>
      </View>
    </SafeAreaView>
  );
}
