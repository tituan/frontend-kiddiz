import { StyleSheet, Text, View, Image } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';

const WelcomeHome = () => {

    const [loaded, error] = useFonts({
        'LilitaOne-Regular': require('../../assets/fonts/LilitaOne-Regular.ttf'),
        'RopaSans': require('../../assets/fonts/RopaSans-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }  

 return (
    <View style={styles.containerWelcome}>
        <Text style={styles.welcomeTitle}>Bienvenu sur Kiddiz</Text>
        <Image 
            style={styles.welcomeImage}
            source={require('../../assets/home-img.png')}
            resizeMode="cover"
        />
        <Text style={styles.welcomeLine}>Vendez / Achetez des jouets</Text>
        <Text style={styles.welcomeLine}>d'occasion non recondiotionnés</Text>
    </View>
 );
}

const styles = StyleSheet.create({
    containerWelcome: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcomeTitle: {
        fontSize: 40,
        color: '#ffff',
        fontFamily: 'LilitaOne-Regular',
        textShadowRadius: 2, textShadowColor: 'black', 
        textShadowOffset: { width: 2, height: 4}, 
        textShadowRadius: 2, 
        marginBottom: 20,
    },
    welcomeLine: {
        color: '#00000',
        fontFamily: 'RopaSans',
        fontSize: '22',
    },
    welcomeImage: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginBottom: 25,
    }


})

export default WelcomeHome;
