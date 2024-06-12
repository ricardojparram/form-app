import { useState } from "react";
import { Modal, Portal, Text, Button, PaperProvider } from "react-native-paper";

export default function Modal({ visible, title, children }) {
  const [visible, setVisible] = useState(visible);

  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        <Text className="text-3xl text-black">{title}</Text>
        {children}
      </Modal>
    </Portal>
  );
}
