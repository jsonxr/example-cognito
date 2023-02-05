import 'react-native-get-random-values'; // Needed by ulid

import {AppRegistry} from 'react-native';
import {App} from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
