import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView ,Image,  ImageBackground } from 'react-native';
import { Audio } from 'expo-av'; // Import Audio from expo-av
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as MediaLibrary from 'expo-media-library';
import { AntDesign } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { captureRef } from 'react-native-view-shot';

export default function PotionResultScreen({ route, navigation }) {
  const { mood } = route.params;
  const [potion, setPotion] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const cardRef = useRef();

  const Images = [
    require('../assets/card.jpg'),
    require('../assets/card1.jpg'),
    require('../assets/card2.jpg'),
    require('../assets/card3.jpg'),
    require('../assets/card4.jpg'),
    require('../assets/card5.jpg'),
    require('../assets/card6.jpg'),
    require('../assets/card7.jpg'),
    require('../assets/card3.webp'),
  ];
  const colors = [ '#ffcce3','#ffb7d5','#b9d6f2','#c7f5c0',
  '#d8c5e5','#f5e68d','#e2d8c4','#cbb4f3','#fcdde8','#f6f2ba','#c6e2f5','#d0f5dd'
  ];

const [selectedImage, setSelectedImage] = useState(null);
const [selectedColor, setSelectedColor] = useState(null);

  const loadPotionData = async () => {
    try {
      const potionData = require('../assets/portionData.json');
      const moodPotions = potionData[mood.name];
      const randomPotion = moodPotions[Math.floor(Math.random() * moodPotions.length)];
      const randomImage = Images[Math.floor(Math.random() * Images.length)];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setPotion(randomPotion);
       setSelectedImage(randomImage);
       setSelectedColor(randomColor);
      setIsFavorite(false); // Reset favorite state
    } catch (error) {
      console.error('Error reading potion data:', error);
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

  useEffect(() => {
    loadPotionData();
  }, [mood]);

  const handleSave = async () => {
    try {
      const permission = await MediaLibrary.requestPermissionsAsync();
      if (!permission.granted) {
        alert('Permission to access media library is required!');
        return;
      }
      const uri = await captureRef(cardRef, {
        format: 'png',
        quality: 1,
      });
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('PotionCards', asset, false);
      alert('Potion card saved to your Photos! 📸');
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image.');
    }
  };

  const handleFavorite = async () => {
    try {
      const existing = await AsyncStorage.getItem('favorites');
      let favorites = existing ? JSON.parse(existing) : [];

      const alreadyExists = favorites.some(fav => fav.name === potion.name);

      if (!alreadyExists) {
        favorites.push(potion);
        await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
        setIsFavorite(true);
      } else {
      setIsFavorite(true);
        console.log('Potion already exists in favorites!');
      }
    } catch (error) {
      console.error('Error saving favorite potion:', error);
    }
  };


  if (!potion) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading Potion...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.cardWrapper}>
        <View ref={cardRef} style={[styles.card, { backgroundColor: selectedColor }]}>
          {/* Love Icon */}
          <TouchableOpacity onPress={handleFavorite} style={styles.loveIcon}>
            <AntDesign name={isFavorite ? "heart" : "hearto"} size={24} color="#660033" />
          </TouchableOpacity>

          <Text style={styles.potionName}>✨ {potion.name} ✨</Text>
            {selectedImage && (
                      <Image source={selectedImage} style={styles.cardImage} />                    )}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🧪 Ingredients:</Text>
            {potion.ingredients.map((ingredient, index) => (
              <Text key={index} style={styles.ingredient}>
                ✧ {ingredient}
              </Text>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📜 Magical Tale:</Text>
            <Text style={styles.tale}> 🪄 {potion.tale} 🪄
            </Text>
           </View>
           <LottieView source={require('../assets/wand.json')} autoPlay loop style={styles.wand} />
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={() => playSoundAndNavigate(require('../assets/magic.mp3'), 'MoodSelector')}        >
          <Text style={styles.buttonText}>🔮 Brew Another</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={handleSave}  >
          <Text style={styles.buttonText}>Save to Phone</Text>
        </TouchableOpacity>
      </View>

      {/* View Favorites Button */}
      <View style={styles.viewFavButtonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.viewFavButton]}
          onPress={() => playSoundAndNavigate(require('../assets/magic0.mp3'), 'FavoritePotions')} >
          <Text style={styles.buttonText}>🤍 View Favorite Potions</Text>
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
  potionName: {
    fontSize: 22,
    color: '#9B1313',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    fontFamily: 'serif',
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#000',
    marginBottom: 10,
    fontFamily: 'serif',
  },
  ingredient: {
    fontSize: 16,
    color: '#000',
    marginVertical: 5,
    marginLeft: 10,
  },
  tale: {
    fontSize: 16,
    color: '#000',
    lineHeight: 26,
    fontStyle: 'italic',
  },
  wand:{
  width: 200,
  height: 80,
  position: 'absolute',
  top: '33%',
  right: 0,
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
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
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
    padding: 15,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#660033',
//    backgroundColor: '#FFA896',
    shadowColor: '#000',
    shadowOpacity: 0.9,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },
  cardImage:{
  height: 150,
  width: 150,
   margin: 'auto',
   borderRadius: 15,
   borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.9,
    shadowRadius: 10,
    marginBottom: 15,
    shadowOffset: { width: 1, height: 4 },
  },
  loveIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 10,
    backgroundColor: 'transparent',
    borderRadius: 30,
    padding: 5,
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
});
