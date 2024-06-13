import { AppRegistry } from "react-native";
import { PaperProvider } from "react-native-paper";
import { name as appName } from "./app.json";
import { theme } from "./global/theme";
import Navigator from "./navigate/Navigator.jsx";
import { useAuthStore } from "./store/authStore.js";
export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Navigator />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => App);
