import HomeScreen from "../screens/HomeScreen";
import LogInScreen from "../screens/LogInScreen";
import PassRecoveryScreen from "../screens/PassRecoveryScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import InventoryScreen from "../screens/InventoryScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { useAuthStore } from "../store/authStore";
import { DrawerContent } from "./DrawerContent";
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export const LoggedInNav = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  console.log("isAuthenticated: " + isAuthenticated);
  return (
    <Drawer.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        headerShown: { isAuthenticated },
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="LogIn" component={LogInScreen} />
      <Drawer.Screen name="Inicio" component={HomeScreen} />
      <Drawer.Screen
        name="Inventario"
        component={InventoryScreen}
        options={{ orientation: "landscape" }}
      />
    </Drawer.Navigator>
  );
};

export const LoginNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LogIn"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Dashboard" component={LoggedInNav} />
        <Stack.Screen name="LogIn" component={LogInScreen} />
        <Stack.Screen name="Recovery" component={PassRecoveryScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
