import { AppRegistry } from "react-native";
import { PaperProvider } from "react-native-paper";
import { name as appName } from "./app.json";
import { theme } from "./global/theme";
import Navigator from "./navigate/Navigator.jsx";
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  console.log(theme.colors.primary);
  return (
    <PaperProvider theme={theme}>
      <Navigator />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => App);
