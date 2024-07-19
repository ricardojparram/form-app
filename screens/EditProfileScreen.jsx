import { StatusBar } from "expo-status-bar";
import { View, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm } from "react-hook-form";
import { CustomInput } from "../components/FormInputs";
import { useProfileStore } from "../store/profileStore";
import { LogoHeader } from "../components/LogoHeader";
import { useState } from "react";
import Alert from "../components/Alert";

export default function ProfileScreen({ navigation }) {
  const [updatePersonalData, user, token] = useProfileStore((state) => [
    state.updatePersonalData,
    state.user,
    state.token,
  ]);
  const [alert, setAlert] = useState({
    loading: false,
    visible: false,
    type: "error",
    title: "Error",
    message: "error",
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstname: user?.nombre,
      lastname: user?.apellido,
      email: user?.correo,
    },
  });

  const onSubmit = async (data) => {
    setAlert((state) => ({
      ...state,
      loading: true,
    }));
    const res = await updatePersonalData(
      data.firstname,
      data.lastname,
      data.email
    );
    if (!res) {
      setAlert((state) => ({
        ...state,
        visible: true,
        message: "Ha ocurrido un error",
        type: "error",
        title: "Error",
      }));
    } else {
      setAlert((state) => ({
        ...state,
        visible: true,
        message: "Se ha actualizado su información.",
        type: "success",
        title: "Éxito",
      }));
    }
    setAlert((state) => ({
      ...state,
      loading: false,
    }));
  };

  return (
    <SafeAreaView className="flex-1 bg-theme-background">
      <StatusBar style="auto" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
      >
        <LogoHeader />
        <View className="flex px-6 gap-3">
          <CustomInput
            placeholder="Nombre"
            autoComplete="name"
            control={control}
            name="firstname"
            rules={{
              required: "Complete el nombre.",
              pattern: {
                value: /^[a-zA-ZÀ-ÿ ]{2,30}$/,
                message: "El nombre tiene que ser valido",
              },
            }}
          />
          <CustomInput
            placeholder="Apellido"
            autoComplete="family-name"
            control={control}
            name="lastname"
            rules={{
              required: "Complete el apellido.",
              pattern: {
                value: /^[a-zA-ZÀ-ÿ ]{2,30}$/,
                message: "El apellido tiene que ser válido",
              },
            }}
          />
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
      </ScrollView>
      <Alert
        type={alert.type}
        title={alert.title}
        visible={alert.visible}
        message={alert.message}
        onClose={() => {
          navigation.navigate("Profile");
          setAlert((state) => ({ ...state, visible: false }));
        }}
      />
    </SafeAreaView>
  );
}
