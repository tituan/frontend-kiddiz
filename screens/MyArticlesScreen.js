import { StyleSheet, View, ScrollView, FlatList, ActivityIndicator, Text} from 'react-native';
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import HeaderNavigation from './components/HeaderNavigation'; 
import { LinearGradient } from 'expo-linear-gradient'
import Article from './components/Article';

const urlBackend = process.env.EXPO_PUBLIC_API_URL;

export default function FavorisScreen({ navigation }) {

    const userToken = useSelector(state => state.user.value.token);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log(articles)

useEffect(() => {

    const fetchArticles = async () => {

    try {

        const response = await fetch(`${urlBackend}articles/get-by/seller/${userToken}`);
        const data = await response.json();
        setArticles(data.articles); // Stocke les articles dans l'état

    } catch (error) {

        console.error("Erreur lors de la récupération des articles:", error);

    } finally {

        setLoading(false); // Arrête le chargement
    }
    };

    fetchArticles();
}, []);

const handleModify = (articleId) => {
    // Redirige vers ModifyArticleScreen avec l'ID de l'article
    navigation.navigate('ModifyArticle', { articleId }); 
  };

if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
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
        <Text style={styles.title}>Liste de vos articles actuellement en vente :</Text>
        <View style={styles.containerList}>
            {articles.map((item, i) => (
                <Article 
                key={i} 
                item={item}
                onModify={handleModify}
                showModifyButton={true} />
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
        shadowColor: "#000", // Couleur de l'ombre
        shadowOffset: { width: 0, height: 3 }, // Décalage vertical de l'ombre
        shadowOpacity: 0.9, // Opacité de l'ombre
        shadowRadius: 4, // Flou de l'ombre
        elevation: 5, // Ajoute l'ombre sur Android

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
    contentContainer: {
        flexGrow: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    containerList: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    title: {
        padding: 20,
        fontSize: 20,
        fontFamily: 'LilitaOne-Regular',
    },
})
