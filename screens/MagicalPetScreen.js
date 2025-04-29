import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import { AntDesign } from '@expo/vector-icons';
import petData from '../assets/petData.json';
import { Audio } from 'expo-av';

export default function MagicalPetScreen({ route, navigation }) {
  const { mood } = route.params;
  const [petImage, setPetImage] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState('#FFC0CB');
  const [isFavorite, setIsFavorite] = useState(false);
  const [petDetails, setPetDetails] = useState(null);
  const cardRef = React.useRef();

  const petImages = {
    'Lazy but adorable': require('../assets/seal.png'),
    'In love (and delusional)': require('../assets/bunny.png'),
    'Existentially confused': require('../assets/owl.png'),
    'Ready to conquer': require('../assets/giraffe.png'),
    'Soft & sad but hopeful': require('../assets/cat.png'),
    'Pure chaos energy': require('../assets/fox.png'),
    'Cottagecore cozy': require('../assets/cow.png'),
    'Cosmic dreamer': require('../assets/unicorn.png'),
    'Spooky but cute': require('../assets/duck.png'),
    'Starstruck & sparkly': require('../assets/reindeer.png'),
    'Overthinking everything': require('../assets/capybara.png'),
    'Peacefully chaotic': require('../assets/polar.png'),
  };

  const colors = [
    '#FFD6E8', '#FFE8D6', '#D6F5FF', '#D6FFD6',
    '#F2D6FF', '#FFFBD6', '#F9D6FF', '#D6FFF9',
    '#FFDEE0', '#E8D6FF', '#E6F7FF', '#FFF0D6'
  ];

  useEffect(() => {
    loadPet();
  }, []);

  const loadPet = async () => {
    try {
      const petData = require('../assets/petData.json');

      // Find the pet details corresponding to the mood
      const selectedPet = petData[mood.name];

      if (selectedPet) {
        const randomImage = petImages[mood.name]; // You can also choose random pet image if needed
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        setPetImage(randomImage);
        setBackgroundColor(randomColor);
        setPetDetails(selectedPet);
      } else {
        console.error('Pet data for the current mood not found.');
      }
    } catch (error) {
      console.error('Error reading pet data:', error);
    }
  };


  const handleSave = async () => {
    try {
      const permission = await MediaLibrary.requestPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permission Needed', 'Please allow access to save images.');
        return;
      }
      const uri = await captureRef(cardRef, {
        format: 'png',
        quality: 1,
      });
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('MagicalPets', asset, false);
      Alert.alert('Saved!', 'Your magical pet is saved to your gallery! 🐾');
    } catch (error) {
      console.error('Error saving pet:', error);
      Alert.alert('Oops!', 'Could not save the pet.');
    }
  };

const playSoundAndNavigate = async (soundFile, screenName) => {
  try {
    const { sound } = await Audio.Sound.createAsync(soundFile);
    await sound.playAsync();
    navigation.navigate(screenName);
  } catch (error) {
    console.error('Error playing sound and navigating:', error);
    navigation.navigate(screenName); // Fallback: still navigate
  }
};


  const handleFavorite = async () => {
    try {
      const existing = await AsyncStorage.getItem('favoritePets');
      let favorites = existing ? JSON.parse(existing) : [];
      const petData = require('../assets/petData.json');

      // Find the pet details corresponding to the mood
      const selectedPet = petData[mood.name];
      const petInfo = {
      name: selectedPet.name,
        temperament: selectedPet.temperament,
        favoriteItem: selectedPet.favorite_item,
        catchphrase: selectedPet.catchphrase,
        mission: selectedPet.mini_mission,
        image: petImages[mood.name], // Store the image URI or name
      };

      const alreadyExists = favorites.some(fav => fav.name === petInfo.name);
      if (!alreadyExists) {
        favorites.push(petInfo);
        await AsyncStorage.setItem('favoritePets', JSON.stringify(favorites));
        setIsFavorite(true);
      } else {
        setIsFavorite(true);
        console.log('Pet already in favorites');
      }
    } catch (error) {
      console.error('Error saving favorite pet:', error);
    }
  };


  if (!petImage) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Summoning your Magical Pet...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.cardWrapper}>
        <View ref={cardRef} style={[styles.card, { backgroundColor }]}>
          <TouchableOpacity onPress={handleFavorite} style={styles.loveIcon}>
            <AntDesign name={isFavorite ? "heart" : "hearto"} size={24} color="#660033" />
          </TouchableOpacity>

          <Text style={styles.petTitle}>✨ {petDetails.name} ✨</Text>
          <Image source={petImage} style={styles.petImage} />
          {petDetails && (
                   <View style={styles.petDetails}>
                      {/* Temperament */}
                     <View style={styles.detailSection}>
                       <Text style={styles.detailTitle}>Temperament</Text>
                       <Text style={styles.detailValue}>{petDetails.temperament}</Text>
                     </View>

                     {/* Favorite Item */}
                     <View style={styles.detailSection}>
                       <Text style={styles.detailTitle}>Favorite Item</Text>
                       <Text style={styles.detailValue}>{petDetails.favorite_item}</Text>
                     </View>

                     {/* Catchphrase */}
                     <View style={styles.detailSection}>
                       <Text style={styles.detailTitle}>Catchphrase</Text>
                       <Text style={styles.detailValue}>"{petDetails.catchphrase}"</Text>
                     </View>

                     {/* Mini Mission */}
                     <View style={styles.detailSection}>
                       <Text style={styles.detailTitle}>Mini Mission</Text>
                       <Text style={styles.detailValue}>{petDetails.mini_mission}</Text>
                     </View>
                   </View>
                 )}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
           onPress={() => playSoundAndNavigate(require('../assets/pet.mp3'), 'MoodSelector')}
        >
          <Text style={styles.buttonText}>🦄Meet New Pet</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>Save to Phone</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.viewFavButtonContainer}>
        <TouchableOpacity style={[styles.button, styles.viewFavButton]}
           onPress={() => playSoundAndNavigate(require('../assets/magic0.mp3'), 'FavoritePet')} >
          <Text style={styles.buttonText}>🤍 View Favorite Pets</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFA896',
    paddingHorizontal: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
  },
  loadingText: {
    color: '#fff',
    fontSize: 22,
    fontFamily: 'serif',
  },
  cardWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 60,
    marginBottom: 5,
    shadowColor: '#fff',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  card: {
    paddingTop: 20,
    paddingHorizontal: 4,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#660033',
    shadowColor: '#000',
    shadowOpacity: 0.9,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
    alignItems: 'center',
  },
  petTitle: {
    fontSize: 20,
    color: '#9B1313',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 30,
    fontFamily: 'serif',
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  petImage: {
    height: 240,
    width: 240,
  },
//  wand: {
//    width: 200,
//    height: 200,
//    position: 'absolute',
//    top: '35%',
//    right: -35,
//  },
  loveIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 10,
    backgroundColor: 'transparent',
    borderRadius: 30,
    padding: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: '#9B1313',
  },
  secondaryButton: {
    backgroundColor: '#000',
  },
  viewFavButtonContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  viewFavButton: {
    backgroundColor: '#d14182',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
petDetails: {
    marginTop: 5,
    paddingHorizontal: 10,
    width: '100%',
    borderRadius: 15,
    padding: 15,
    },
  detailTitle: {
    fontSize: 15,
    color: '#000',
    textAlign: 'center',
    marginBottom: 5,
  },
  detailSection: {
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 17,
    color: '#9B1313',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
