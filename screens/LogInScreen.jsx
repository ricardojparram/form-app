import { StatusBar } from "expo-status-bar";
import { View, ScrollView } from "react-native";
import { Text, Button, ActivityIndicator, MD2Colors } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CustomInput,
  PasswordInput,
  AnchorText,
  Select,
} from "../components/FormInputs";
import Alert from "../components/Alert";
import { LogoHeader } from "../components/LogoHeader";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";
import { API_SRC } from "../env";
import { useCheckSession } from "../hooks/useCheckSession";

export default function LogInScreen({ navigation }) {
  useCheckSession();

  const [sedes, setSedes] = useState([]);
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    const fetchSedes = async () => {
      // console.log(API_SRC, 'login')
      if (!API_SRC) {
        console.error("API_SRC no está definido.");
        return;
      }
      const response = await fetch(`${API_SRC}?url=sede&mostrar=&bitacora=`);
      const data = await response.json();
      const sedes = data.map((row) => {
        return { value: row.id_sede, name: row.nombre };
      });
      setSedes(sedes);
    };
    fetchSedes();
  }, []);

  const login = useAuthStore((state) => state.login);
  const { control, handleSubmit } = useForm();
  const [alert, setAlert] = useState({
    loading: false,
    visible: false,
    type: "error",
    message: "error",
  });

  const closeAlert = () => {
    setAlert({ visible: false });
  };

  const logIn = async (data) => {
    setAlert((state) => ({
      ...state,
      loading: true,
    }));
    const res = await login(
      data.sede,
      `${data.acronym}-${data.cedula}`,
      data.password
    );

    if (!!res.msg) {
      setAlert((state) => ({
        ...state,
        visible: true,
        message: res.msg,
        type: "error",
      }));
    }

    if (res === true) {
      setAlert((state) => ({
        ...state,
        visible: true,
        message: "Se ha iniciado sesion",
        type: "success",
      }));
      navigation.navigate("Dashboard", { screen: "Home" });
    }
    setAlert((state) => ({
      ...state,
      loading: false,
    }));
  };

  return (
    <ScrollView className="flex-1 bg-theme-background">
      <SafeAreaView>
        <StatusBar style="auto" />
        <LogoHeader />
        <View className="flex-1 items-center ">
          <View className="px-5 w-[90%]">
            <Text className="text-[20px] text-theme-primar text-center font-bold mb-[20px]">
              Iniciar sesión
            </Text>

            <Select
              control={control}
              placeholder="Sede"
              name="sede"
              width="w-full"
              options={sedes}
              rules={{
                required: "El acronimo es requerido",
              }}
            />

            <Select
              control={control}
              className="mt-3 -z-50"
              placeholder="Nacionalidad"
              name="acronym"
              width="w-full"
              options={[
                { value: "V", name: "Venezolano" },
                { value: "E", name: "Extranjero" },
              ]}
              rules={{
                required: "El acronimo es requerido",
              }}
            />

            <CustomInput
              className="mt-3 -z-10"
              placeholder="Cédula"
              autoCapitalize="none"
              control={control}
              name="cedula"
              inputMode="numeric"
              rules={{
                required: "Complete la cédula.",
                pattern: {
                  value: /^[0-9]{7,10}$/,
                  message: "La cédula tiene que ser válida",
                },
              }}
            />

            <PasswordInput
              className="mt-3 -z-10"
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
                  message: "La contraseña no puede pasar de los 20 carácteres.",
                },
              }}
            />

            <Button
              className="w-[50%] m-auto mt-4"
              mode="contained"
              loading={alert.loading}
              onPress={handleSubmit(logIn)}
            >
              Iniciar Sesion
            </Button>
          </View>
          <AnchorText href={() => navigation.navigate("Recovery")}>
            ¿Olvidaste tu contraseña?
          </AnchorText>
        </View>
        <Alert
          type={alert.type}
          visible={alert.visible}
          message={alert.message}
          onClose={closeAlert}
        />
      </SafeAreaView>
    </ScrollView>
  );
}
