import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function FavoritePotionScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  );

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem('favorites');
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/pink.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🔮 Your Favorite Potions</Text>

        {favorites.length === 0 ? (
          <Text style={styles.emptyText}> No favorites yet! Go brew some!🧪</Text>
        ) : (
          favorites.map((potion, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.potionName}>✨ {potion.name}</Text>

              <Text style={styles.sectionTitle}>🧪 Ingredients:</Text>
              {potion.ingredients.map((ingredient, idx) => (
                <Text key={idx} style={styles.ingredient}>✧ {ingredient}</Text>
              ))}

              <Text style={styles.sectionTitle}>📜 Tale:</Text>
              <Text style={styles.tale}>🪄 {potion.tale}</Text>
            </View>
          ))
        )}

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>🦄 Go Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    paddingTop: 40,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  card: {
    backgroundColor: '#ffccf9cc', // slightly transparent card
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
  },
  potionName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#660033',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#660033',
    margin: 10,
  },
  ingredient: {
    marginLeft: 5,
    color: '#660033',
    marginBottom: 10,
  },
  tale: {
    fontStyle: 'italic',
    color: '#660033',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#d1005d',
  },
  backButton: {
    marginTop: 30,
    backgroundColor: '#ff7eb9',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'center',
  },
  backButtonText: {
  fontSize: 18,
   color: 'white',
   fontWeight: 'bold',
  },
});
