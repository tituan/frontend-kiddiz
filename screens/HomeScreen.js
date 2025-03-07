import { StyleSheet, View, ScrollView, FlatList, ActivityIndicator,} from 'react-native';
import React, { useEffect, useState } from "react";
import HeaderNavigation from './components/HeaderNavigation'; 
import { LinearGradient } from 'expo-linear-gradient'
import WelcomeHome from './components/WelcomeHome'
import Article from './components/Article';


export default function HomeScreen({ navigation }) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log(articles)

    useEffect(() => {
        // Remplace l'URL par celle de ton backend
        const fetchArticles = async () => {
        try {
            const response = await fetch("http://192.168.100.254:3000/articles/popular");
            const data = await response.json();
            setArticles(data.article); // Stocke les articles dans l'état
        } catch (error) {
            console.error("Erreur lors de la récupération des articles:", error);
        } finally {
            setLoading(false); // Arrête le chargement
        }
        };

        fetchArticles();
    }, []);

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
        <WelcomeHome navigation={navigation}/>  
             <View style={styles.row}> 
                {articles.map((item, i) => (
                   <Article key={item.id} item={item} />
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

})

