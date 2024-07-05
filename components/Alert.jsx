import { View } from "react-native";
import { Dialog, Portal, Text, Button, IconButton } from "react-native-paper";

const alertStyles = {
  success: {
    container: "bg-theme-background",
    icon: "check-circle",
    color: "#058f00",
  },
  error: {
    container: "bg-red-100",
    icon: "alert-circle",
    color: "red",
  },
  warning: {
    container: "bg-yellow-100",
    icon: "alert",
    color: "yellow",
  },
  info: {
    container: "bg-blue-100",
    icon: "information",
    color: "blue",
  },
};

export default function Alert({ type, title, visible, message, onClose }) {
  const { container, icon, color } = alertStyles[type] || alertStyles.info;

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onClose} className={container}>
        <Dialog.Title>
          <View className="flex flex-row items-center">
            <IconButton icon={icon} iconColor={color} size={24} />
            <Text style={{ color }}>{title ?? type}</Text>
          </View>
        </Dialog.Title>
        <Dialog.Content>
          <Text>{message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onClose}>OK</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
