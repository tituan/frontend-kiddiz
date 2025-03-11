import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import HeaderNavigation from './components/HeaderNavigation';
import { LinearGradient } from 'expo-linear-gradient';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function MessagerieScreen({ navigation }) {
    const userToken = useSelector(state => state.user.value.token);
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConversations = async () => {
            if (!userToken) {
                console.error("❌ Aucun token utilisateur trouvé !");
                setLoading(false);
                return;
            }

            try {
                console.log(`🚀 Récupération des conversations pour userToken : ${userToken}`);

                // 🔹 1. Récupérer les conversations
                const response = await fetch(`${API_URL}chatroom/get/conversations/${userToken}`);
                const data = await response.json();

                if (!response.ok) {
                    console.error(`❌ Erreur API (${response.status}):`, data.message);
                    return;
                }

                console.log("📩 Conversations reçues :", data);

                // 🔹 2. Enrichir chaque conversation avec les détails de l'article et du participant
                const enrichedConversations = await Promise.all(
                    data.map(async (conversation) => {
                        let articleData = {};
                        let userData = {};

                        // 🔹 Récupérer les infos de l'article
                        try {
                            const articleResponse = await fetch(`${API_URL}articles/get-by/id/${conversation.articleId}`);
                            const articleJson = await articleResponse.json();
                            articleData = articleJson.result ? articleJson.article : {};
                        } catch (error) {
                            console.error(`❌ Erreur lors de la récupération de l'article (${conversation.articleId}) :`, error);
                        }

                        // 🔹 Récupérer le participant avec qui je discute (toujours `participants[0]`)
                        const otherParticipantToken = conversation.participants[0];

                        // 🔹 Récupérer les infos du participant
                        try {
                            const userResponse = await fetch(`${API_URL}users/get-by-token/${otherParticipantToken}`);
                            const userJson = await userResponse.json();
                            console.log("🔍 Réponse utilisateur :", userJson);

                            userData = userJson;
                        } catch (error) {
                            console.error(`❌ Erreur lors de la récupération du participant (${otherParticipantToken}) :`, error);
                        }

                        return {
                            ...conversation,
                            article: articleData, // Ajout des infos de l'article
                            otherParticipantName: userData.firstname || "Utilisateur inconnu",
                            articleImage: articleData.pictures?.[0] || "https://via.placeholder.com/50",
                            otherParticipantToken, // 🔥 On stocke son token pour ChatScreen
                        };
                    })
                );

                setConversations(enrichedConversations);
            } catch (error) {
                console.error("❌ Erreur lors de la récupération des conversations :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchConversations();
    }, [userToken]);

    const goToChatScreen = (conversation) => {
        navigation.navigate('ChatScreen', {
            userToken,
            sellerToken: conversation.otherParticipantToken, // 🔥 On passe bien le participant principal
            conversationId: conversation._id,
            article: conversation.article,
        });
    };

    const renderItem = ({ item }) => {
        console.log(item)
        return (
            <TouchableOpacity style={styles.itemContainer} onPress={() => goToChatScreen(item)}>
                <Image source={{ uri: item.articleImage }} style={styles.avatar} />
                <View style={styles.messageInfo}>
                    <Text style={styles.name}>{item.otherParticipantName || "Utilisateur inconnu"}</Text>
                    <Text style={styles.lastMessage} numberOfLines={1}>
                        {item.lastMessage || "Aucun message"}
                    </Text>
                    <Text style={styles.dateMessage}>
                        {item.lastMessageDate ? `Dernier message : ${new Date(item.lastMessageDate).toLocaleString()}` : "Aucune activité"}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={['rgba(34,193,195,1)', 'rgba(253,187,45,1)']} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }} style={styles.header}>
                <HeaderNavigation onPress={() => navigation.navigate('Connection')} />
            </LinearGradient>

            <Text style={styles.titleMessagerie}>Vos messages :</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#007aff" />
            ) : conversations.length === 0 ? (
                <Text style={styles.noMessages}>Aucune conversation disponible.</Text>
            ) : (
                <FlatList data={conversations} renderItem={renderItem} keyExtractor={(item) => item._id} />
            )}
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
    noMessages: {
        textAlign: 'center',
        fontSize: 18,
        color: '#555',
        marginTop: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 10,
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        borderColor: 'black',
        borderWidth: 1,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    messageInfo: {
        flex: 1,
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

