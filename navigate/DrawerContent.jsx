import React from "react";
import { View, StyleSheet } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Title, Caption, Drawer, Text } from "react-native-paper";
import { useAuthStore } from "../store/authStore";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export function DrawerContent({ navigation }, ...props) {
  const [logout, user] = useAuthStore((state) => [state.logout, state.user]);
  const handleLogOut = () => {
    logout();
    navigation.navigate("LogIn");
  };

  return (
    <SafeAreaView
      style={{ flex: 1 }}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <StatusBar style={{ flex: 1 }} />
      <DrawerContentScrollView {...props}>
        <Drawer.Section className="pb-2">
          <View style={styles.userInfoSection}>
            <Title style={styles.title}>
              {user?.nombre + " " + user?.apellido}
            </Title>
            <Text className="text-lg">{user?.puesto}</Text>
            <Caption style={styles.caption}>{user?.sede}</Caption>
          </View>
        </Drawer.Section>
        <Drawer.Item
          icon="home-outline"
          label="Inicio"
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
        <Drawer.Item
          icon="package-variant-closed"
          label="Inventario de productos"
          onPress={() => {
            navigation.navigate("Inventory");
          }}
        />
      </DrawerContentScrollView>
      <Drawer.Item icon="account-outline" label="Perfil" onPress={() => {}} />
      <Drawer.Item
        icon="logout-variant"
        label="Cerrar sesion"
        onPress={handleLogOut}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    justifyContent: "flex-end",
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
