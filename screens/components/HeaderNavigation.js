import { Button, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const HeaderNavigation = () => {

    const [loaded, error] = useFonts({
        'LilitaOne-Regular': require('../../assets/fonts/LilitaOne-Regular.ttf'),
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
        colors={['rgba(34,193,195,1)', 'rgba(253,187,45,1)']} // Couleurs du dégradé
        start={{ x: 0, y: 1 }} // Point de départ du dégradé (0,1 = bas)
        end={{ x: 0, y: 0 }} // Point d'arrivée du dégradé (0,0 = haut)
        style={styles.header}
    >
        <View style={styles.headerTop}>  
                <Text style={styles.headerTopKiddiz}>Kiddiz</Text>
                <View>
                    <Button title="Go to Connection" onPress={() => navigation.navigate('Connection')}/>
                </View>
            </View>
            <View style={styles.headerBottom}>
        </View>
    </LinearGradient>

 );
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 50,
        padding: 20,
    },
    headerTop: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerTopKiddiz: {
        fontSize: 60,
        fontFamily: 'LilitaOne-Regular',
        color: '#ffff',
        textShadowColor: 'black', 
        textShadowOffset: { width: 4, height: 6 }, 
        textShadowRadius: 3, textShadowColor: 'black', 
        textShadowOffset: { width: 4, height: 6 }, 
        textShadowRadius: 3, 
    }
})

export default HeaderNavigation;
