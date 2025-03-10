import React, { useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import HeaderNavigation from './components/HeaderNavigation';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Exemple de données avec les noms des interlocuteurs, leurs messages et une image du jouet
const DATA = [
  {
    id: '1',
    name: 'Antoine Dupont',
    lastMessage: 'Bonjour, avez-vous reçu mon offre ?',
    toyImage: 'https://res.cloudinary.com/dnia3v9fn/image/upload/v1741357972/jjyghdtd87mkkwuljk0k.jpg', // URL temporaire pour l'image du jouet
    date: '10/03/2024 à 12h00',
  },
  {
    id: '2',
    name: 'Sophie Lambert',
    lastMessage: 'Merci pour votre retour ! À bientôt.',
    toyImage: 'https://res.cloudinary.com/dnia3v9fn/image/upload/v1741357972/jjyghdtd87mkkwuljk0k.jpg',
    date: '10/03/2024 à 12h00',
  },
  {
    id: '3',
    name: 'Julien Martin',
    lastMessage: 'Je vous envoie les documents rapidement.',
    toyImage: 'https://res.cloudinary.com/dnia3v9fn/image/upload/v1741357972/jjyghdtd87mkkwuljk0k.jpg',
    date: '10/03/2024 à 12h00',
  },
];

export default function MessagerieScreen({ navigation }) {

    const [fontsLoaded] = useFonts({
        'LilitaOne-Regular': require('../assets/fonts/LilitaOne-Regular.ttf'),
        'RopaSans-Regular': require('../assets/fonts/RopaSans-Regular.ttf'),
    });

// Masquer l'écran de chargement jusqu'à ce que la police soit prête
    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    // Afficher un écran de chargement si les polices ne sont pas encore prêtes
    if (!fontsLoaded) {
        return null;
    }

    const goToChatScreen = (conversation) => {
        navigation.navigate('ChatScreen', { conversation });
      };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => goToChatScreen(item)}>
      <Image source={{ uri: item.toyImage }} style={styles.avatar} />
      <View style={styles.messageInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
        <Text style={styles.dateMessage}>
          Date: {item.date}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(34,193,195,1)', 'rgba(253,187,45,1)']}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.header}
      >
        <HeaderNavigation onPress={() => navigation.navigate('Connection')} />
      </LinearGradient>
        <Text style={styles.titleMessagerie}>Vos messages :</Text>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 20,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 5,
  },
  titleMessagerie: {
    padding: 20,
    fontSize: 20,
    fontFamily: 'LilitaOne-Regular',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderColor: 'black',
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  messageInfo: {
    flex: 1,
    marginBottom: 2,
    
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'RopeSans-Regular',
  },
  lastMessage: {
    fontSize: 14,
    color: '#555',
    marginTop: 3,
    fontFamily: 'RopeSans-Regular',
  },
  dateMessage: {
    fontSize: 12,
    marginTop: 5,
    fontFamily: 'RopeSans-Regular',
  },
});
