import { StyleSheet, Text, View, Image } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import { LinearGradient } from 'expo-linear-gradient'
import ButtonBig from '../components/ButtonBig';
import { useSelector } from 'react-redux';

const WelcomeHome = () => {
    const userToken = useSelector(state => state.user.value.token);
    
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
    <LinearGradient
            colors={['rgba(253,187,45,1)', 'rgba(34,193,195,1)']} // Couleurs du dégradé
            start={{ x: 0, y: 1 }} // Point de départ du dégradé (0,1 = bas)
            end={{ x: 0, y: 0 }} // Point d'arrivée du dégradé (0,0 = haut)
            style={styles.header}
            >
    {/* <View style={styles.container}> */}
        {!userToken && ( 
            <View style={styles.containerWelcome}>
                <Text style={styles.welcomeTitle}>Bienvenue sur Kiddiz</Text>
                <Image
                    style={styles.welcomeImage}
                    source={require('../../assets/home-img.png')}
                    resizeMode="cover"
                />
                <Text style={styles.welcomeLine}>Vendez / Achetez des jouets</Text>
                <Text style={styles.welcomeLine}>d'occasion non reconditionnés</Text>
                <ButtonBig style={styles.buttonVendre} text="Vendre votre article" />
            </View>
      )} 
    {/* </View> */}
    </LinearGradient>

 );
}

const styles = StyleSheet.create({
    containerWelcome: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        // backgroundColor: 'rgba(34,193,195,1)',
        borderBottomColor: '#00000',
        borderBottomWidth: 2,
    },
    welcomeTitle: {
        fontSize: 35,
        color: '#ffff',
        fontFamily: 'LilitaOne-Regular',
        textShadowRadius: 2, textShadowColor: 'black', 
        textShadowOffset: { width: 2, height: 4}, 
        textShadowRadius: 2, 
        marginBottom: 15,
    },
    welcomeLine: {
        color: '#00000',
        fontFamily: 'RopaSans',
        fontSize: '16',
    },
    buttonVendre: {
     backgroundColor: '#F095b4',
     marginTop: 15,
    },
    welcomeImage: {
        width: '70%',
        height: 120,
        resizeMode: 'cover',
        marginBottom: 15,
    }


})

export default WelcomeHome;
