import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import Animated, { FadeIn, FadeInDown, ZoomIn } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const quotes = [
  "Even moonlight needs rest. Log your vibe, dear traveler.",
  "The stars whisper secrets to those who listen to their hearts.",
  "Every potion begins with a single spark of magic.",
  "Your mood is the first ingredient in any magical brew.",
  "The cauldron of life is always bubbling with possibilities.",
];

export default function HomeScreen({ navigation }) {
  const [dailyQuote, setDailyQuote] = useState('');
  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setDailyQuote(randomQuote);

  }, []);

  return (
    <View style={styles.container}>
      {/* Background image with soft fade-in */}
      <Animated.View
        entering={FadeIn.duration(2000)}
        style={styles.background}
      >
        <Image
          source={require('../assets/magical1.jpg')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      </Animated.View>

      {/* Magical sparkling overlay */}
      <Animated.View
        entering={ZoomIn.duration(3000).delay(500)}
        style={styles.sparkles}
      >
        <Image
          source={require('../assets/sparkles.png')} // Add a soft sparkle overlay image
          style={styles.sparkleImage}
          resizeMode="cover"
        />
      </Animated.View>

      {/* Quote */}
      <Animated.Text
        entering={FadeInDown.duration(1200).delay(1000)}
        style={styles.quote}
      >
        {dailyQuote}
      </Animated.Text>

      {/* Button */}
      <Animated.View
        entering={FadeInDown.duration(1200).delay(1500)}
        style={styles.buttonContainer}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('MoodSelector')}
        >
          <Text style={styles.buttonText}>✨ Log Your Mood ✨</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0c2a', // Deep cosmic background
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial',
  },
  background: {
    position: 'absolute',
    width: width,
    height: height,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
  sparkles: {
    position: 'absolute',
    width: width,
    height: height,
    opacity: 0.2,
  },
  sparkleImage: {
    width: '100%',
    height: '100%',
  },
  quote: {
    fontSize: 24,
    color: '#f0e6f6',
    textAlign: 'center',
    marginHorizontal: 30,
    fontFamily: 'serif',
    textShadowColor: 'rgba(255, 215, 255, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
    marginBottom: 40,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 80,
    width: '80%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#9d00ff',
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 30,
    elevation: 10,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
});
