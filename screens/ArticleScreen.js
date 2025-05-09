import { StyleSheet, View, ScrollView, Text, Image, Alert } from 'react-native';
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import HeaderNavigation from './components/HeaderNavigation';
import { LinearGradient } from 'expo-linear-gradient'
import ButtonBig from './components/ButtonBig';
import { FontAwesome } from '@expo/vector-icons';
import ButtonProfil from './components/ButtonProfil';

const API_URL = process.env.EXPO_PUBLIC_API_URL; 


export default function ArticleScreen({ navigation, route }) {
    const userToken = useSelector(state => state.user.value.token);
    const { article } = route.params;
    console.log(article)
    const sellerArticleToken = article.user.token

    
    const handleInvoice = () => {
        if(userToken === sellerArticleToken){
            Alert.alert('Error', 'Vous ne pouvez pas acheter votre propre article');}
            else{
            navigation.navigate('InvoiceScreen', { article });
            console.log('Article à acheter');}
        };
    
    const contactSeller = async () => {
        try {
            console.log("Vérification de la conversation");
    
            const articleId = article.id;

            const token = userToken;
    
            if (!token || !articleId) {
                console.error("Paramètres manquants pour contacter le vendeur !");
                return;
            }
              
            const response = await fetch(`${API_URL}chatroom/${token}/${articleId}`);
            let conversation = await response.json();

            if (conversation && conversation._id) {
                console.log('Conversation trouvée, récupération des messages...');
            
                try {
                    const messagesResponse = await fetch(`${API_URL}chatroom/messages/${token}/${conversation._id}`);
                    
                    if (!messagesResponse.ok) {
                        console.error('Erreur lors de la récupération des messages :', messagesResponse.status);
                        return;
                    }
            
                    const existantConversation = await messagesResponse.json();
                    console.log('Messages de la conversation:', existantConversation);
            
                    
                    navigation.navigate("ChatScreen", {
                        userToken: token,
                        conversationId: conversation._id,
                        article: article,
                        messages: existantConversation.messages, 
                    });
                    return;
            
                } catch (error) {
                    console.error("Erreur lors de la récupération des messages :", error);
                }
            
            } else {
                console.log("Aucune conversation existante, rien à faire.");
            }
    

            const createResponse = await fetch(`${API_URL}chatroom/new/conversation/${articleId}/${token}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            conversation = await createResponse.json();
            console.log(conversation)
            if (!createResponse.ok) {
                console.error("Erreur lors de la création de la conversation :", conversation.message);
                return;
            }

    
            console.log("Conversation obtenue :", conversation);
    
            
            navigation.navigate("ChatScreen", {
                userToken: token,
                article: article,
                conversationId: conversation._id, 
            });
    
        } catch (error) {
            console.error("Erreur lors de la connexion au chat :", error);
        }
    };
    const urlBackend = process.env.EXPO_PUBLIC_API_URL;

    // fonction de suppression de l'article
    const handleDelete = async () => {
        try {
            const response = await fetch(`${urlBackend}articles/stock/${article.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: userToken }),
            });

            const data = await response.json();

            if (!data.result) {
                Alert.alert("Erreur", data.error || "Impossible de supprimer l'article.");
                return;
            }

            Alert.alert("Succès", "L'article a bien été supprimé !");
            navigation.goBack();

        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
            Alert.alert("Erreur", "Une erreur s'est produite.");
        }
    };

    // Modale de confirmation de suppression qui lancera handleDelete si l'utilisateur clique sur "oui"
    const confirmDelete = () => {
        Alert.alert(
            "Confirmation",
            "Êtes-vous sûr de vouloir supprimer votre article ?",
            [
                {
                    text: "Non",
                    style: "cancel", 
                },
                {
                    text: "Oui",
                    onPress: () => handleDelete(), 
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['rgba(34,193,195,1)', 'rgba(253,187,45,1)']} 
                start={{ x: 0, y: 1 }} 
                end={{ x: 0, y: 0 }} 
                style={styles.header}
            >
                <HeaderNavigation onPress={() => navigation.navigate("Connection")} />
            </LinearGradient>
            <ScrollView contentContainerStyle={styles.contentContainer}>

                <View style={styles.mainContainer}>

                    <View style={styles.titreContainer}>
                        <Text style={styles.titre}>{article.title}</Text>
                        <View style={styles.titreContainerLikes}>
                            <FontAwesome name="heart" size={20} color={"red"} style={styles.like}/>
                            <Text style={styles.likesCount}>{article.likesCount}</Text>
                        </View>
                    </View>

                    <View style={styles.photoContainer}>
                        <Image source={{ uri: article.pictures[0] }} style={styles.articleImage} />
                    </View>

                    <View style={styles.descriptionContainer}>
                        <View style={styles.boxTitle}>
                            <Text style={styles.titreDescription}>{article.title}</Text>
                            <Text style={styles.textPrice}>{article.price}€</Text>
                        </View>
                        <View style={styles.boxText}>
                            <Text style={styles.textType}>{article.itemType}</Text>
                            <Text style={styles.textType}>{article.category}</Text>
                            <Text style={styles.textType}>{article.condition}</Text>
                        </View>
                        <Text style={styles.textDescription}>Description : {article.productDescription}</Text>
                        {(userToken === null || sellerArticleToken === null || userToken !== sellerArticleToken) && article.availableStock > 0 && (
                            <View style={styles.buttonContainer}>
                                <ButtonBig
                                    style={styles.buttonAcheterArticle}
                                    text="Acheter l'article"
                                    onPress={() => {
                                        if (!userToken) {
                                            navigation.navigate("Connection");
                                        } else {
                                            handleInvoice();
                                        }
                                    }}
                                />
                                <ButtonBig 
                        style={styles.buttonAcheterArticle} 
                        text="Contacter le vendeur" 
                        onPress={() => {
                            if (!userToken) {
                                navigation.navigate("Connection");
                            } else {
                                contactSeller();
                            }
                        }}
                        
                        />
                    </View>
                        )}
                    </View>
                    {userToken && userToken === sellerArticleToken && article.availableStock > 0 && (
                        <View style={styles.containerBtnSeller}>
                            <ButtonBig style={styles.buttonModify} text="Modifier votre article" onPress={() => navigation.navigate("Modifier", { articleId: article.id })} />
                            <ButtonBig style={styles.buttonDelete} text="Supprimer votre article" onPress={confirmDelete} />
                        </View>
                    )}  
                    {(userToken === null || sellerArticleToken === null || userToken !== sellerArticleToken) && article.availableStock > 0 && (
                        <>
                            <Text>{article.firstname}</Text>
                            <View style={styles.buttonSeller}>
                                <ButtonProfil
                                    style={styles.buttonSeller}
                                    text="Voir le profil du vendeur"
                                    sellerFirstName={article.user.firstname}
                                    onPress={() => navigation.navigate("SellerScreen", { article: article.user })}
                                />
                            </View>
                            <Image style={styles.map} source={require('../assets/carte.jpg')} />
                            <View style={styles.buttonContainer2}>

                                <ButtonBig 
                                style={styles.buttonOffre} 
                                text="Faire une offre"
                                onPress={() => {
                                    if (!userToken) {
                                        navigation.navigate("Connection");
                                    } else {
                                        contactSeller();
                                    }
                                }} />

                            </View>
                        </>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffff',
        marginBottom: 20,
    },
    contentContainer: {
        flexGrow: 1,
    },
    header: {
        padding: 20,
        borderBottomColor: '#00000',
        borderBottomWidth: 1,
        paddingBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.9,
        shadowRadius: 4,
        elevation: 5,
        bottomTop: 50,
    },
    titreContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    titreContainerLikes: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    titre: {
        fontSize: 30,
        fontFamily: 'LilitaOne-Regular',
    },
    like: {
        fontSize: 20,
        fontFamily: 'RopaSans-Regular',
        marginRight: 10,
    },
    likesCount: {
        fontSize: 20,
        fontFamily: 'RopaSans-Regular',
    },
    photoContainer: {
        width: '100%',
        padding: 20,
        marginBottom: 30,
    },
    articleImage: {
        width: '100%',
        height: 250,
    },
    descriptionContainer: {
        paddingVertical: 25,
        paddingHorizontal: 20,
        backgroundColor: '#00CC99',
        width: '100%',
        marginBottom: 15,
    },
    boxTitle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    boxText: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    titreDescription: {
        fontFamily: 'LilitaOne-Regular',
        fontSize: 24,
        width: '80%',
    },
    textDescription: {
        fontFamily: 'RopaSans-Regular',
        fontSize: 20,
    },
    textCategorie: {
        fontFamily: 'RopaSans-Regular',
        fontSize: 20,
    },
    textType: {
        fontFamily: 'RopaSans-Regular',
        fontSize: 20,
        alignSelf: "flex-start",
        backgroundColor: 'white',
        paddingHorizontal: 10,
        borderRadius: 5,
        paddingVertical: 7,
        marginRight: 10,
    },
    textCondition: {
        fontFamily: 'RopaSans-Regular',
        fontSize: 20,
    },
    textPrice: {
        fontFamily: 'LilitaOne-Regular',
        fontSize: 20,
        width: '20%',
        textAlign: 'center',
        padding: 5,
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 5,
        backgroundColor: '#EDDC5F',
    },
    buttonContainer: {
        padding: 20,
    },
    buttonAcheterArticle: {
        backgroundColor: '#EDDC5F',
        marginBottom: 0,
        color: '#000000',
    },
    containerBtnSeller: {
        width: '100%',
        padding: 20,
    },
    map: {
        height: 200,
        width: '100%',
    },
    buttonContainer2: {
        padding: 20,
    
    },
    buttonOffre: {
        width: '100%',
        borderColor: "black",
        backgroundColor: "#00CC99",
    },
    
    buttonModify: {
        backgroundColor: '#F095B4',
    },
    buttonDelete: {
        backgroundColor: '#E94C65',
    },
})