import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Image, Alert, ScrollView  } from "react-native";
import { Text, Button, IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import {  AnchorText,CustomInput } from "../components/FormInputs";
import { useForm } from "react-hook-form";
import * as ImagePicker from 'expo-image-picker';
import { LogoHeader } from "../components/LogoHeader";

export default function ProfileScreen({ navigation }) {
  const { control, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  const [selectedImage, setSelectImage] = useState(null)
  let url = selectedImage == null ? require("../assets/profile_photo.jpg") : { uri: selectedImage.localUri }
  
  
  
  let imagePermison = async () => {
    let permisonResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permisonResult.granted === false) {Alert('permisos Requeridos'); return; }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.canceled == true) { return }
    
    setSelectImage({ localUri: pickerResult.uri })
  }

  return (
    <SafeAreaView className="flex-1 bg-theme-background">
      <StatusBar style="auto" />
      <LogoHeader />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
      >
        <View>
          <Text className="text-[20px] text-theme-primar text-center font-bold mb-[20px]">
            Perfil de usuario
          </Text>
        </View>
        <View className="flex-1 items-center mb-10">
          <View className="px-5 w-[90%]">
            <View className="flex flex-row h-[40vw]">

              <IconButton
                icon="folder"
                size={50}
                mode="contained"
                onPress={() => {
                  imagePermison();
                  
                }}
                className="m-10"
              />
              <Image
                resizeMode="contain"
                className="w-[45%] h-[100%]"
                source={url}
                
              />
            </View>
            <Text className="text-theme-error font-bold">{}</Text>
            <CustomInput
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
              onPress={
                handleSubmit(onSubmit)
              }
            >
              Guardar Cambios
            </Button>
          </View>
              
          <AnchorText
            href={() => navigation.navigate("ChangePassword")}
            
          >
            Cambiar Contraseña
          </AnchorText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


