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
            <View></View>
                <TextInput placeholder="First Name" style={ styles.input} />
                <TextInput placeholder="Last Name" style={ styles.input}/>
                <TextInput placeholder="Email" style={ styles.input}/>
                <TextInput placeholder="Birthday" style={ styles.input}/>
                <TextInput placeholder="Password" style={ styles.input} />
                <TextInput placeholder="Conforme Password" style={ styles.input} />
           
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
    
    fontSize: 25,
    fontFamily: 'LilitaOne-Regular',
    marginBottom: 30, 
    width: '100%',
    borderBottomColor: '#FDBB2D',
    borderBottomWidth: 1,
    textAlign: 'left',
    
  },
  buttonSInscrire: {
    backgroundColor: '#00CC99',
  },
  
  
});