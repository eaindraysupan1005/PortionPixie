import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import Animated, { FadeIn, Easing, FadeInDown, ZoomIn, withRepeat, withTiming, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import { Audio } from 'expo-av';
import { useFocusEffect } from '@react-navigation/native';

const quotes = [
  "Even moonlight needs rest. Log your vibe, dear traveler",
  "The stars whisper secrets to those who listen to their hearts",
  "Every potion begins with a single spark of magic",
  "Your mood is the first ingredient in any magical brew",
  "The cauldron of life is always bubbling with possibilities",
  "A flicker of hope can ignite an entire constellation of dreams",
  "Magic is the art of seeing the extraordinary in the ordinary",
  "In the quietest moments, the universe speaks loudest",
  "The wind carries whispers of forgotten spells to those who seek",
  "A true magician never stops learning from the world around them",
  "The magic you seek is always found within your own heart",
  "With every dawn, the world is reborn, full of enchantment",
  "To master the art of magic, one must first master the art of patience",
];

export default function HomeScreen({ navigation }) {
  const [dailyQuote, setDailyQuote] = useState('');
  const soundRef = useRef();
  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setDailyQuote(randomQuote);
   const loadAudio = async () => {
         const { sound } = await Audio.Sound.createAsync(
           require('../assets/magicalbg.mp3'),
           { shouldPlay: true, isLooping: true }
         );
         soundRef.current = sound;  // Store sound instance in ref
       };

       loadAudio();

       // Cleanup function when the component is unmounted
       return () => {
         if (soundRef.current) {
           soundRef.current.unloadAsync();  // Stop and unload the audio when leaving the screen
         }
       };
  }, []);

    useFocusEffect(
      React.useCallback(() => {
        return () => {
          if (soundRef.current) {
            soundRef.current.unloadAsync();  // Stop the sound when leaving the screen
          }
        };
      }, [])
    );

   const buttonY = useSharedValue(0);
   useEffect(() => {
     buttonY.value = withRepeat(withTiming(-20, { duration: 800 }), -1, true);
   }, [buttonY]);

   // Animated style for the button
   const buttonAnimatedStyle = useAnimatedStyle(() => {
     return {
       transform: [{ translateY: buttonY.value }],
     };
   });

  return (
    <View style={styles.container}>

    <Text style={styles.welcome}>
      Welcome to
    </Text>

    <Text style={styles.title}>
     <LottieView source={require('../assets/butterfly.json')} autoPlay loop
           style={styles.butterfly}  />PotionPixie
     <LottieView source={require('../assets/butterfly.json')} autoPlay loop style={styles.butterfly} />
    </Text>
      <Text style={styles.quote}>
        "{dailyQuote}"
      </Text>
     <LottieView source={require('../assets/spark.json')} autoPlay loop style={styles.spark} />
      <Image source={require('../assets/Portion.png')} style={styles.image}/>

      <View style={styles.buttonContainer}>
              <Animated.View style={[styles.button, buttonAnimatedStyle]}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('MoodSelector')}
                >
                  <Text style={styles.buttonText}>✨ Log Your Mood ✨</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFA896',
    alignItems: 'center',
//    justifyContent: 'center',
    fontFamily: 'Arial',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  welcome: {
    fontFamily: 'monospace',
    fontSize: 24,
    color: '#9B1313',
    marginTop: 50,
  },
  title:{
    fontFamily: 'serif',
    fontSize: 35,
    fontWeight: 800,
    color: '#9B1313',
    marginBottom: 20,
  },
  butterfly: {
    width: 55,
    height: 60,
  },
  spark: {
    height: 130,
    width: 300,
    position: 'absolute',
    top: '35%',
  },
  quote: {
    fontSize: 20,
    color: '#222',
    textAlign: 'center',
    marginHorizontal: 10,
    fontFamily: 'serif',
    textShadowColor: 'rgba(255, 155, 135, 0.9)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 20,
    marginBottom: 40,
  },
 image: {
  height: 330,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    width: '90%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#9B1313',
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 30,
    elevation: 10,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.6,
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
