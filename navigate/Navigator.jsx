import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogInScreen from "../screens/LogInScreen";
import SignInScreen from "../screens/SignInScreen";
import PassRecoveryScreen from "../screens/PassRecoveryScreen";
import ProfileScreen from "../screens/ProfileScreen";
import HomeScreen from "../screens/HomeScreen";
import DashboardScreen from "../screens/DashboardScreen";

const Stack = createNativeStackNavigator();
export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="LogIn" component={LogInScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Recovery" component={PassRecoveryScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
