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
            <View>
                <TextInput placeholder="First Name" style={styles.fisrtName} />
                <TextInput placeholder="Last Name" style={styles.fisrtName} />
                <TextInput placeholder="Email" style={styles.fisrtName} />
                <TextInput placeholder="Birthday" style={styles.fisrtName} />
                <TextInput placeholder="Password" style={styles.fisrtName} />
                <TextInput placeholder="Conforme Password" style={styles.fisrtName} />
            </View>
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
    fontSize: 30,
    fontFamily: 'LilitaOne-Regular',
    color: "#FDBB2D",
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  fisrtName:{
    fontSize: 22,
    width: '100%',
    borderBottomColor: '#FDBB2D',
    borderBottomWidth: 1,

  },
  buttonSInscrire: {
    backgroundColor: '#00CC99',
  },
  
  
});