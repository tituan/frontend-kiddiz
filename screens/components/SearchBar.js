import React from "react";
import { TouchableOpacity, Text, StyleSheet, TextInput, View } from "react-native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect, useState} from 'react';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useRoute } from '@react-navigation/native';
// import { useNavigation } from '@react-navigation/native';

function SearchBar({ onSearch }) {
  const route = useRoute(); // Récupère la route actuelle

  const [loaded, error] = useFonts({
      'LilitaOne-Regular': require('../../assets/fonts/LilitaOne-Regular.ttf'),
      'RopaSans-Regular': require('../../assets/fonts/RopaSans-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
        SplashScreen.hideAsync();
        }
    }, [loaded, error]);

if (!loaded && !error) {
    return null;
} 

const [isFocused, setIsFocused] = useState(false);
const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {

    if (searchTerm.trim()) { // Vérifie que le terme de recherche n'est pas vide
      onSearch(searchTerm); // Appelle la fonction passée via les props
      
    }
  };

return route.name === 'Home' ? (
    <View style={styles.searchContainer}>
        <TouchableOpacity
            style={styles.buttonFilter} 
            activeOpacity={0.7}
        >
            <Text style={styles.buttonFilterText}>Filtres :</Text>
        </TouchableOpacity>
      <View style={styles.inputContainer}>
        <TextInput 
        style={styles.searchBar} 
        placeholderTextColor="#888" 
        placeholder="Rechercher..."
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChangeText={setSearchTerm} // Met à jour le terme de recherche
        value={searchTerm} // Contrôle la valeur du champ
        >
        </TextInput>
        {isFocused && <FontAwesome name="search" size={20} color="black" style={styles.icon} onPress={handleSearch}/>}
        </View>
    </View>
  ) : null;
}
export default SearchBar;

const styles = StyleSheet.create({
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  buttonFilter: {
    width: '30%',
    height: 45,
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: '#F0D74D',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,

    // Ombre sur iOS
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,

    // Ombre sur Android
    elevation: 5,
  },
  buttonFilterText: {
    fontFamily: 'LilitaOne-Regular',
    fontSize: 16,
  },
  inputContainer: {
    width: '70%', // Largeur fixe pour correspondre à la searchBar
    height: 45,
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: '#ffff',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderLeftWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    position: 'relative',

    // Ombre sur iOS
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,

    // Ombre sur Android
    elevation: 5,
  },
  searchBar: {
    flex: 1, // Prend toute la largeur disponible
    height: '100%',
    fontFamily: 'Ropa-Sans',
    textAlign: 'left',
    paddingHorizontal: 20,
    fontSize: 14,
  },
  icon: {
    position: 'absolute', // Positionne l'icône absolument dans le conteneur
    right: 10, // Place l'icône à droite
  },
});
