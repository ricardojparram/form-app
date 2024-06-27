import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Image, Alert, ScrollView } from "react-native";
import { Text, Button, IconButton, Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import { Avatar } from "react-native-paper";
import { useAuthStore } from "../store/authStore";

export default function ProfileScreen({ navigation }) {
  const { control, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  const [user] = useAuthStore((state) => [state.user]);
  console.log(user);
  const [selectedImage, setSelectImage] = useState(null);
  let url =
    selectedImage == null
      ? require("../assets/profile_photo.jpg")
      : { uri: selectedImage.localUri };

  let imagePermison = async () => {
    let permisonResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permisonResult.granted === false) {
      Alert("permisos Requeridos");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.canceled == true) {
      return;
    }
    console.log(pickerResult.assets[0].uri);
    setSelectImage({ localUri: pickerResult.assets[0].uri });
  };

  return (
    <SafeAreaView className="flex-1 bg-theme-background">
      <StatusBar style="auto" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 items-center mb-10">
          <View className="w-[100%]">
            <View className="flex flex-col h-[40vw] mb-4 items-center justify-center">
              <Avatar.Image size={120} source={url} />
              {/* <Image resizeMode="contain" className="w-16 h-16" source={url} /> */}
              <Button
                className="w-[70%] m-auto mt-1"
                onPress={() => imagePermison()}
              >
                Cambiar foto
              </Button>
            </View>

            <View className="flex gap-3 px-5">
              <Text className="font-bold text-gray-500 text-md">
                Acerca de ti
              </Text>
              <View className="flex flex-row justify-between text-lg font-bold">
                <Text className="text-lg font-bold">Cédula</Text>
                <Text className="text-lg font-bold">{user.cedula} </Text>
              </View>
              <View className="flex flex-row justify-between text-lg font-bold">
                <Text className="text-lg font-bold">Nombre</Text>
                <Text className="text-lg font-bold">{user.nombre} </Text>
              </View>
              <View className="flex flex-row justify-between text-lg font-bold">
                <Text className="text-lg font-bold">Apellido</Text>
                <Text className="text-lg font-bold">{user.apellido} </Text>
              </View>
              <View className="flex flex-row justify-between text-lg font-bold">
                <Text className="text-lg font-bold">Puesto</Text>
                <Text className="text-lg font-bold">{user.puesto} </Text>
              </View>
              <View className="flex flex-row justify-between text-lg font-bold">
                <Text className="text-lg font-bold">Correo</Text>
                <Text className="text-lg font-bold">{user.correo} </Text>
              </View>
            </View>
            <View className="flex flex-row justify-end pr-4 mt-2">
              <Button
                mode="contained"
                icon="file-edit-outline"
                onPress={handleSubmit(onSubmit)}
              >
                Editar perfil
              </Button>
            </View>
            {/* <CustomInput
              placeholder="Nombre"
              autoComplete="name"
              control={control}
              name="name"
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

            <Button
              className="w-[70%] m-auto mt-4"
              mode="contained"
              onPress={handleSubmit(onSubmit)}
            >
              Guardar Cambios
            </Button> */}
          </View>

          {/* <AnchorText href={() => navigation.navigate("ChangePassword")}>
            Cambiar Contraseña
          </AnchorText> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
