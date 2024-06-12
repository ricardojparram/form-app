import React from "react";
import { View, StyleSheet } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Title, Caption, Drawer, Text } from "react-native-paper";
import { useAuthStore } from "../store/authStore";

export function DrawerContent({ navigation }, ...props) {
  const [logout, user] = useAuthStore((state) => [state.logout, state.user]);
  const handleLogOut = () => {
    logout();
    navigation.navigate("LogIn");
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <Title style={styles.title}>
            {user?.nombre + " " + user?.apellido}
          </Title>
          <Text className="text-lg">{user?.puesto}</Text>
          <Caption style={styles.caption}>{user?.sede}</Caption>
        </View>
        <Drawer.Section>
          <Drawer.Item
            icon="logout-variant"
            label="Perfil"
            onPress={() => {}}
          />
          <Drawer.Item label="Cerrar sesion" onPress={handleLogOut} />
        </Drawer.Section>
        <Drawer.Item
          icon="home"
          label="Inicio"
          onPress={() => {
            navigation.navigate("Inicio");
          }}
        />
        <Drawer.Item
          icon="inbox-multiple"
          label="Inventario"
          onPress={() => {
            navigation.navigate("Inventario");
          }}
        />
      </View>
    </DrawerContentScrollView>
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
    marginTop: 20,
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
