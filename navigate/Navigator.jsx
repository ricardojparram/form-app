import HomeScreen from "../screens/HomeScreen";
import LogInScreen from "../screens/LogInScreen";
import PassRecoveryScreen from "../screens/PassRecoveryScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import InventoryScreen from "../screens/InventoryScreen";
import DonationSreen from "../screens/DonationSreen";
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
      initialRouteName="Home"
      screenOptions={{
        headerShown: { isAuthenticated },
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        options={{ title: "Inicio" }}
        component={HomeScreen}
      />
      <Drawer.Screen
        name="Inventory"
        component={InventoryScreen}
        options={{ title: "Inventario de productos" }}
      />
      <Drawer.Screen
       name="Donation"
       component={DonationSreen}
       options={{ title: "Donaciones de productos"}}
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
        <Stack.Screen
          name="Dashboard"
          options={{ title: "Inicio" }}
          component={LoggedInNav}
        />
        <Stack.Screen
          name="LogIn"
          options={{ title: "Iniciar sesión" }}
          component={LogInScreen}
        />
        <Stack.Screen
          name="Recovery"
          options={{ title: "Recuperar contraseña" }}
          component={PassRecoveryScreen}
        />
        <Stack.Screen
          name="ChangePassword"
          options={{ title: "Cambiar contraseña" }}
          component={ChangePasswordScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
