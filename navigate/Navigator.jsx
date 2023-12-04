import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogInScreen from '../screens/LogInScreen'
import SignInScreen from '../screens/SignInScreen'

const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Iniciar sesión"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Iniciar sesión" component={LogInScreen} />
        <Stack.Screen name="Registrarse" component={SignInScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
