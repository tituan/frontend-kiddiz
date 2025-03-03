import React from "react";
import { TouchableOpacity, Text, StyleSheet, TextInput, View } from "react-native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';

function SearchBar() {
  const [loaded, error] = useFonts({
      'LilitaOne-Regular': require('../../assets/fonts/LilitaOne-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
        SplashScreen.hideAsync();
        }
    }, [loaded, error]);

if (!loaded && !error) {
    return null;
} 

return (
    <View style={styles.searchContainer}>
        <TouchableOpacity
            style={styles.buttonFilter} 
            activeOpacity={0.7}
        >
            <Text style={styles.buttonFilterText}>Filtres :</Text>
        </TouchableOpacity>
        <TextInput style={styles.searchBar} placeholderTextColor="#888" placeholder="Rechercher..."></TextInput>
    </View>
  );
}
export default SearchBar;

const styles = StyleSheet.create({
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 25,
  },
  buttonFilter: {
    width: '30%',
    height: 60,
    borderWidth: 2,
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
    fontSize: 18,
  },
  searchBar: {
    width: '70%',
    height: 60,
    borderWidth: 2,
    borderColor: "#000000",
    backgroundColor: '#ffff',
    fontFamily: 'LilitaOne-Regular',
    textAlign: 'right',
    paddingHorizontal: 30,
    fontSize: 18,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderLeftWidth: 0,

     // Ombre sur iOS
     shadowColor: "#000",
     shadowOffset: { width: 4, height: 4 }, 
     shadowOpacity: 0.4,
     shadowRadius: 4,
 
     // Ombre sur Android
     elevation: 5, 
  },
});
