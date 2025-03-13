import { StyleSheet, View, ScrollView, ActivityIndicator, Text, RefreshControl } from 'react-native';
import React, { useEffect, useState, useRef } from "react";
import HeaderNavigation from './components/HeaderNavigation';
import { LinearGradient } from 'expo-linear-gradient'
import WelcomeHome from './components/WelcomeHome'
import Article from './components/Article';
import { useIsFocused } from '@react-navigation/native';

 
 const urlBackend = process.env.EXPO_PUBLIC_API_URL;

export default function HomeScreen({ navigation }) {

    
    const isFocused = useIsFocused()
        
          const scrollViewRef = useRef(null);
            useEffect(() => {
                if (isFocused && scrollViewRef.current) {
                    scrollViewRef.current.scrollTo({ y: 0, animated: true });
                }
            }, [scrollViewRef, isFocused])
      
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Remplace l'URL par celle de ton backend
    const fetchArticles = async () => {
        try {
            const response = await fetch(`${urlBackend}articles/recent`);
            const data = await response.json();
            console.log(data)
            setArticles(data.article); 
        } catch (error) {
            console.error("Erreur lors de la récupération des articles:", error);
        } finally {
            setLoading(false); 
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchArticles(); // Recharge les articles
        setRefreshing(false);
    };
    
    useEffect(() => {
        console.log(isFocused)
        if(isFocused){
        fetchArticles();
        }
    }, [isFocused]);

    const handleSearch = async (searchTerm) => {

        try {
           
            const response = await fetch(`${urlBackend}articles/?search=${encodeURIComponent(searchTerm)}`);

            const data = await response.json();

            setArticles(data.articles);

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
                colors={['rgba(34,193,195,1)', 'rgba(253,187,45,1)']} 
                start={{ x: 0, y: 1 }} 
                end={{ x: 0, y: 0 }} 
                style={styles.header}
            >
                <HeaderNavigation
                    onPress={() => navigation.navigate("Connection")}
                    onSearch={handleSearch} 
                />
            </LinearGradient>
            <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={styles.contentContainer}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
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
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 }, 
        shadowOpacity: 0.9, 
        shadowRadius: 4, 
        elevation: 5, 

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