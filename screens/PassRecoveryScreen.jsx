import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { Text, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomInput, AnchorText } from "../components/FormInputs";
import { LogoHeader } from "../components/LogoHeader";
import { useForm } from "react-hook-form";
import { useCheckSession } from "../hooks/useCheckSession";
import { API_SRC, PUBLIC_KEY } from "@env";
import { urlEncode } from "../utils/urlEncode";
import { JSEncrypt } from "jsencrypt";
import Alert from "../components/Alert";

export default function PassRecoveryScreen({ navigation }) {
  useCheckSession();
  const { control, handleSubmit } = useForm();
  const [alert, setAlert] = useState({
    loading: false,
    visible: false,
    type: "error",
    message: "error",
  });

  const sendEmail = async (email) => {
    const encrypt = new JSEncrypt({ default_key_size: 2048 });
    encrypt.setPublicKey(PUBLIC_KEY);
    const encrypted = encrypt.encrypt(email);
    const request = await fetch(API_SRC + "?url=recuperar", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: urlEncode({
        data: encrypted,
      }),
    });
    return await request.json();
  };

  const onSubmit = async (data) => {
    setAlert((state) => ({
      ...state,
      loading: true,
    }));
    const res = await sendEmail(data.email);
    console.log(res);
    if (res.resultado != "ok") {
      setAlert((state) => ({
        ...state,
        visible: true,
        message: res.msg,
        title: "Error",
        type: "error",
      }));
    }
    if (res.resultado === "ok") {
      setAlert((state) => ({
        ...state,
        visible: true,
        message: res.msg,
        type: "success",
      }));
    }
    setAlert((state) => ({
      ...state,
      loading: false,
    }));
  };

  const closeAlert = () => {
    setAlert({ visible: false });
    navigation.navigate("LogIn");
  };

  return (
    <SafeAreaView className="bg-theme-background h-[100%]">
      <StatusBar style="auto" />
      <LogoHeader />

      <View className="flex-1 items-center  w-[100vw]">
        <View className="px-5 w-[90%]">
          <Text className="text-[20px] text-theme-primar text-center font-bold mb-[20px]">
            Recuperar contraseña
          </Text>
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
            className="w-[65%] m-auto mt-4"
            mode="contained"
            icon="email-outline"
            loading={alert.loading}
            onPress={handleSubmit(onSubmit)}
          >
            Enviar correo
          </Button>
        </View>
        <AnchorText
          className="h-[45px]"
          href={() => navigation.navigate("LogIn")}
        >
          ¿Quieres iniciar sesión?
        </AnchorText>
      </View>
      <Alert
        type={alert.type}
        visible={alert.visible}
        message={alert.message}
        onClose={closeAlert}
      />
    </SafeAreaView>
  );
}
