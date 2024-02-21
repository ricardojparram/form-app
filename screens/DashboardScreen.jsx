import { SafeAreaView } from "react-native-safe-area-context";
import { AnchorText } from "../components/FormInputs";
import { Text, Button } from "react-native-paper";
import { Image, View, ImageBackground } from "react-native"

export default function DashboardScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <ImageBackground className="h-[100%] w-[100%] flex-1 content-start" source={require('../assets/wave.png')}>
        <View className='pt-[40px] flex-1 max-h-[15%] content-center items-center w-full flex-row gap-2'>
          <Image className="w-[60px] h-[60px]" source={require('../assets/Logo_Medi.png')}></Image>
          <Text className="text-4xl font-bold text-theme-second">Medisalud</Text>
        </View>
        <View className="flex-1 items-center justify-center h-[100%] gap-2">

          <Button mode="contained" onPress={()=> navigation.navigate('LogIn')}>
              Iniciar sesión
          </Button>
          <Button mode="contained" onPress={()=> navigation.navigate('SignIn')}>
              Registro
          </Button>
          <Button mode="contained" onPress={()=> navigation.navigate('Recovery')}>
              Recuperar contraseña
          </Button>
          <Button mode="contained" onPress={()=> navigation.navigate('Profile')}>
              Perfil
          </Button>
          <Button mode="contained" onPress={()=> navigation.navigate('ChangePassword')}>
              Cambiar Contraseña
          </Button>
        </View>

      </ImageBackground>
</SafeAreaView>
  );
}
