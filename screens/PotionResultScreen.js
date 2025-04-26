import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Share, ImageBackground } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

export default function PotionResultScreen({ route, navigation }) {
  const { mood } = route.params;
  const [potion, setPotion] = useState(null);

  const loadPotionData = async () => {
    try {
     const potionData = require('../assets/portionData.json');

      // Get the potions for the selected mood
      const moodPotions = potionData[mood.name];

      // Randomly select a potion from the available potions
      const randomPotion = moodPotions[Math.floor(Math.random() * moodPotions.length)];

      // Set the potion in the state
      setPotion(randomPotion);
    } catch (error) {
      console.error('Error reading potion data:', error);
    }
  };

  useEffect(() => {
    loadPotionData();
  }, [mood]);

  const handleShare = async () => {
    try {
      if (!potion) return;

      const message = `✨ ${potion.name} ✨\n\nIngredients:\n${potion.ingredients.join('\n')}\n\n${potion.tale}\n\nCreated with PortionPixie 🧪`;
      await Share.share({
        message,
      });
    } catch (error) {
      console.error('Error sharing:', error);
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
   <ImageBackground
      source={require('../assets/magical-background.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
    <ScrollView style={styles.container}>
      <Animated.View
        entering={FadeIn.duration(1000)}
        style={styles.content}
      >
        <Text style={styles.potionName}>{potion.name}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients:</Text>
          {potion.ingredients.map((ingredient, index) => (
            <Animated.Text
              key={index}
              entering={FadeInDown.duration(500).delay(index * 200)}
              style={styles.ingredient}
            >
              • {ingredient}
            </Animated.Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Magical Tale:</Text>
          <Animated.Text
            entering={FadeInDown.duration(1000).delay(1000)}
            style={styles.tale}
          >
            {potion.tale}
          </Animated.Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => navigation.navigate('MoodSelector')}
          >
            <Text style={styles.buttonText}>Brew Another</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={handleShare}
          >
            <Text style={styles.buttonText}>Share with Coven</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ScrollView>
        </View>
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
background: {
  flex: 1,
  width: '100%',
  height: '100%',
},
overlay: {
   flex: 1,
      backgroundColor: 'rgba(26, 26, 46, 0.85)',
      paddingHorizontal: 20,
      paddingTop: 60, // optional dark overlay for readability
},
  content: {
    padding: 20,
  },
  potionName: {
    fontSize: 26,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'serif',
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 10,
    fontFamily: 'serif',
  },
  ingredient: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 5,
    marginLeft: 10,
  },
  tale: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 40,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 5,
  },
  primaryButton: {
    backgroundColor: '#6a0572',
  },
  secondaryButton: {
    backgroundColor: '#4a4a4a',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
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
});
