import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import HeaderNavigation from './components/HeaderNavigation';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { useSelector } from 'react-redux';
import ButtonHalf from './components/ButtonHalf';
import * as SplashScreen from 'expo-splash-screen';
import Article from './components/Article';
import { useState, useEffect } from 'react';
import ArticleTransaction from './components/ArticleTransaction';

const urlBackend = process.env.EXPO_PUBLIC_API_URL;

export default function TransactionsScreen({ navigation }) {
    const user = useSelector(state => state.user.value);
    const [soldArticles, setSoldArticles] = useState([]);
    const [boughtArticles, setBoughtArticles] = useState([]);
    console.log('soldArticle ----------------->', soldArticles);
    console.log('boughtArticle ----------------->', boughtArticles)


    const [fontsLoaded, fontError] = useFonts({
        'LilitaOne-Regular': require('../assets/fonts/LilitaOne-Regular.ttf'),
        'RopaSans-Regular': require('../assets/fonts/RopaSans-Regular.ttf'),
    });

    const [activeView, setActiveView] = useState('vente');

    const handleButtonPress = (view) => {
        setActiveView(view);
    };

    const getButtonStyle = (view) => {
        return view === activeView ? styles.activeButton : styles.inactiveButton;
    };

    // Remplace l'URL par celle de ton backend
    const fetchSoldArticle = async () => {
        try {
            const response = await fetch(`${urlBackend}articles/sold-by/seller/${user.token}`);
            const data = await response.json();
            console.log(data)
            setSoldArticles(data.articles);
        } catch (error) {
            console.error("Erreur lors de la récupération des articles:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchBoughtArticle = async () => {
        try {
            const response = await fetch(`${urlBackend}articles/bought-by/buyer/${user.token}`);
            const data = await response.json();
            console.log(data)
            setBoughtArticles(data.user.articlesBought);
        } catch (error) {
            console.error("Erreur lors de la récupération des articles:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSoldArticle();
        fetchBoughtArticle();
    }, []);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['rgba(34,193,195,1)', 'rgba(253,187,45,1)']} // Couleurs du dégradé
                start={{ x: 0, y: 1 }} // Point de départ du dégradé (0,1 = bas)
                end={{ x: 0, y: 0 }} // Point d'arrivée du dégradé (0,0 = haut)
                style={styles.header}
            >
                <HeaderNavigation onPress={() => navigation.navigate("Connection")} />
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.buttonContainer}>
                    <ButtonHalf
                        style={[styles.buttonNav, getButtonStyle('vente')]}
                        text="Mes ventes"
                        onPress={() => handleButtonPress('vente')}
                    />
                    <ButtonHalf
                        style={[styles.buttonNav, getButtonStyle('achete')]}
                        text="Mes achats"
                        onPress={() => handleButtonPress('achete')}
                    />
                </View>

                {activeView === 'vente' ? (
                    // Partie "Mes ventes"
                    soldArticles.length > 0 ? (
                        soldArticles.map((item, i) => (
                            <TouchableOpacity onPress={() => navigation.navigate('ArticleScreen', { article: item })}>
                                <View key={i} style={styles.venteContainer}>
                                    <View style={styles.articleContainer}>
                                        <View style={styles.imageContainer}>
                                            <Image source={{ uri: item.pictures[0] }} style={styles.image} />
                                        </View>
                                        <View>
                                            <View style={styles.textContainer}>
                                                <Text style={styles.textTitre}>Article : {item.title}</Text>
                                                
                                            </View>
                                            <Text style={styles.textPrix}>Prix : {item.price} €</Text>
                                            <View>
                                                <Text style={styles.textNom}>Nom de l'acheteur : {item.boughtBy?.firstname}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <View style={styles.noArticlesContainer}>
                            <Text style={styles.noArticlesText}>Vous n'avez vendu(e) aucun article</Text>
                        </View>
                    )
                ) : (
                    // Partie "Mes achats"
                    boughtArticles.length > 0 ? (
                        boughtArticles.map((item, i) => (
                            <TouchableOpacity onPress={() => navigation.navigate('ArticleScreen', { article: item })}>
                                <View key={i} style={styles.venteContainer}>
                                    <View style={styles.articleContainer}>
                                        <View style={styles.imageContainer}>
                                            <Image source={{ uri: item.pictures[0] }} style={styles.image} />
                                        </View>
                                        <View>
                                            <View style={styles.textContainer}>
                                                <Text style={styles.textTitre}>Article : {item.title}</Text>
                                            </View>
                                            <Text style={styles.textPrix}>Prix : {item.price} €</Text>
                                            <View>
                                                <Text style={styles.textNom}>Nom du vendeur : {item.user.firstname}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <View style={styles.noArticlesContainer}>
                            <Text style={styles.noArticlesText}>Vous n'avez acheté aucun article</Text>
                        </View>
                    )


                    // <View style={styles.acheteContainer}>
                    //     <View style={styles.articleContainer}>
                    //         <View style={styles.imageContainer}>
                    //             <Image source={require('../assets/train-bois.jpg')} style={styles.image} />
                    //         </View>
                    //         <View>
                    //             <View style={styles.textContainer}>
                    //                 <Text style={styles.textTitre}>Train en bois </Text>
                    //                 <Text style={styles.textPrix}> 12 € </Text>
                    //             </View>
                    //             <View>
                    //                 <Text style={styles.textNom}> Antoine </Text>
                    //             </View>
                    //         </View>
                    //     </View>
                    // </View>
                )}
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
    buttonContainer: {
        width: '60%',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 5,
    },
    venteContainer: {
        width: '100%',
        paddingHorizontal: 20,
    },
    acheteContainer: {
        width: '100%',
        padding: 20,
    },
    buttonNav: {
        marginRight: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeButton: {
        backgroundColor: '#00CC99',
    },
    inactiveButton: {
        backgroundColor: '#D3D3D3',
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
    articlesContainer: {
        width: '100%',
    },
    articleContainer: {
        borderWidth: 1,
        borderColor: "#000000",
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'white',
        hadowColor: "#000",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        marginBottom: 10,
    },
    imageContainer: {
        marginRight: 20,
        marginLeft: 10,
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: 50,
        borderColor: '#00000',
        borderWidth: 1,
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textTitre: {
        fontFamily: 'RopaSans-Regular',
        fontSize: 18,
        marginBottom: 4,
    },
    textPrix: {
        fontFamily: 'RopaSans-Regular',
        fontSize: 16,
        marginBottom: 4,
    },
    textNom: {
        fontFamily: 'RopaSans-Regular',
        fontSize: 14,
    },
});