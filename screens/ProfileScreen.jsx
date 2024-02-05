import { StatusBar } from "expo-status-bar";
import { View, Image } from "react-native";
import { Text, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CustomInput,
  PasswordInput,
  AnchorText,
} from "../components/FormInputs";
import { useForm } from "react-hook-form";

export default function ProfileScreen({ navigation }) {
  const { control, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <SafeAreaView className="flex-1 bg-theme-background">
      <StatusBar style="auto" />
      <View>
        <View className="h-[22vh] my-[40px] mx-auto bordered rounded-xl">
          <Image
            resizeMode="contain"
            className="w-[80vw] h-[100%] rounded border"
            source={require("../assets/icon.png")}
          />
        </View>

        <Text className="text-[20px] text-theme-primar text-center font-bold mb-[20px]">
          Perfil de usuario
        </Text>
        <Text>José José</Text>
      </View>
      <View className="flex-1 items-center ">
        <View className="px-5 w-[90%]">
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
