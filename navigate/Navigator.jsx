import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogInScreen from '../screens/LogInScreen'
import SignInScreen from '../screens/SignInScreen'
import PassRecoveryScreen from '../screens/PassRecoveryScreen'

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
        <Stack.Screen name="LogIn" component={LogInScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Recovery" component={PassRecoveryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
