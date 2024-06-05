import { StatusBar } from "expo-status-bar";
import { View, ScrollView } from "react-native";
import { Text, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { PasswordInput } from "../components/FormInputs";
import { useForm } from "react-hook-form";
import { LogoHeader } from "../components/LogoHeader";
import { useCheckSession } from "../hooks/useCheckSession";

export default function ChangePassword() {
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
  const currentPassword = watch("passwordNew", "");
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
              Cambiar Contraseña
            </Text>

            <View className="flex gap-2">
              <PasswordInput
                control={control}
                name="password"
                placeholder="Contraseña actual"
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
                control={control}
                name="passwordNew"
                placeholder="Contraseña nueva"
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
              className="w-[70%] m-auto mt-4"
              mode="contained"
              onPress={handleSubmit(onSubmit)}
            >
              Guardar Cambios
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
