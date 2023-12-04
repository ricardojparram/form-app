import { AppRegistry } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { expo.name as appName } from './app.json';
import { theme } from './global/theme';
import { Navigator } from './navigate/Navigator.jsx'

export default function App() {

  return (
    <PaperProvider theme={theme}>
      <Navigator/>
    </PaperProvider>
  );
}
console.log(appName)
AppRegistry.registerComponent(appName, () => App);
