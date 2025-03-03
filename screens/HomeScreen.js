import { Button, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import HeaderNavigation from './components/HeaderNavigation'; 

export default function HomeScreen({ navigation }) {

    // const [loaded, error] = useFonts({
    //     'LilitaOne-Regular': require('../assets/fonts/LilitaOne-Regular.ttf'),
    // });

    // useEffect(() => {
    // if (loaded || error) {
    //     SplashScreen.hideAsync();
    // }
    // }, [loaded, error]);

    // if (!loaded && !error) {
    //     return null;
    // }

    return (
    <View style={styles.container}>
        <HeaderNavigation/>       
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fffff',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    },
})