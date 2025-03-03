import { Button, StyleSheet, Text, View, TextInput,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonBig from './components/ButtonBig';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

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
      <Text style={styles.title}>{title}</Text>
            
                <TextInput placeholder="First Name" style={ styles.input} placeholder="First Name"/>
                <TextInput placeholder="Last Name" style={ styles.input} placeholder="Last Name"/>
                <TextInput placeholder="Email" style={ styles.input} placeholder="Email"/>
                <TextInput placeholder="Birthday" style={ styles.input} placeholder="Birthday"/>
                <TextInput placeholder="Password" style={ styles.input} placeholder="Password"/>
                <TextInput placeholder="Conforme Password" style={ styles.input} placeholder="Conforme Password" />
           
      <ButtonBig style={styles.buttonSInscrire}text="S'inscrire" />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 50,
    marginBottom: 100,
    fontFamily: 'LilitaOne-Regular',
    color: "#FDBB2D",
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },

  input: {
    fontSize: 16,
    fontFamily: 'LilitaOne-Regular',
    marginBottom: 30, 
    borderWidth: 2,
    width: '100%',
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    padding: 5,
  },
  
  
  buttonSInscrire: {
    backgroundColor: '#00CC99',
  },
  
  
});