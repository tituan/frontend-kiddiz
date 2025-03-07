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

    const [fontsLoaded, fontError] = useFonts({
        'LilitaOne-Regular': require('../assets/fonts/LilitaOne-Regular.ttf'),
        'RopaSans-Regular': require('../assets/fonts/RopaSans-Regular.ttf'),
    });


    const [activeView, setActiveView] = useState('vente');  
    
    const handleButtonPress = (view) => {
        setActiveView(view);  
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
                        style={styles.buttonNav}
                        text="En vente"
                        onPress={() => handleButtonPress('vente')}
                    />
                    <ButtonHalf
                        style={styles.buttonNav}
                        text="Acheté"
                        onPress={() => handleButtonPress('achete')}
                    /> 
                </View>


                {activeView === 'vente' ? (
                    <View style={styles.venteContainer}>
                        <Text>Vente</Text>
                    </View>
                ) : (
                    <View style={styles.acheteContainer}>
                        <Text>Acheté</Text>
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
        marginLeft: 10,
    },

    venteContainer: {
        // height: 600,
        width: '100%',
        borderWidth: 10,  
        borderColor: 'red',
    },

    acheteContainer: {
        // height: 600,
        width: '100%',
        borderWidth: 10,  
        borderColor: 'green',
    },
    
    buttonNav: {
        backgroundColor: '#00CC99',
    },

});