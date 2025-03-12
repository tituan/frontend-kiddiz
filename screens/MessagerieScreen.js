import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import HeaderNavigation from './components/HeaderNavigation';
import { LinearGradient } from 'expo-linear-gradient';
import { useIsFocused } from '@react-navigation/native';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function MessagerieScreen({ navigation }) {
    const isFocused = useIsFocused()
    const userToken = useSelector(state => state.user.value.token);
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConversations = async () => {
            if (!userToken) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${API_URL}chatroom/list/${userToken}`);
                const data = await response.json();
                
                if (!data.formattedConversations) {
                    setLoading(false);
                    return;
                }

                setConversations(data.formattedConversations);
            } catch (error) {
                console.error("Erreur lors de la récupération des conversations :", error);
            } finally {
                setLoading(false);
            }
        };

        isFocused && fetchConversations();
    }, [userToken, isFocused]);

    const goToChatScreen = (conversation) => {
        navigation.navigate('ChatScreen', {
            userToken,
            conversationId: conversation._id,
        });
    };

    const renderItem = ({ item }) => {
        
        return (
            <TouchableOpacity style={styles.itemContainer} onPress={() => goToChatScreen(item)}>
                <Image source={{ uri: item.lastMessage.articleUri }} style={styles.avatar} />
                <View style={styles.messageInfo}>
                    <Text style={styles.name}>{item.otherPerson}</Text>
                    <Text style={styles.lastMessage} numberOfLines={1}>
                        {item.lastMessage.content}
                    </Text>
                    <Text style={styles.dateMessage}>
                        {item.lastMessage.date ? `Dernier message : ${new Date(item.lastMessage.date).toLocaleString()}` : "Aucune activité"}
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
                <ActivityIndicator size="large" color="#00CC99" />
            ) : conversations.length === 0 ? (
                <Text style={styles.noMessages}>Aucune conversation disponible.</Text>
            ) : (
                <FlatList
                    data={conversations}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item?._id?.toString() || `conversation-${index}`}
                />
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
        fontSize: 25,
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
        borderColor: 'black',
        borderWidth: 1,
    },
    messageInfo: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    lastMessage: {
        fontSize: 14,
        color: '#555',
        marginTop: 3,
    },
    dateMessage: {
        fontSize: 12,
        marginTop: 5,
    },
});

