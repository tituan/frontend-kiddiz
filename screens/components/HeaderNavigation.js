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
import HomeScreen from '../HomeScreen';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const HeaderNavigation = ({ onPress, onSearch }) => {
    const userToken = useSelector(state => state.user.value.token);
    const route = useRoute(); // Récupère la route actuelle
    // const dispatch = useDispatch();
    const navigation = useNavigation();
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
                    {route.name !== 'Home' && (
                        <ButtonIcon style={styles.buttonLogOut} name="arrow-left" onPress={() => navigation.goBack()} />
                    ) }
                    {!userToken ? (
                        <ButtonHalf style={styles.buttonConnection} text="Connexion" onPress={onPress} />
                    ) : null }
                </View>
            </View>
            <View style={styles.headerBottom}>
                <SearchBar onSearch={onSearch} />
            </View> 
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingTop: 30,
    },
    headerTop: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerTopKiddiz: {
        fontSize: 55,
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
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '50%',
    },
    buttonLogOut: {
        backgroundColor: '#f095B4',
        height: 45,
    },
    buttonConnection: {
        height:45,
        width: 120,
        marginLeft: 5,
    }
    
})

export default HeaderNavigation;
