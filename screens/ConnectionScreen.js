import { StyleSheet, Text, View,  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonBig from './components/ButtonBig';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import ButtonIcon from './components/ButtonIcon';

export default function ConnectionScreen({ navigation }) {
  const title = 'Kiddiz';

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
    <SafeAreaView style={styles.container}>

      <ButtonIcon style={styles.buttonBack}  name="arrow-left"  onPress={() => navigation.navigate('Home')}/>
    
      <Text style={styles.title}>{title}</Text>
      <View style={styles.textContainer}>
        <Text style={styles.bodyContainer}>Se connecter</Text>
        <Text style={styles.bodyContainer}>ou</Text>
        <Text style={styles.bodyContainer}>s'inscrire</Text>
      </View>

      <ButtonBig style={styles.buttonInscrisToi} text="Inscris-toi" onPress={() => navigation.navigate('SignUp')} />
      <ButtonBig style={styles.buttonConnectesToi} text="Connectes-toi" onPress={() => navigation.navigate('SignIn')} />
      {/* <ButtonBig style={styles.buttonGoogle} text="Se connecter avec Google" /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5', 
  },
  buttonBack: {
    position: 'absolute',
    top: '7%', 
    left: '5%',
    backgroundColor: '#F095B4',
    
  },
  title: {
    fontSize: 90,
    fontFamily: 'LilitaOne-Regular',
    color: "#FDBB2D",
    textShadowColor: 'black',
    textShadowOffset: { width: 4, height: 6 },
    textShadowRadius: 3,
    marginBottom: 20,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 280,
    height: 200,
    margin: 60,
  },
  bodyContainer: {
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'LilitaOne-Regular',
  },
  buttonInscrisToi: {
    backgroundColor: '#00CC99',
    marginBottom: 10,
  },
  buttonConnectesToi: {
    backgroundColor: '#4478A9',
    marginBottom: 10,
  },
  buttonGoogle: {
    backgroundColor: '#E94C65',
  },
});