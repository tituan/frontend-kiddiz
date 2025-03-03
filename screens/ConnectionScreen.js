import { Button, StyleSheet, Text, View } from 'react-native';
import ButtonBig from './components/components';

export default function ConnectionScreen({ navigation }) {
 return (
   <View style={styles.container}>
     <Text>Kiddiz</Text>
     <Text>Se connecter ou S'inscrire</Text>

     {/* Style personnalisé pour chaque bouton */}
     <ButtonBig style={styles.buttonApple} text="Se connecter avec Apple" />
     <ButtonBig style={styles.buttonFacebook} text="Se connecter avec Facebook" />
     <ButtonBig style={styles.buttonGoogle} text="Se connecter avec Google" />

     <Button
       title="Go to SignIn"
       onPress={() => navigation.navigate('SignIn')}
     />
     <Button
       title="Go to SignUp"
       onPress={() => navigation.navigate('SignUp')}
     />
   </View>
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  
  buttonApple: {
    backgroundColor: '#EDDC5F',  
  },

  
  buttonFacebook: {
    backgroundColor: '#4478A9',  
  },

  buttonGoogle: {
    backgroundColor: '#E94C65',  
  },
})