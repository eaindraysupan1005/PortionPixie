import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function FavoritePotionScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);
  const colors = [
        '#ffcce3', '#b9d6f2', '#ffb7d5', , '#c7f5c0',
        '#d8c5e5', '#fffab0', '#e2d8c4', '#cbb4f3',
        '#fcdde8', '#f6f2ba', '#c6e2f5', '#d0f5dd'
      ];

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

  const handleRemoveFavorite = async (potionName) => {
      try {
        const updatedFavorites = favorites.filter(fav => fav.name !== potionName);
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
      } catch (error) {
        console.error('Error removing favorite:', error);
      }
    };

  return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}  showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>🔮 Your Favorite Potions</Text>
        {favorites.length === 0 ? (
          <Text style={styles.emptyText}> No favorites yet! Go brew some!🧪</Text>
        ) : (
          favorites.map((potion, index) => (
            <View key={index} style={[styles.card, { backgroundColor: colors[index % colors.length] }]}>
              <TouchableOpacity onPress={() => handleRemoveFavorite(potion.name)} style={styles.removeButton}>
              <MaterialCommunityIcons name="delete" size={24} color="#9B1313" />
            </TouchableOpacity>
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
          <Text style={styles.backButtonText}>🔮 Go Back</Text>
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
    backgroundColor: '#ffccf9cc', // slightly transparent card
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#555',
  },
   removeButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: 'transparent',
      borderRadius: 20,
      borderWidth: 1,
      padding: 5,
      borderColor: '#9B1313',
    },
  potionName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#660033',
    marginBottom: 10,
    marginTop: 30,
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
    marginBottom:5,
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
    marginTop: 10,
    backgroundColor: '#9B1313',
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
