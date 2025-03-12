import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import HeaderNavigation from './components/HeaderNavigation';
import { FontAwesome } from '@expo/vector-icons';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function ChatScreen({ route, navigation }) {
    const { userToken, conversationId } = route.params;
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false); 

    // Fonction pour récupérer les messages
    const fetchMessages = async () => {
        try {
            const response = await fetch(`${API_URL}chatroom/messages/${userToken}/${conversationId}`);
            const data = await response.json();

            setMessages(data.messages); // 🔥 Affichage du plus récent au plus ancien
        } catch (error) {
            console.error("❌ Erreur lors de la récupération des messages :", error);
        } finally {
            setLoading(false);
        }
    };

    // Rafraîchissement au scroll (pull-to-refresh)
    const onRefresh = async () => {
        setRefreshing(true);
        await fetchMessages(); // 🔄 Recharge les messages
        setRefreshing(false);
    };

    //  Chargement des messages au montage
    useEffect(() => {
        fetchMessages();
    }, []);

    // Fonction pour envoyer un message
    const sendMessage = async () => {
        if (inputText.trim() === '') return;
        console.log(inputText)
        console.log(userToken)
        
        const newMessage = {
            conversationId,
            sender: userToken,
            // receiver: sellerToken,
            content: inputText,
            // date: new Date().toISOString(),
        };

        try {
            const response = await fetch(`${API_URL}chatroom/new`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMessage),
            });

            if (!response.ok) {
                console.error("❌ Erreur lors de l’envoi du message :", await response.text());
                return;
            }

            const savedMessage = await response.json();
            setMessages(prevMessages => [savedMessage, ...prevMessages]);
            setInputText('');
        } catch (error) {
            console.error("❌ Erreur lors de l’envoi du message :", error);
        }
    };

    // 🔹 Fonction pour charger plus de messages
    const loadMoreMessages = async () => {
        if (!loading) fetchMessages();
    };

    // 🔹 Rendu des messages
    const renderItem = ({ item }) => (
       <View style={[styles.messageContainer, item.isOwnMessage ? styles.buyerMessage : styles.sellerMessage]}>
            <Text style={styles.messageText}>{item.content}</Text>
            <Text style={styles.timestamp}>
                {new Date(item.date).toLocaleDateString("fr-FR", { day: "2-digit", month: "long" })} - 
                {new Date(item.date).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* 🔹 HEADER */}
            <LinearGradient colors={['rgba(34,193,195,1)', 'rgba(253,187,45,1)']} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }} style={styles.header}>
                <HeaderNavigation onPress={() => navigation.goBack()} />
            </LinearGradient>

            {/* 🔹 LISTE DES MESSAGES */}
            {loading ? (
                <ActivityIndicator size="large" color="#007aff" style={styles.loader} />
            ) : messages.length === 0 ? (
                <Text style={styles.noMessages}>Aucun message.</Text>
            ) : (
                <FlatList
                    data={messages}
                    renderItem={renderItem}
                    keyExtractor={(_, index) => `${conversationId}-${index}`}
                    onEndReached={loadMoreMessages}
                    onEndReachedThreshold={0.2}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    inverted
                    ListFooterComponent={loading ? <ActivityIndicator size="small" color="#007aff" /> : null}
                />
            )}

            {/* 🔹 INPUT POUR ENVOYER UN MESSAGE */}
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.inputContainer}>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Écrire un message..." 
                        value={inputText} 
                        onChangeText={setInputText} 
                    />
                    <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                        <FontAwesome name="paper-plane" size={22} color="white" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    header: { padding: 20, borderBottomColor: '#000', borderBottomWidth: 1, paddingBottom: 20, elevation: 5 },
    noMessages: {
        flex: 1, backgroundColor: '#f5f5f5',
        padding: 20,
        textAlign: 'center',
        fontSize: 20,
    },
    loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    messageContainer: { padding: 10, marginVertical: 5, borderRadius: 10, maxWidth: '80%', marginHorizontal: 20},
    sellerMessage: { alignSelf: 'flex-start', backgroundColor: '#bbb' },
    buyerMessage: { alignSelf: 'flex-end', backgroundColor: '#00CC99' },
    messageText: { fontSize: 16, color: 'white' },
    timestamp: { fontSize: 12, color: '#ddd', marginTop: 5, textAlign: 'right' },
    inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 10, borderTopWidth: 1, borderTopColor: '#ddd',   paddingBottom: 40, },
    input: { flex: 1, height: 40, borderWidth: 1, borderColor: '#ddd', borderRadius: 20, paddingHorizontal: 10, fontSize: 16,  },
    sendButton: { 
        marginLeft: 10, 
        backgroundColor: '#00CC99', 
        padding: 10, 
        borderRadius: 20, 
      
    },
});




