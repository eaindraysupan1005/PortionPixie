// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import MoodSelectorScreen from './screens/MoodSelectorScreen';
import PotionResultScreen from './screens/PotionResultScreen';
import FavoritePotionScreen from './screens/FavoritePotionScreen';
import MagicalPetScreen from './screens/MagicalPetScreen';
import FavoritePetScreen from './screens/FavoritePetScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MoodSelector" component={MoodSelectorScreen} />
        <Stack.Screen name="PotionResult" component={PotionResultScreen} />
        <Stack.Screen name="FavoritePotions" component={FavoritePotionScreen} />
        <Stack.Screen name="MagicalPet" component={MagicalPetScreen} />
         <Stack.Screen name="FavoritePet" component={FavoritePetScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}