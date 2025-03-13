import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, StyleSheet, TextInput, View, Modal, TouchableWithoutFeedback, Keyboard, Animated } from "react-native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useRoute } from '@react-navigation/native';

function SearchBar({ onSearch }) {
  const route = useRoute(); 

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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filters, setFilters] = useState({
    age: null,
    category: null,
  });

  const [scale] = useState(new Animated.Value(1));
  const [backgroundColor, setBackgroundColor] = useState('#fff');  

  const handleSearch = () => {
    if (searchTerm.trim()) { 
      onSearch(searchTerm); 
    }
  };

  const openFilterModal = () => {
    setIsModalVisible(true); 
  };

  const closeFilterModal = () => {
    setIsModalVisible(false); 
  };

  const handleFilterSelection = (filterCategory, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterCategory]: value,
    }));
    
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.95, 
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1, 
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    setBackgroundColor('#EDDC5F');  
  };

  const resetFilters = () => {
    setFilters({
      age: null,
      category: null,
    });
    setBackgroundColor('#fff');  
  };

  return route.name === 'Home' ? (
    <View style={styles.searchContainer}>
      <TouchableOpacity
        style={styles.buttonFilter} 
        activeOpacity={0.7}
        onPress={openFilterModal} 
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
          onChangeText={setSearchTerm} 
          value={searchTerm} 
        />
        {isFocused && <FontAwesome name="search" size={20} color="black" style={styles.icon} onPress={handleSearch}/>}
      </View>

      {/* Modal pour les filtres */}
      <Modal
        visible={isModalVisible}
        animationType="none"
        transparent={true}
        onRequestClose={closeFilterModal} 
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Sélectionner les filtres</Text>

              {/* Filtres d'âge */}
              {['0 - 1 ans', '1 - 3 ans', '4 - 6 ans', '6 - 12 ans'].map((ageRange) => (
                <Animated.View 
                  key={ageRange} 
                  style={[styles.filterOption, { transform: [{ scale }] }]}
                >
                  
                  <TouchableOpacity 
                    style={[styles.filterOption, { backgroundColor: filters.age === ageRange ? backgroundColor : '#fff', borderRadius: 5 }]} 
                    onPress={() => handleFilterSelection('age', ageRange)}
                  >
                    
                    <Text style={styles.filterText}>{ageRange}</Text>
                  </TouchableOpacity>
                </Animated.View>
              ))}
                                          <View style={styles.separation}> </View>
              {/* Filtres de catégorie */}
              {['Puériculture', 'Jouets', 'Loisirs'].map((category) => (
                <Animated.View 
                  key={category} 
                  style={[styles.filterOption, { transform: [{ scale }] }]}
                >
                  <TouchableOpacity 
                    style={[styles.filterOption, { backgroundColor: filters.category === category ? backgroundColor : '#fff', borderRadius: 5 }]} 
                    onPress={() => handleFilterSelection('category', category)}
                  >
                    <Text style={styles.filterText}>{category}</Text>
                  </TouchableOpacity>
                </Animated.View>
              ))}

              {/* Bouton pour lancer la recherche */}
              <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                <Text style={styles.searchButtonText}>Lancer la recherche</Text>
              </TouchableOpacity>

              {/* Petit bouton rond avec croix pour fermer la modal */}
              <TouchableOpacity style={styles.closeButton} onPress={closeFilterModal}>
                <FontAwesome name="times" size={24} color="black" />
              </TouchableOpacity>

              {/* Bouton pour réinitialiser les filtres */}
              <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
                <Text style={styles.resetButtonText}>Réinitialiser</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
    marginTop: 10,
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
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonFilterText: {
    fontFamily: 'LilitaOne-Regular',
    fontSize: 16,
  },
  inputContainer: {
    width: '70%',
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
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  searchBar: {
    flex: 1,
    height: '100%',
    fontFamily: 'Ropa-Sans',
    textAlign: 'left',
    paddingHorizontal: 20,
    fontSize: 14,
  },
  icon: {
    position: 'absolute',
    right: 10,
  },
  modalOverlay: {
    flex: 1,
    top: '19%',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    borderWidth: 2,
    borderColor: "#000000",
    position: 'relative',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'LilitaOne-Regular',
  },

  separation: {
    borderWidth: 1,
    borderColor: "#000000",
    width: '75%',
    marginLeft: 40,
    marginTop:10,
    marginBottom:10,
  },
  filterOption: {
    paddingVertical: 5,
  },
  filterText: {
    fontSize: 22,
    fontFamily: 'RopaSans-Regular',
    marginLeft: 10
  },
  searchButton: {
    marginTop: 20,
    backgroundColor: '#4478A9',
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#00000",
  },
  searchButtonText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'LilitaOne-Regular',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 10,
    
  },
  resetButton: {
    marginTop: 10,
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#00000",
    
    
  },
  resetButtonText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'LilitaOne-Regular',
  },
});