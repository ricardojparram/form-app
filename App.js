import { AppRegistry } from "react-native";
import { PaperProvider } from "react-native-paper";
import { name as appName } from "./app.json";
import { theme } from "./global/theme";
import { LoginNav } from "./navigate/Navigator";

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <LoginNav />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => App);
