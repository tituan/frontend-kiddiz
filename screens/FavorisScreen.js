import { StyleSheet, View, ScrollView, ActivityIndicator, Text} from 'react-native';
import React, { useEffect, useState , useRef} from "react";
import { useSelector } from 'react-redux';
import HeaderNavigation from './components/HeaderNavigation'; 
import { LinearGradient } from 'expo-linear-gradient'
import Article from './components/Article';
import { useIsFocused } from '@react-navigation/native';

 
 const urlBackend = process.env.EXPO_PUBLIC_API_URL;

export default function FavorisScreen({ navigation }) {

    
    const isFocused = useIsFocused()
   
      const scrollViewRef = useRef(null);
        useEffect(() => {
            if (isFocused && scrollViewRef.current) {
                scrollViewRef.current.scrollTo({ y: 0, animated: true });
            }
        }, [scrollViewRef, isFocused])


    const userToken = useSelector(state => state.user.value.token);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const fetchFavorites = async () => {
        try {
            const response = await fetch(`${urlBackend}favorites/${userToken}`);
            const data = await response.json();
            setArticles(data.articles); 
            
        } catch (error) {
            console.error("Erreur lors de la récupération des articles:", error);
        } finally {
            setLoading(false); 
        }
    };
    
    useEffect(() => {
        if(isFocused) fetchFavorites();
    }, [isFocused]);

    if (loading) {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
        );
      }

      const handleRefresh = () => {
        fetchFavorites();
      };

    return (
    <View style={styles.container}>
        <LinearGradient
            colors={['rgba(34,193,195,1)', 'rgba(253,187,45,1)']}
            start={{ x: 0, y: 1 }} 
            end={{ x: 0, y: 0 }} 
            style={styles.header}
        >
            <HeaderNavigation onPress={() => navigation.navigate("Connection")}/>  
        </LinearGradient> 
        <ScrollView ref={scrollViewRef} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.title}>Liste de vos articles ajouté en favoris :</Text>
            <View style={styles.row}>
                {articles && articles.length > 0 ? (
                    articles.map((item, i) => (
                        <Article key={i} item={item} isFavorite={true} onRefresh={handleRefresh}/>
                    ))
                ) : (
                    <View style={styles.noArticlesContainer}>
                        <Text style={styles.noArticlesText}> Aucun article en favoris </Text>
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
        paddingHorizontal: 20,
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
        paddingHorizontal: 20,
        padding: 20,
        fontSize: 20,
        fontFamily: 'LilitaOne-Regular',
    },

})