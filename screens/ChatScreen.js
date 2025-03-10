import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import HeaderNavigation from './components/HeaderNavigation';
import { FontAwesome } from '@expo/vector-icons';

const API_URL = 'https://ton-backend.com/api/messages'; // 🔹 Remplace par ton URL backend

export default function ChatScreen({ route, navigation }) {
  const { conversation } = route.params;

  // 🔹 MESSAGES FICTIFS PAR DÉFAUT
  const [messages, setMessages] = useState([
    { id: '1', sender: 'vendeur', content: 'Bonjour, avez-vous des questions ?', date: new Date().toISOString() },
    { id: '2', sender: 'acheteur', content: 'Oui, quelles sont les conditions de paiement ?', date: new Date().toISOString() },
    { id: '3', sender: 'vendeur', content: 'Paiement en plusieurs fois est possible.', date: new Date().toISOString() },
    { id: '4', sender: 'acheteur', content: 'Super, je vais réfléchir.', date: new Date().toISOString() },
  ]);

  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false); // État du rafraîchissement

  // 🔹 1. Fonction pour récupérer les messages depuis l'API
  const fetchMessages = async () => {
    try {
      const response = await fetch(`${API_URL}?buyer=${conversation.buyer}&seller=${conversation.seller}`);
      const data = await response.json();

      if (data.messages.length > 0) {
        setMessages(data.messages.reverse()); // Remplace les messages fictifs SEULEMENT si des messages existent
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des messages:', error);
    }
  };

  // 🔹 2. Charger les messages au montage du composant
  useEffect(() => {
    fetchMessages();
  }, []);

  // 🔹 3. Fonction pour envoyer un message
  const sendMessage = async () => {
    if (inputText.trim() !== '') {
      const newMessage = {
        buyer: conversation.buyer,
        seller: conversation.seller,
        content: inputText,
        date: new Date().toISOString(),
      };

      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newMessage),
        });

        const savedMessage = await response.json();
        setMessages([savedMessage, ...messages]); // Ajoute au chat en direct
        setInputText('');
      } catch (error) {
        console.error('Erreur lors de l’envoi du message:', error);

        // 🔹 En cas d’échec, ajouter temporairement le message pour tests
        setMessages([{ ...newMessage, id: String(messages.length + 1) }, ...messages]);
        setInputText('');
      }
    }

   
    };

    // 🔹 Fonction pour charger les messages supplémentaires lors du scroll bas
    const loadMoreMessages = async () => {
        if (loading) return; // Empêche les appels multiples
        fetchMessages(); // Rafraîchit les messages
    };

    const renderItem = ({ item }) => (
        <View style={[styles.messageContainer, item.sender === 'vendeur' ? styles.sellerMessage : styles.buyerMessage]}>
        <Text style={styles.messageText}>{item.content}</Text>
        <Text style={styles.timestamp}>{new Date(item.date).toLocaleTimeString().slice(0, 5)}</Text>
        </View>
    );

  return (
    <View style={styles.container}>
        {/* 🔹 HEADER */}
        <LinearGradient colors={['rgba(34,193,195,1)', 'rgba(253,187,45,1)']} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }} style={styles.header}>
            <HeaderNavigation onPress={() => navigation.goBack()} />
        </LinearGradient>

        {/* 🔹 LISTE DES MESSAGES */}
        <FlatList 
            data={messages} 
            renderItem={renderItem} 
            keyExtractor={(item) => item.id}
            onEndReached={loadMoreMessages} 
            onEndReachedThreshold={0.2} 
            inverted
            ListFooterComponent={loading ? <ActivityIndicator size="small" color="#007aff" /> : null}
        />

        {/* 🔹 INPUT POUR ENVOYER UN MESSAGE */}
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Écrire un message..." value={inputText} onChangeText={setInputText} />
            <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                <FontAwesome name="paper-plane" size={22} color="white" />
            </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#f5f5f5'
    },
    header: { 
        padding: 20, 
        borderBottomColor: '#000',
        borderBottomWidth: 1, 
        paddingBottom: 20,
        elevation: 5 
    },
    messageContainer: { 
        padding: 10,
        marginVertical: 5, 
        borderRadius: 10,
        maxWidth: '80%',
        marginHorizontal: 20,
    },
    sellerMessage: { 
        alignSelf: 'flex-start',
        backgroundColor: '#bbb', 
    },
    buyerMessage: { 
        alignSelf: 'flex-end',
        backgroundColor: '#00CC99'
    },
    messageText: { 
        fontSize: 16,
        color: 'white' 
    },
    timestamp: { 
        fontSize: 12,
        color: '#ddd', 
        marginTop: 5,
        textAlign: 'right' 
    },
    inputContainer: { 
        flexDirection: 'row',
        alignItems: 'center', 
        backgroundColor: 'white', 
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        paddingBottom: 45,
    },
    input: { 
        flex: 1,
        height: 40, 
        borderWidth: 1, 
        borderColor: '#ddd', 
        borderRadius: 20, 
        paddingHorizontal: 10, 
        fontSize: 16 
    },
    sendButton: { 
        marginLeft: 10, 
        backgroundColor: '#00CC99',
        padding: 10, 
        borderRadius: 20 
    },
});




