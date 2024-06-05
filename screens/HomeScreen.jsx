import { SafeAreaView } from "react-native-safe-area-context";
import { AnchorText } from "../components/FormInputs";
import { Text } from "react-native-paper";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1 items-center justify-center gap-5 bg-theme-background">
      <Text className="text-4xl text-black">Admin </Text>
      {/* <Text className="text-4xl text-black">Rutas de las vistas: </Text> */}
      {/* <AnchorText className="" href={() => navigation.navigate("LogIn")}>
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
      </AnchorText> */}
    </SafeAreaView>
  );
}
