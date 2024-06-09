import { SafeAreaView } from "react-native-safe-area-context";
import { AnchorText } from "../components/FormInputs";
import { Button, Text } from "react-native-paper";
import { useCheckSession } from "../hooks/useCheckSession";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";

export default function HomeScreen({ navigation }) {
  useCheckSession();
  const logout = useAuthStore((state) => state.logout);
  const handleLogOut = () => {
    logout();
    navigation.navigate("LogIn");
  };
  return (
    <SafeAreaView className="flex-1 items-center justify-center gap-5 bg-theme-background">
      <Text className="text-4xl text-black">Admin </Text>
      <Text className="text-4xl text-black">Rutas de las vistas: </Text>

      <AnchorText className="" href={() => navigation.navigate("LogIn")}>
        Ir a Iniciar Sesión
      </AnchorText>

      <AnchorText href={() => navigation.navigate("Recovery")}>
        Ir a Recuperar Contraseña
      </AnchorText>

      <Button
        className="w-[50%] m-auto mt-4"
        mode="contained"
        onPress={handleLogOut}
      >
        Log Out
      </Button>
    </SafeAreaView>
  );
}
