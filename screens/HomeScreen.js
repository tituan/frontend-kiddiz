import { Button, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';

export default function HomeScreen({ navigation }) {

    const [loaded, error] = useFonts({
        'LilitaOne-Regular': require('../assets/fonts/LilitaOne-Regular.ttf'),
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
   <View style={styles.container}>
     <Text>Home Screen</Text>
     <Text style={{ fontFamily: 'LilitaOne-Regular', fontSize: 24 }}>Lilita One</Text>
     <Button
       title="Go to Connection"
       onPress={() => navigation.navigate('Connection')}
     />
   </View>
 );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#3498db',
      alignItems: 'center',
      justifyContent: 'center',
    },
})