import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import { useSelector } from 'react-redux';
import ButtonHalf from './ButtonHalf'
import ButtonIcon from './ButtonIcon'
import SearchBar from './SearchBar'
import { useDispatch } from 'react-redux';
import { logOut } from '../../reducers/users';

const HeaderNavigation = ({ navigation, onPress, onSearch }) => {
    const userToken = useSelector(state => state.user.value.token);
    const dispatch = useDispatch();
    const [loaded, error] = useFonts({
        'LilitaOne-Regular': require('../../assets/fonts/LilitaOne-Regular.ttf'),
    });

    const handleLogOut = () => {
        dispatch(logOut()); // Déclenche l'action logOut
        console.log('Utilisateur déconnecté');
    };

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
            {!userToken ?  (
                <ButtonHalf style={styles.buttonConnection} text="Connexion" onPress={onPress} />
            ) : (
                <ButtonIcon style={styles.buttonLogOut} name="sign-out" onPress={handleLogOut}/>
            )}
            </View>
        </View>
        <View style={styles.headerBottom}>
            <SearchBar onSearch={onSearch} />
        </View>
    </View>

 );
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 30,
    },
    headerTop: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 10,
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
    },
    buttonLogOut: {
        backgroundColor: '#f095B4',
        marginTop:7,
        
    },
    buttonConnection: {
        height:45,
        width: 125,
    }
    
})

export default HeaderNavigation;
