import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';

import ButtonHalf from './ButtonHalf'
import SearchBar from './SearchBar'

const HeaderNavigation = ({ onPress }) => {

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

    <View style={styles.header}>
        <View style={styles.headerTop}>  
            <Text style={styles.headerTopKiddiz}>Kiddiz</Text>
            <View style={styles.headerButton}>
                <ButtonHalf style={styles.buttonApple} text="Connexion" onPress={onPress}/>
            </View>
        </View>
        <View style={styles.headerBottom}>
            <SearchBar/>
        </View>
    </View>

 );
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 50,
    },
    headerTop: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
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
    },
    headerButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'end',
        justifyContent: 'flex-end',
        width: '50%',
        height: 60,
    }
})

export default HeaderNavigation;
