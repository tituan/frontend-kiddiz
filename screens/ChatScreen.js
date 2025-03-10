import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import HeaderNavigation from './components/HeaderNavigation';
import { FontAwesome } from '@expo/vector-icons';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function ChatScreen({ route, navigation }) {
    // 🔥 Récupération des paramètres envoyés depuis `SellerScreen`
    const { userToken, sellerToken, article } = route.params;

    console.log("🔹 Paramètres reçus dans ChatScreen :", { userToken, sellerToken, article });

    // 🔹 MESSAGES FICTIFS PAR DÉFAUT (avant chargement des vrais messages)
    const [messages, setMessages] = useState([
        // { id: '1', sender: sellerToken, content: 'Bonjour, avez-vous des questions ?', date: new Date().toISOString() },
        // { id: '2', sender: userToken, content: 'Oui, quelles sont les conditions de paiement ?', date: new Date().toISOString() },
        // { id: '3', sender: sellerToken, content: 'Paiement en plusieurs fois est possible.', date: new Date().toISOString() },
        // { id: '4', sender: userToken, content: 'Super, je vais réfléchir.', date: new Date().toISOString() },
    ]);
    // console.log(messages)

    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(true);

    // 🔹 1. Fonction pour récupérer les messages depuis l'API
    const fetchMessages = async () => {
        try {
            console.log("🔍 API_URL :", API_URL, " | Article ID :", article.id); // 🔥 Debug URL
    
            const response = await fetch(`${API_URL}chatroom/get/${article.id}`);
    
            // 🔥 Vérification du format de la réponse avant `json()`
            const contentType = response.headers.get("content-type");
            if (!response.ok) {
                const errorMessage = await response.text();
                console.error(`❌ Erreur API (${response.status}):`, errorMessage);
                return;
            }
            if (!contentType || !contentType.includes("application/json")) {
                console.error("❌ La réponse n'est pas un JSON valide !");
                return;
            }
    
            const data = await response.json();
            console.log("📩 Messages reçus de l'API :", data);
    
            if (data.length > 0) {
                setMessages(data.reverse()); // 🔥 Affichage du plus récent au plus ancien
            }
        } catch (error) {
            console.error("❌ Erreur lors de la récupération des messages :", error);
        } finally {
            setLoading(false);
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
                conversationId: article.id, // 🔥 Utilise `article.id` comme identifiant de conversation
                sender: userToken,
                receiver: sellerToken,
                content: inputText,
                date: new Date(),
            };

            try {
                const response = await fetch(`${API_URL}chatroom/new`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newMessage),
                });

                const savedMessage = await response.json();
                setMessages([savedMessage, ...messages]); // 🔥 Ajoute au chat en direct
                setInputText('');
            } catch (error) {
                console.error("❌ Erreur lors de l’envoi du message :", error);
            }
        }
    };

    // 🔹 Fonction pour charger plus de messages lors du scroll bas
    const loadMoreMessages = async () => {
        if (!loading) {
            fetchMessages();
        }
    };

    const renderItem = ({ item }) => (
        
        <View style={[styles.messageContainer, item.sender === userToken ? styles.buyerMessage : styles.sellerMessage]}>
            <Text style={styles.messageText}>{item.content}</Text>
            <Text style={styles.timestamp}>
                {new Date(item.timestamp).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "long"
                })} - {new Date(item.timestamp).toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit"
                })}
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
            ) : (
                <FlatList
                    data={messages}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    onEndReached={loadMoreMessages}
                    onEndReachedThreshold={0.2}
                    inverted
                    ListFooterComponent={loading ? <ActivityIndicator size="small" color="#007aff" /> : null}
                />
            )}

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
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    header: { padding: 20, borderBottomColor: '#000', borderBottomWidth: 1, paddingBottom: 20, elevation: 5 },
    loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    messageContainer: { padding: 10, marginVertical: 5, borderRadius: 10, maxWidth: '80%', marginHorizontal: 20 },
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




