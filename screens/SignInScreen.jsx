import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { Text, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CustomInput,
  PasswordInput,
  AnchorText,
} from "../components/FormInputs";
import { useForm } from "react-hook-form";
import { LogoHeader } from "../components/LogoHeader";
import { ScrollView } from "react-native";
import { useCheckSession } from "../hooks/useCheckSession";

export default function SignInScreen({ navigation }) {
  useCheckSession();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    reValidateMode: "onBlur",
  });
  const onSubmit = (data) => {};
  const currentPassword = watch("password", "");
  return (
    <SafeAreaView className="flex-1 bg-theme-background">
      <StatusBar style="auto" />
      <LogoHeader />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 items-center ">
          <View className="px-5 w-[90%]">
            <Text className="text-[20px] text-theme-primar text-center font-bold mb-[20px]">
              Registrarse
            </Text>

            <View className="flex gap-2">
              <View className="">
                <CustomInput
                  // className="w-[48%]"
                  placeholder="Nombre"
                  autoComplete="name"
                  control={control}
                  name="name"
                  rules={{
                    required: "Complete el nombre.",
                    pattern: {
                      value: /^[a-zA-ZÀ-ÿ]{2,30}$/,
                      message: "Nombre inválido.",
                    },
                  }}
                />

                <CustomInput
                  // className="w-[49%]"
                  placeholder="Apellido"
                  autoComplete="family-name"
                  control={control}
                  name="lastname"
                  rules={{
                    required: "Complete el apellido.",
                    pattern: {
                      value: /^[a-zA-ZÀ-ÿ]{2,30}$/,
                      message: "Apellido inválido.",
                    },
                  }}
                />
              </View>

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
                    message:
                      "La contraseña no puede pasar de los 20 carácteres.",
                  },
                }}
              />

              <PasswordInput
                placeholder="Confirmar contraseña"
                autoComplete="password"
                control={control}
                name="confirmPassword"
                rules={{
                  required: "Confirme la contraseña.",
                  validate: (value) =>
                    value === currentPassword ||
                    "Las contraseñas tienen que coincidir.",
                }}
              />
            </View>
            <Button
              className="w-[50%] m-auto mt-4"
              mode="contained"
              onPress={handleSubmit(onSubmit)}
            >
              Registrarse
            </Button>
          </View>
          <AnchorText
            href={() => navigation.navigate("LogIn")}
            // additionalText="No tienes cuenta? "
          >
            ¿Quieres iniciar sesión?
          </AnchorText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
