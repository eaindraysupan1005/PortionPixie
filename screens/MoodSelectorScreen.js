import React, { useState } from 'react';
import { Dimensions, StyleSheet, View, Text, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { Audio } from 'expo-av';

const moods = [
  { id: 1, name: 'Lazy but adorable', emoji: '🐢', color: '#ffcce3' },
  { id: 2, name: 'In love (and delusional)', emoji: '💘', color: '#ffb7d5' },
  { id: 3, name: 'Existentially confused', emoji: '🤔', color: '#b9d6f2' },
  { id: 4, name: 'Ready to conquer', emoji: '🚀', color: '#c7f5c0' },
  { id: 5, name: 'Soft & sad but hopeful', emoji: '🥀', color: '#d8c5e5' },
  { id: 6, name: 'Pure chaos energy', emoji: '🔥', color: '#f5e68d' },
   { id: 7, name: 'Cottagecore cozy', emoji: '🧺', color: '#e2d8c4' },
    { id: 8, name: 'Cosmic dreamer', emoji: '🌌', color: '#cbb4f3' },
    { id: 9, name: 'Spooky but cute', emoji: '👻', color: '#fcdde8' },
    { id: 10, name: 'Starstruck & sparkly', emoji: '🌟', color: '#f6f2ba' },
    { id: 11, name: 'Overthinking everything', emoji: '💫', color: '#c6e2f5' },
    { id: 12, name: 'Peacefully chaotic', emoji: '🕊️', color: '#d0f5dd' },
];


export default function MoodSelectorScreen({ navigation }) {
  const [selectedMood, setSelectedMood] = useState(null);

   const handleMoodSelect = async (mood) => {
      setSelectedMood(mood);

      // Play the magical sound when a mood is selected
      try {
        const { sound } = await Audio.Sound.createAsync(
          require('../assets/twinkle.mp3') // path to your sound file
        );
        await sound.playAsync();
      } catch (error) {
        console.error('Error playing sound:', error);
      }
    };

  // Handle potion mix action
    const handleMixPotion = async () => {
      if (selectedMood) {
        // Play a different sound for the potion mix action
        try {
          const { sound } = await Audio.Sound.createAsync(
            require('../assets/magic.mp3') // path to your potion mix sound file
          );
          await sound.playAsync();
        } catch (error) {
          console.error('Error playing sound:', error);
        }

        navigation.navigate('PotionResult', { mood: selectedMood });
      }
    };

  return (
//    <ImageBackground
//      source={require('../assets/pink.jpg')}
//      style={styles.background}
//      resizeMode="cover"
//    >
//      <View style={styles.overlay}>
        <View style={styles.container}>
        <Text style={styles.title}>Choose Your Magical Vibe</Text>
        <ScrollView contentContainerStyle={styles.moodGrid} showsVerticalScrollIndicator={false}>
          {moods.map((mood, index) => (
            <Animated.View
              key={mood.id}
              entering={FadeInDown.duration(500).delay(index * 100)}
            >
              <TouchableOpacity
                style={[
                  styles.moodCard,
                  { backgroundColor: mood.color + 'aa' }, // add some transparency
                  selectedMood?.id === mood.id && styles.selectedCard,
                ]}
                onPress={() => handleMoodSelect(mood)}
              >
                <Text style={styles.emoji}>{mood.emoji}</Text>
                <Text style={styles.moodName}>{mood.name}</Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
    </ScrollView>

        <Animated.View
          entering={FadeIn.duration(1000).delay(1000)}
          style={styles.buttonContainer}
        >
          <TouchableOpacity
            style={[styles.button, !selectedMood && styles.buttonDisabled]}
            onPress={handleMixPotion}
            disabled={!selectedMood}
          >
            <Text style={styles.buttonText}>🔮 Mix Potion</Text>
          </TouchableOpacity>
        </Animated.View>

        </View>
//    </ImageBackground>
  );
}

const { width } = Dimensions.get('window');
const cardSize = (width - 60) / 2; // for two cards per row with spacing

const styles = StyleSheet.create({
//  background: {
//    flex: 1,
//    width: '100%',
//    height: '100%',
//  },
//  overlay: {
//    flex: 1,
//    backgroundColor: 'rgba(226, 26, 236, 0.04)',
//    paddingHorizontal: 20,
//    paddingTop: 60,
//  },
  container:{
  padding: 20,
  backgroundColor: '#FFA896',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: '#9B1313',
    marginTop: 30,
    marginBottom: 20,
    fontFamily: 'MonoSpace',
    fontWeight: 'bold',
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 140,
  },
  moodCard: {
    width: cardSize,
    height: cardSize,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#555',
    transform: [{ scale: 1.01 }],
  },
  emoji: {
    fontSize: 38,
    marginBottom: 8,
  },
  moodName: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    fontWeight: '600',
    fontFamily: 'serif',
    flexWrap: 'wrap',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#9B1313',
    paddingHorizontal: 30,
    paddingVertical: 16,
    borderRadius: 25,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonDisabled: {
    backgroundColor: '#4a4a4a',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

