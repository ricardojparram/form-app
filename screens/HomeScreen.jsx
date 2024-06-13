import { SafeAreaView } from "react-native-safe-area-context";
import { AnchorText } from "../components/FormInputs";
import { Button, Text } from "react-native-paper";
import { useCheckSession } from "../hooks/useCheckSession";
import { useAuthStore } from "../store/authStore";
export default function HomeScreen({ navigation }) {
  // const state = useAuthStore((state) => state);
  const logOut = useAuthStore((state) => state.logout);
  // console.log(state);
  useCheckSession();
  return (
    <SafeAreaView className="flex-1 items-center justify-center gap-5 bg-theme-background">
      <Text className="text-4xl text-black">Admin </Text>
      <Text className="text-4xl text-black">Rutas de las vistas: </Text>
      <AnchorText className="" href={() => navigation.navigate("LogIn")}>
        Ir a Iniciar Sesión
      </AnchorText>

      <AnchorText href={() => navigation.navigate("SignIn")}>
        Ir a Registrar
      </AnchorText>

      <AnchorText href={() => navigation.navigate("Recovery")}>
        Ir a Recuperar Contraseña
      </AnchorText>

      <AnchorText href={() => navigation.navigate("Profile")}>
        Ir a Perfil de Usuario
      </AnchorText>
      <Button
        className="w-[50%] m-auto mt-4"
        mode="contained"
        onPress={() => {
          logOut();
          navigation.navigate("LogIn");
        }}
      >
        Log Out
      </Button>
    </SafeAreaView>
  );
}
