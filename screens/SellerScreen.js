import { StyleSheet, View, ScrollView, Text, ActivityIndicator, Image, Button } from 'react-native';
import React, { useEffect, useState } from "react";
import HeaderNavigation from './components/HeaderNavigation'; 
import { LinearGradient } from 'expo-linear-gradient'
import { useFonts } from 'expo-font';
import ButtonBig from './components/ButtonBig'
import ButtonHalf from './components/ButtonHalf';
import Article from './components/Article';

export default function SellerScreen({ route }) {
    const article = route.params;
    const sellerToken = article.article.token
    const sellerFirstName = article.article.firstname
    const sellerLastName = article.article.lastname
    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState([]);
    console.log(articles)

    
    // console.log(articles)

    useEffect(() => {
        // Remplace l'URL par celle de ton backend
        const fetchArticles = async () => {
            try {
                const response = await fetch(`http://192.168.100.209:3000/articles/get-by/seller/${sellerToken}`);
                const data = await response.json();
                console.log(data)
                setArticles(data.article); // Stocke les articles dans l'état
            } catch (error) {
                console.error("Erreur lors de la récupération des articles:", error);
            } finally {
                setLoading(false); // Arrête le chargement
            }
        };

        fetchArticles();
    }, []);

    const [fontsLoaded] = useFonts({
        'LilitaOne-Regular': require('../assets/fonts/LilitaOne-Regular.ttf'),
        'RopaSans-Regular': require('../assets/fonts/RopaSans-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    

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
            <Text style={styles.titre}> Le vendeur </Text>
                <View style={styles.profil}>
                    <View style={styles.cardProfil}>
                        <View style={styles.idBox}>
                            <View style={styles.iconProfil}>
                                <View style={styles.iconProfilInitial}>
                                    {/* <Text>{sellerFirstName}</Text> */}

                                </View>
                            </View>
                            
                            <View style={styles.infoUser}>
                                <View>
                                    <Text style={styles.firstName}>{sellerFirstName}</Text>
                                    <Text> ⭐️ ⭐️ ⭐️ ⭐️ ⭐️  4.5 </Text>
                                    <Text> Paris (75017) </Text>
                                </View>
                            </View>
                        </View>
                        <Text style={styles.textAbonnes}> Nombre d'abonnés 150 </Text>
                        <Text style={styles.textVente} > Nombre de vente réalisées 50 </Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <ButtonHalf style={styles.buttonContacter} text="Contacter"/>
                        <ButtonHalf style={styles.buttonAbonner} text="S'abonner"/>
                    </View>
                    <Text style={styles.titre}> 12 Articles en vente </Text>
                    <Text style={styles.titre}> Categorie </Text>
                    <ButtonBig style={styles.buttonCategorie} text="Tous"/>
                </View>
                <Text style={styles.titre}> Articles en vente </Text>
            
                <View style={styles.row}> 
                    {articles.map((article, index) => (
                        <Article key={article.id} item={article} />
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
    header: {
        padding: 20,
        borderBottomColor: '#00000',
        borderBottomWidth: 1,
        paddingBottom: 20,
    },
    profil: {
        padding: 20,
    },
    cardProfil:{

    },
    iconProfilInitial:{
        width: 120,
        height: 120,
        borderRadius: '50%',
        backgroundColor: 'pink',
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center',
        color: 'black',
        fontFamily: 'LilitaOne-Regular',
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
    buttonContainer :{
        width: '100%',
        flexDirection: 'row',  
        justifyContent: 'space-between',  
        alignItems: 'center',
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
        padding:10,
        
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
    },
    contentContainer: {
        // flexGrow: 1,
    },
    buttonSeller: {
        width: 200,
        height: 50,
    }
});