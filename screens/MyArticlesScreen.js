import { StyleSheet, View, ScrollView, FlatList, ActivityIndicator, Text, RefreshControl } from 'react-native';
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import HeaderNavigation from './components/HeaderNavigation';
import { LinearGradient } from 'expo-linear-gradient'
import Article from './components/Article';

const urlBackend = process.env.EXPO_PUBLIC_API_URL;

export default function MyArticlesScreen({ navigation }) {

    const userToken = useSelector(state => state.user.value.token);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

   
    const onRefresh = () => {
        setRefreshing(true);
        fetchArticles();
        setTimeout(() => {
            setRefreshing(false);
        }, 750);
    };

    const fetchArticles = async () => {
        try {
            const response = await fetch(`${urlBackend}articles/get-by/seller/${userToken}`);
            const data = await response.json();
            console.log('Articles récupérés:', data.articles);
            setArticles(data.articles); 
        }
        catch (error) {
            console.error("Erreur lors de la récupération des articles:", error);
        }
        finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
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
                colors={['rgba(34,193,195,1)', 'rgba(253,187,45,1)']} 
                start={{ x: 0, y: 1 }} 
                end={{ x: 0, y: 0 }} 
                style={styles.header}
            >
                <HeaderNavigation onPress={() => navigation.navigate("Connection")} />
            </LinearGradient>
            <ScrollView 
            contentContainerStyle={styles.contentContainer} 
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>
                <Text style={styles.title}>Liste de vos articles actuellement en vente :</Text>
                <View style={styles.containerList}>
                    {articles.map((item, i) => (
                        <Article
                            key={i}
                            item={item}
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
