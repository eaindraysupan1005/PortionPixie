import React, { useState } from 'react';
import { Dimensions, StyleSheet, View, Text, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

const moods = [
  { id: 1, name: 'Lazy but adorable', emoji: '😴', color: '#f3c9dc' },
  { id: 2, name: 'In love (and delusional)', emoji: '💘', color: '#ffb7d5' },
  { id: 3, name: 'Existentially confused', emoji: '🤔', color: '#b9d6f2' },
  { id: 4, name: 'Ready to conquer', emoji: '💪', color: '#c7f5c0' },
  { id: 5, name: 'Soft & sad but hopeful', emoji: '🌧️', color: '#d8c5e5' },
  { id: 6, name: 'Pure chaos energy', emoji: '⚡', color: '#f5e68d' },
   { id: 7, name: 'Cottagecore cozy', emoji: '🧺', color: '#e2d8c4' },
    { id: 8, name: 'Cosmic dreamer', emoji: '🌌', color: '#cbb4f3' },
    { id: 9, name: 'Spooky but cute', emoji: '👻', color: '#fcdde8' },
    { id: 10, name: 'Starstruck & sparkly', emoji: '🌟', color: '#f6f2ba' },
    { id: 11, name: 'Overthinking everything', emoji: '🌀', color: '#c6e2f5' },
    { id: 12, name: 'Peacefully chaotic', emoji: '🧘‍♀️', color: '#d0f5dd' },
];


export default function MoodSelectorScreen({ navigation }) {
  const [selectedMood, setSelectedMood] = useState(null);

  const handleMoodSelect = (mood) => setSelectedMood(mood);
  const handleMixPotion = () => {
    if (selectedMood) {
      navigation.navigate('PotionResult', { mood: selectedMood });
    }
  };

  return (
    <ImageBackground
      source={require('../assets/magical-background.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
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
            <Text style={styles.buttonText}>Mix Potion</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ImageBackground>
  );
}

const { width } = Dimensions.get('window');
const cardSize = (width - 60) / 2; // for two cards per row with spacing

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(26, 26, 46, 0.5)',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 25,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'serif',
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 120,
  },
  moodCard: {
    width: cardSize,
    height: cardSize,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    padding: 12,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#fff',
    transform: [{ scale: 1.02 }],
  },
  emoji: {
    fontSize: 38,
    marginBottom: 8,
  },
  moodName: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontFamily: 'serif',
    flexWrap: 'wrap',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#6a0572',
    paddingHorizontal: 40,
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
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

