// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import MoodSelectorScreen from './screens/MoodSelectorScreen';
import PotionResultScreen from './screens/PotionResultScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MoodSelector" component={MoodSelectorScreen} />
        <Stack.Screen name="PotionResult" component={PotionResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}