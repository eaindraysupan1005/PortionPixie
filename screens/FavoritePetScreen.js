import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function FavoritePetScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem('favoritePets');
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading favorite pets:', error);
    }
  };
  const handleRemoveFavorite = async (name) => {
      try {

        const updatedFavorites = favorites.filter(pet => pet.name !== name);
        setFavorites(updatedFavorites);
        await AsyncStorage.setItem('favoritesPets', JSON.stringify(updatedFavorites));
      } catch (error) {
        console.error('Error removing potion:', error);
      }
    };
  const colors = [
      '#ffcce3', '#b9d6f2', '#ffb7d5', , '#c7f5c0',
      '#d8c5e5', '#fffab0', '#e2d8c4', '#cbb4f3',
      '#fcdde8', '#f6f2ba', '#c6e2f5', '#d0f5dd'
    ];

  return (
     <View style={styles.container}>
         <ScrollView contentContainerStyle={styles.scrollContainer}  showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>🦄 Your Favorite Magical Pets</Text>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorite pets yet! Go adopt some magic! 🐾</Text>
      ) : (
        favorites.map((pet, index) => (
  <View key={index} style={[styles.card, { backgroundColor: colors[index % colors.length] }]}>
  <TouchableOpacity onPress={() => handleRemoveFavorite(pet.name)} style={styles.removeButton}>
                <MaterialCommunityIcons name="delete" size={22} color="#9B1313" />
              </TouchableOpacity>
            <Text style={styles.petName}>✨ {pet.name}</Text>
            <Image source={pet.image} style={styles.petImage} />
            <Text style={styles.detail}><Text style={styles.sectionTitle}>🧸 Favorite Item:</Text> {pet.favoriteItem}</Text>
             <Text style={styles.detail}><Text style={styles.sectionTitle}>💬 Catchphrase:</Text> "{pet.catchphrase}"</Text>
            <Text style={styles.detail}><Text style={styles.sectionTitle}>⏳ Mini Mission:</Text> {pet.mission}</Text>
          </View>
        ))
      )}

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>🦄 Go Back</Text>
      </TouchableOpacity>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 20,
    paddingBottom: 10,
    backgroundColor: '#FFA896',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    paddingTop: 40,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#9B1313',
  },
  card: {
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  removeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'transparent',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#9B1313',
        padding: 5,
      },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#660033',
    marginBottom: 10,
    marginTop: 30,
  },
  petImage: {
    height: 120,
    width: 120,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#660033',
    marginTop: 5,
  },
  detail: {
    fontSize: 14,
    color: '#660033',
    marginBottom:5,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#d1005d',
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#9B1313',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'center',
  },
  backButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});
