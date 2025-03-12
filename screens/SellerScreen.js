import { StyleSheet, View, ScrollView, Text, ActivityIndicator, Image, Button } from 'react-native';
import React, { useEffect, useState } from "react";
import HeaderNavigation from './components/HeaderNavigation'; 
import { LinearGradient } from 'expo-linear-gradient'
import { useFonts } from 'expo-font';
import ButtonBig from './components/ButtonBig'
import ButtonHalf from './components/ButtonHalf';
import Article from './components/Article';
import { FontAwesome } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

// Env variable for BACKEND
const urlBackend = process.env.EXPO_PUBLIC_API_URL;

export default function SellerScreen({ navigation, route }) {
     

    const article = route.params;
    const sellerToken = article.article.token;
    const sellerFirstName = article.article.firstname;
    const sellerLastName = article.article.lastname;
    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState([]);
    const numberArticlesSeller = articles ? articles.length : 0;
    const userToken = useSelector(state => state.user.value.token);

    // Remplace l'URL par celle de ton backend
    const fetchArticles = async () => {
        try {
            const response = await fetch(`${urlBackend}articles/get-by/seller/${sellerToken}`);
            const data = await response.json();
            console.log(data)
            setArticles(data.articles); // Stocke les articles dans l'état
        } catch (error) {
            console.error("Erreur lors de la récupération des articles:", error);
        } finally {
            setLoading(false); // Arrête le chargement
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const handleRefresh = () => {
        fetchArticles();
      };

    const [fontsLoaded] = useFonts({
        'LilitaOne-Regular': require('../assets/fonts/LilitaOne-Regular.ttf'),
        'RopaSans-Regular': require('../assets/fonts/RopaSans-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    console.log('test:', article)
    console.log('test2:', articles)

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
            <ScrollView contentContainerStyle={styles.contentContainer}>
            <Text style={styles.mainTitle}> Le vendeur </Text>
                <View style={styles.profil}>
                    <View style={styles.cardProfil}>
                        <View style={styles.idBox}>
                            <View style={styles.iconProfil}>
                                <View style={styles.iconProfilInitial}>
                                    <Text style={styles.iconProfilLetter}>{sellerFirstName?.charAt(0).toUpperCase() || '?'}</Text>
                                </View>
                            </View>
                            <View style={styles.infoUser}>
                                <View>
                                    <Text style={styles.firstName}>{sellerFirstName}</Text>
                                    <View style={styles.starContainer}> 
                                        <FontAwesome name="star" size={20} color={"gold"} />
                                        <FontAwesome name="star" size={20} color={"gold"} />
                                        <FontAwesome name="star" size={20} color={"gold"} />
                                        <FontAwesome name="star" size={20} color={"gold"} />
                                        <FontAwesome name="star" size={20} color={"gold"} />
                                        <Text> 4.5 </Text>
                                    </View>
                                    <Text> Paris (75017) </Text>
                                </View>
                            </View>
                        </View>
                        <Text style={styles.textAbonnes}> Nombre d'abonnés 150 </Text>
                        <Text style={styles.textVente} > Nombre de vente réalisées 50 </Text>
                    </View>
                    <View style={styles.buttonContainer}>

                        <ButtonHalf 
                        style={styles.buttonContacter} 
                        text="Contacter"
                        onPress={() => {
                            if (!userToken) {
                                navigation.navigate("Connection");
                            } else {
                                // redirection vers la page d'achat
                            }
                        }}/>

                        <ButtonHalf 
                        style={styles.buttonAbonner} 
                        text="S'abonner"
                        onPress={() => {
                            if (!userToken) {
                                navigation.navigate("Connection");
                            } else {
                                // redirection vers la page d'achat
                            }
                        }}/>

                    </View>
                    
                    {/* <View style={styles.containerCategories}>
                        <Text style={styles.titre}> Categorie </Text>
                        <ButtonBig style={styles.buttonCategorie} text="Tous"/>
                    </View> */}
                    
                </View>
                <Text style={styles.mainTitle}> {numberArticlesSeller} Articles en vente : </Text>
            
                <View style={styles.row}> 
                    {articles && articles.map((article, index) => (
                        <Article key={article.id} item={article} onRefresh={handleRefresh}/>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fffff',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    header: {
        padding: 20,
        borderBottomColor: '#00000',
        borderBottomWidth: 1,
        paddingBottom: 20,
    },
    profil: {
       marginTop: 20,
    },
    cardProfil:{
        marginBottom:15,
        paddingHorizontal: 20,
    },
    iconProfilInitial:{
        width: 100,
        height: 100,
        borderWidth: 1,
        borderColor: "#00000",
        borderRadius: '50%',
        backgroundColor: 'pink',
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#00CC99',
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
    },
    iconProfilLetter: {
        color: '#00000',
        fontFamily: 'LilitaOne-Regular',
        fontSize: 60,
    },
    iconProfil:{
        width: '35%',
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center'
    },
    firstName:{
        fontFamily: 'LilitaOne-Regular',
        fontSize: 30,
    },
    starContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    idBox:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    infoUser:{
        width: '65%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    textAbonnes:{
        color: "black",
        fontFamily: 'RopaSans-Regular',
        fontSize: 18,
        marginBottom:4,
    },
    textVente:{
        color: "black",
        fontFamily: 'RopaSans-Regular',
        fontSize: 18,
    },
    mainTitle: {
        paddingLeft: 20,
        fontFamily: 'LilitaOne-Regular',
        fontSize: 24,
        marginTop: 15,
    },
    buttonContacter:{
        width: '48%',
        borderColor: "black",
        backgroundColor: "#EDDC5F",
    },
    buttonAbonner:{
        width: '48%',
        borderColor: "black",
        backgroundColor: "#00CC99",
    },
    titre: {
        color: "black",
        fontFamily: 'LilitaOne-Regular',
        fontSize: 25, 
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        flexWrap: 'wrap',
        alignItems: 'center', 
        width: '100%', 
        padding: 20, 
    },
    article: {
        width: '48%', 
    },
    buttonCategorie:{
        alignItems: 'left',
        paddingLeft: 15,
        backgroundColor: 'pink',
    },
    buttonSeller: {
        width: 200,
        height: 50,
    }
});