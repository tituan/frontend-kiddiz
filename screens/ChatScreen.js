// screens/ChatScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native'; // Pour récupérer les paramètres
import socket from '../services/socket'; // Importer le service Socket.IO

const ChatScreen = () => {
  const route = useRoute();
  const { receiverId, articleId, senderId } = route.params; // Récupérer les paramètres
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);

  useEffect(() => {
    socket.on('connect', () => {
        console.log('Connecté au serveur Socket.IO');
      });
    // Démarrer une nouvelle conversation avec l'utilisateur lié à l'article
    socket.emit('start_conversation', { receiverId, articleId, senderId });

    // Écouter l'ID de la conversation renvoyé par le serveur
  socket.on('conversation_started', (data) => {
    console.log('Conversation démarrée avec ID:', data.conversationId);
    setConversationId(data.conversationId);
  });

    // Écouter les messages reçus du serveur
  socket.on('receive_message', (data) => {
    console.log('Message reçu:', data);
    setMessages((prevMessages) => [...prevMessages, data]);
  });

    // Nettoyer l'écouteur lors du démontage du composant
    return () => {
        socket.off('conversation_started');
        socket.off('receive_message');
    };
  }, [receiverId, articleId, senderId]);

  const sendMessage = () => {
    if (message.trim()) {
      // Envoyer le message au serveur
      socket.emit('send_message', {
        conversationId, // Utiliser l'ID de la conversation        
        sender: senderId, // ID de l'utilisateur connecté
      receiver: receiverId, // ID de l'utilisateur lié à l'article
      content: message, // Contenu du message
      });
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{item.content}</Text>
            <Text style={styles.messageInfo}>
              De {item.sender} à {item.receiver}
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Tapez votre message..."
      />
      <Button title="Envoyer" onPress={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  messageContainer: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    marginBottom: 10,
    borderRadius: 5,
  },
  messageText: {
    fontSize: 16,
  },
  messageInfo: {
    fontSize: 12,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});

export default ChatScreen;