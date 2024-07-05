import { StatusBar } from "expo-status-bar";
import { View, Alert, ScrollView } from "react-native";
import { Text, Button, Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar } from "react-native-paper";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";
import { useProfileStore } from "../store/profileStore";
export default function ProfileScreen({ navigation }) {
  const [user, API_SRC, token] = useAuthStore((state) => [
    state.user,
    state.API_SRC,
    state.token,
  ]);
  const [setUser, setToken] = useProfileStore((state) => [
    state.setUser,
    state.setToken,
  ]);
  useEffect(() => {
    setUser(user);
    setToken(token);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-theme-background">
      <StatusBar style="auto" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
      >
        <View className="mt-5 w-[100%]">
          <View className="flex flex-col h-[40vw] mb-4 items-center justify-center">
            <Avatar.Image
              size={120}
              source={{ uri: `${API_SRC}${user?.fotoPerfil}` || "" }}
            />
          </View>

          <View className="flex gap-3 px-5">
            <Text className="font-bold text-gray-500 text-md">
              Acerca de ti
            </Text>
            <View className="flex flex-row justify-between">
              <Text className="text-lg font-bold">Cédula</Text>
              <Text className="text-lg">{user?.cedula} </Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text className="text-lg font-bold">Nombre</Text>
              <Text className="text-lg">{user?.nombre} </Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text className="text-lg font-bold">Apellido</Text>
              <Text className="text-lg">{user?.apellido} </Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text className="text-lg font-bold">Puesto</Text>
              <Text className="text-lg">{user?.puesto} </Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text className="text-lg font-bold">Correo</Text>
              <Text className="text-lg ">{user?.correo} </Text>
            </View>
          </View>
          <View className="flex gap-3 px-5 mt-4">
            <Text className="font-bold text-gray-500 text-md mb-1">
              Opciones de perfil
            </Text>
            <Divider />

            <Button
              icon="file-edit-outline"
              contentStyle={{ justifyContent: "flex-start" }}
              style={{ padding: 0, margin: 0 }}
              labelStyle={{
                fontSize: 16,
              }}
              onPress={() => navigation.navigate("EditProfile")}
            >
              Actualizar información personal
            </Button>
            <Divider />

            <Button
              icon="key-chain"
              contentStyle={{ justifyContent: "flex-start" }}
              labelStyle={{
                fontSize: 16,
              }}
              onPress={() => navigation.navigate("ChangePassword")}
            >
              Cambiar contraseña
            </Button>
            <Divider />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
