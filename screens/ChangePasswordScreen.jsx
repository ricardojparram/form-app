import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { PasswordInput } from "../components/FormInputs";
import { useForm } from "react-hook-form";
import { LogoHeader } from "../components/LogoHeader";
import { useCheckSession } from "../hooks/useCheckSession";
import { useProfileStore } from "../store/profileStore";
import { useState } from "react";
import Alert from "../components/Alert";

export default function ChangePassword({ navigation }) {
  useCheckSession();
  const [updatePassword] = useProfileStore((state) => [state.updatePassword]);
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
    reValidateMode: "onBlur",
  });
  const [alert, setAlert] = useState({
    loading: false,
    visible: false,
    type: "error",
    title: "Error",
    message: "error",
  });
  const onSubmit = async (data) => {
    setAlert((state) => ({
      ...state,
      loading: true,
    }));
    const res = await updatePassword(data.password, data.newPassword);

    if (res.resultado != "ok") {
      setAlert((state) => ({
        ...state,
        visible: true,
        message: res.msg,
        type: "error",
        title: "Error",
      }));
    } else {
      setAlert((state) => ({
        ...state,
        visible: true,
        message: res.msg,
        type: "success",
        title: "Éxito",
      }));
      reset();
    }
    setAlert((state) => ({
      ...state,
      loading: false,
    }));
  };
  const onClose = (bool) => {
    if (bool) {
      navigation.navigate("Profile");
    }
    setAlert((state) => ({ ...state, visible: false }));
  };
  const currentPassword = watch("newPassword", "");
  return (
    <SafeAreaView className="flex-1 bg-theme-background">
      <StatusBar style="auto" />
      <LogoHeader />

      <View className="flex px-6 gap-3">
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
              message: "La contraseña no puede pasar de los 20 carácteres.",
            },
          }}
        />

        <PasswordInput
          control={control}
          name="newPassword"
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
              message: "La contraseña no puede pasar de los 20 carácteres.",
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
        <View className="items-end">
          <Button
            className="w-[180px]"
            icon="file-edit-outline"
            loading={alert.loading}
            mode="contained"
            onPress={handleSubmit(onSubmit)}
          >
            Guardar cambios
          </Button>
        </View>
      </View>
      <Alert
        type={alert.type}
        title={alert.title}
        visible={alert.visible}
        message={alert.message}
        onClose={() => onClose(alert.type === "success")}
      />
    </SafeAreaView>
  );
}
