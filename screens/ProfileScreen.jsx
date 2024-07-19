import { StatusBar } from "expo-status-bar";
import { View, ScrollView } from "react-native";
import { Text, Button, Divider, TouchableRipple } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar } from "react-native-paper";
import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";
import { useProfileStore } from "../store/profileStore";
import * as ImagePicker from "expo-image-picker";
import Alert from "../components/Alert";

export default function ProfileScreen({ navigation }) {
  const [user, API_SRC, token] = useAuthStore((state) => [
    state.user,
    state.API_SRC,
    state.token,
  ]);
  const [setUser, setToken, changeProfilePicture] = useProfileStore((state) => [
    state.setUser,
    state.setToken,
    state.changeProfilePicture,
  ]);
  useEffect(() => {
    setUser(user);
    setToken(token);
  }, []);

  const [alert, setAlert] = useState({
    loading: false,
    visible: false,
    message: "",
  });

  const [selectedImage, setSelectImage] = useState(
    `${API_SRC}${user?.fotoPerfil}`
  );

  const changePicture = async () => {
    const permisonResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permisonResult.granted === false) {
      setAlert({
        loading: false,
        visible: true,
        message: "Se requieren permisos para esta acción.",
      });
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (pickerResult.canceled == true) {
      return;
    }
    setAlert((state) => ({ ...state, loading: true }));
    const url = await changeProfilePicture(pickerResult.assets[0].uri);
    setSelectImage(url);
  };

  return (
    <SafeAreaView className="flex-1 bg-theme-background">
      <StatusBar style="auto" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
      >
        <View className="my-2 w-[100%]">
          <View className="flex flex-col h-[40vw] mb-4 items-center justify-center">
            <TouchableRipple onPress={changePicture}>
              <Avatar.Image
                size={120}
                source={{ uri: selectedImage }}
                onLoadEnd={() =>
                  setAlert((state) => ({ ...state, loading: false }))
                }
              />
            </TouchableRipple>
            <Button
              icon="image-edit-outline"
              onPress={changePicture}
              loading={alert.loading}
            >
              Cambiar foto
            </Button>
            <Divider />
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
      <Alert
        type={"error"}
        title={"Error"}
        visible={alert.visible}
        message={alert.message}
        onClose={() => {
          setAlert((state) => ({ ...state, visible: false }));
        }}
      />
    </SafeAreaView>
  );
}
