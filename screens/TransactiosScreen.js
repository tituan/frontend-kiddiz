import { StyleSheet, View, ScrollView, Text } from 'react-native';
import HeaderNavigation from './components/HeaderNavigation'; 
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { useSelector } from 'react-redux';
import ButtonHalf from './components/ButtonHalf';
import * as SplashScreen from 'expo-splash-screen';
import Article from './components/Article';
import { useState } from 'react';  

export default function TransactionsScreen({ navigation }) {
    const user = useSelector(state => state.user.value);
    console.log(user);
    const [articles, setArticles] = useState([]);

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
                        text="En vente"
                        onPress={() => handleButtonPress('vente')}
                    />
                    <ButtonHalf
                        style={[styles.buttonNav, getButtonStyle('achete')]}
                        text="Acheté"
                        onPress={() => handleButtonPress('achete')}
                    /> 
                </View>

                {activeView === 'vente' ? (
                    <View style={styles.venteContainer}>
                        <View style={styles.row}>
                            {articles && articles.length > 0 ? (
                                articles.map((item, i) => (
                                    <Article key={item.id} item={item} />
                                ))
                            ) : (
                                <View style={styles.noArticlesContainer}>
                                    <Text style={styles.noArticlesText}>Vous avez vendu(e) aucun article </Text>
                                </View>
                            )}
                        </View>
                    </View>
                ) : (
                    <View style={styles.acheteContainer}>
                         <View style={styles.row}>
                            {articles && articles.length > 0 ? (
                                articles.map((item, i) => (
                                    <Article key={item.id} item={item} />
                                ))
                            ) : (
                                <View style={styles.noArticlesContainer}>
                                    <Text style={styles.noArticlesText}> Aucun article acheté </Text>
                                </View>
                            )}
                        </View>
                    </View>
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
    },

    acheteContainer: {
        width: '100%',
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
        backgroundColor: '#D3D3D3', // Gris clair pour les boutons non sélectionnés
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
});