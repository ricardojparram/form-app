import { ScrollView } from "react-native-gesture-handler";
import { Modal, Portal, Surface, Text, Button } from "react-native-paper";

const containerStyle = { backgroundColor: "white", padding: 20 };
export const CustomModal = ({ visible, onDismiss, title, children }) => {
  return (
    <Portal>
      <Modal
        className="m-4"
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={containerStyle}
      >
        <ScrollView className="flex gap-4">
          <Text className="text-2xl text-black">{title}</Text>

          {children}
        </ScrollView>
        <Button
          mode="contained-tonal"
          className="w-28 ml-auto mt-8"
          onPress={onDismiss}
        >
          Ok
        </Button>
      </Modal>
    </Portal>
  );
};
