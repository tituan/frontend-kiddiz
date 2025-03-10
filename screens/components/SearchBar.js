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

  // Animation d'échelle et de couleur
  const [scale] = useState(new Animated.Value(1));
  const [backgroundColor, setBackgroundColor] = useState('#fff');  // Couleur de fond par défaut

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
    // Ajouter une animation lors de la sélection
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.95, // Réduit légèrement la taille
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1, // Retourne à la taille normale
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    setBackgroundColor('#F0D74D');  // Change la couleur de fond au clic
  };

  const resetFilters = () => {
    setFilters({
      age: null,
      category: null,
    });
    setBackgroundColor('#fff');  // Restaure la couleur de fond par défaut
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

              {/* Bouton pour réinitialiser les filtres */}
              <TouchableOpacity style={styles.filterOption} onPress={resetFilters}>
                <Text style={styles.filterText}>Réinitialiser tous les filtres</Text>
              </TouchableOpacity>

              {/* Filtres d'âge */}
              {['0 - 3 ans', '4 - 6 ans', '6 - 10 ans', '10 - 14 ans'].map((ageRange) => (
                <Animated.View 
                  key={ageRange} 
                  style={[styles.filterOption, { transform: [{ scale }] }]}
                >
                  <TouchableOpacity 
                    style={[styles.filterOption, { backgroundColor: filters.age === ageRange ? backgroundColor : '#fff' }]} 
                    onPress={() => handleFilterSelection('age', ageRange)}
                  >
                    <Text style={styles.filterText}>{ageRange}</Text>
                  </TouchableOpacity>
                </Animated.View>
              ))}

              {/* Filtres de catégorie */}
              {['Puériculture', 'Jouets', 'Loisirs'].map((category) => (
                <Animated.View 
                  key={category} 
                  style={[styles.filterOption, { transform: [{ scale }] }]}
                >
                  <TouchableOpacity 
                    style={[styles.filterOption, { backgroundColor: filters.category === category ? backgroundColor : '#fff' }]} 
                    onPress={() => handleFilterSelection('category', category)}
                  >
                    <Text style={styles.filterText}>{category}</Text>
                  </TouchableOpacity>
                </Animated.View>
              ))}

              {/* Bouton pour fermer le modal */}
              <TouchableOpacity style={styles.closeButton} onPress={closeFilterModal}>
                <Text style={styles.closeButtonText}>Fermer</Text>
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
    // backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    borderWidth: 2,
    borderColor: "#000000",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'LilitaOne-Regular',
  },
  filterOption: {
    paddingVertical: 8,
    
  },
  filterText: {
    fontSize: 20,
    fontFamily: 'RopaSans-Regular',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#4478A9',
    paddingVertical: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  },
});