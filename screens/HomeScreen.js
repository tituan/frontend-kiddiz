import { StyleSheet, View, ScrollView, FlatList, ActivityIndicator, Text } from 'react-native';
import React, { useEffect, useState, useRef } from "react";
import HeaderNavigation from './components/HeaderNavigation';
import { LinearGradient } from 'expo-linear-gradient'
import WelcomeHome from './components/WelcomeHome'
import Article from './components/Article';
import { useIsFocused } from '@react-navigation/native';

 // Env variable for BACKEND
 const urlBackend = process.env.EXPO_PUBLIC_API_URL;

export default function HomeScreen({ navigation }) {

    // action de refresh scrollView (useIsFocused,useRef,ref={scrollViewRef})
    const isFocused = useIsFocused()
        
          const scrollViewRef = useRef(null);
            useEffect(() => {
                if (isFocused && scrollViewRef.current) {
                    scrollViewRef.current.scrollTo({ y: 0, animated: true });
                }
            }, [scrollViewRef, isFocused])
      
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    // Remplace l'URL par celle de ton backend
    const fetchArticles = async () => {
        try {
            const response = await fetch(`${urlBackend}articles/recent`);
            const data = await response.json();
            console.log(data)
            setArticles(data.article); // Stocke les articles dans l'état
        } catch (error) {
            console.error("Erreur lors de la récupération des articles:", error);
        } finally {
            setLoading(false); // Arrête le chargement
        }
    };
    
    useEffect(() => {
        console.log(isFocused)
        if(isFocused){
        fetchArticles();
        }
    }, [isFocused]);

    const handleSearch = async (searchTerm) => {

        try {
            // encodeURIComponent permet de gérer les caractères spéciaux
            const response = await fetch(`${urlBackend}articles/?search=${encodeURIComponent(searchTerm)}`);

            const data = await response.json();

            setArticles(data.articles);
            // navigation.navigate("Home");

        } catch (error) {
            console.error('Erreur lors de la recherche :', error);
        }
    };

    const handleRefresh = () => {
        fetchArticles();
      };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#00CC99" />
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
                <HeaderNavigation
                    onPress={() => navigation.navigate("Connection")}
                    onSearch={handleSearch} // Passe la fonction handleSearch qui va fetch à HeaderNavigation
                />
            </LinearGradient>
            <ScrollView ref={scrollViewRef} contentContainerStyle={styles.contentContainer}>
                <WelcomeHome navigation={navigation} />
                
                <View style={styles.row}>
                    {articles && articles.length > 0 ? (
                        articles.map((item, i) => (
                            <Article key={item.id} item={item} onRefresh={handleRefresh}/>
                        ))
                    ) : (
                        <View style={styles.noArticlesContainer}>
                            <Text style={styles.noArticlesText}> Aucun article disponible </Text>
                        </View>
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
    noArticlesContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 20,
    },
    noArticlesText: {
        fontSize: 16,
        color: '#666',
        fontStyle: 'italic',
    },

})