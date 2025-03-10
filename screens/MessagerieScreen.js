import { StyleSheet, View, ScrollView, FlatList, ActivityIndicator, Text, TouchableOpacity, } from 'react-native';
import HeaderNavigation from './components/HeaderNavigation'; 
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import {useState, useEffect} from 'react';


export default function MessagerieScreen({ navigation }) {
    const [conversations, setConversations] = useState([]);
    const navigations = useNavigation();

    useEffect(() => {
        // Récupérer les conversations de l'utilisateur
        const fetchConversations = async () => {
          try {
            const response = await fetch('http://localhost:4000/conversations?userId=userUid32'); // Remplacez 'userUid32' par l'UID32 de l'utilisateur actuel
            if (!response.ok) {
              throw new Error('Erreur lors de la récupération des conversations');
            }
            const data = await response.json();
            setConversations(data);
          } catch (error) {
            console.error('Erreur lors de la récupération des conversations:', error);
          }
        };
    
        fetchConversations();
      }, []);
    
      const handleConversationPress = (conversation) => {
        // Rediriger vers ChatScreen avec les informations de la conversation
        navigations.navigate('ChatScreen', {
          sellerId: conversation.participants.find((id) => id !== 'userUid32'), // Trouver l'autre participant
          articleId: conversation.articleId,
        });
      };
    

    return (
    <View style={styles.container}>
        <LinearGradient
            colors={['rgba(34,193,195,1)', 'rgba(253,187,45,1)']} // Couleurs du dégradé
            start={{ x: 0, y: 1 }} // Point de départ du dégradé (0,1 = bas)
            end={{ x: 0, y: 0 }} // Point d'arrivée du dégradé (0,0 = haut)
            style={styles.header}
        >
            <HeaderNavigation onPress={() => navigation.navigate("Connection")}/>  
        </LinearGradient> 
        <Text>Messagerie List</Text>
        <FlatList
        data={conversations}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.conversationItem}
            onPress={() => handleConversationPress(item)}
          >
            <Text style={styles.conversationTitle}>Conversation #{item._id}</Text>
            <Text style={styles.conversationInfo}>Article: {item.articleId}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fffff',
    },
    header: {
        padding: 20,
        borderBottomColor: '#00000',
        borderBottomWidth: 1,
        paddingBottom: 20,
        shadowColor: "#000", // Couleur de l'ombre
        shadowOffset: { width: 0, height: 3 }, // Décalage vertical de l'ombre
        shadowOpacity: 0.9, // Opacité de l'ombre
        shadowRadius: 4, // Flou de l'ombre
        elevation: 5, // Ajoute l'ombre sur Android
    
    },
    conversationItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      conversationTitle: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      conversationInfo: {
        fontSize: 14,
        color: '#666',
      },
})