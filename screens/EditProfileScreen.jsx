import { StatusBar } from "expo-status-bar";
import { View, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm } from "react-hook-form";
import { CustomInput } from "../components/FormInputs";
import { useProfileStore } from "../store/profileStore";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";

export default function ProfileScreen({ navigation }) {
  const { control, handleSubmit } = useForm();
  //   const [user] = useAuthStore((state) => [state.user]);
  //   console.log(user);

  const onSubmit = (data) => {
    //   updatePersonalData();
    // console.log(user);
    // console.log(data);
  };
  //   console.log(user);
  //   console.log(user);

  return (
    <SafeAreaView className="flex-1 bg-theme-background">
      <StatusBar style="auto" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex px-6 gap-3">
          {/* <CustomInput
            placeholder="Nombre"
            autoComplete="name"
            control={control}
            name="name"
            value={user.nombre}
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
            value={user.apellido}
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
            value={user.correo}
            name="email"
            rules={{
              required: "Complete el correo.",
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: "El correo tiene que ser válido",
              },
            }}
          /> */}
          <View className="items-end">
            <Button
              className="w-[180px]"
              icon="file-edit-outline"
              mode="contained"
              onPress={handleSubmit(onSubmit)}
            >
              Guardar cambios
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
