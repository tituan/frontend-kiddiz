import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonBig from './components/ButtonBig';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ConnectionScreen({ navigation }) {
  const title = 'Kiddiz';
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');
  
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

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setFormattedDate(currentDate.toLocaleDateString());  // Formate la date pour l'afficher
    setShowPicker(false); // Ferme le picker après la sélection de la date
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        colors={['rgba(34,193,195,1)', 'rgba(253,187,45,1)']}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.container}
      >
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <SafeAreaView style={styles.innerContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.bodyText}>Découvrez un monde de jouets !</Text>

            <TextInput placeholder="First Name" style={styles.input} />
            <TextInput placeholder="Last Name" style={styles.input} />
            <TextInput placeholder="Email" style={styles.input} />

            <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.input}>
              <Text style={formattedDate ? styles.dateText : styles.placeholderText}>
                {formattedDate || 'Birthday'}
              </Text>
            </TouchableOpacity>

            {showPicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="spinner" 
                onChange={handleDateChange} // Appel de la fonction pour gérer le changement de date
              />
            )}

            <TextInput placeholder="Password" style={styles.input} secureTextEntry={true} />
            <TextInput placeholder="Confirm Password" style={styles.input} secureTextEntry={true} />

            <ButtonBig style={styles.buttonSInscrire} text="S'inscrire" />
          </SafeAreaView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 70,
    marginBottom: 30,
    fontFamily: 'LilitaOne-Regular',
    color: "white",
    textShadowColor: 'black',
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 3,
  },
  bodyText: {
    fontSize: 23,
    fontFamily: 'LilitaOne-Regular',
    marginBottom: 30,
    color: '#E94C65',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  input: {
    fontSize: 16,
    fontFamily: 'LilitaOne-Regular',
    marginBottom: 30,
    borderWidth: 2,
    width: '100%',
    height: 50,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'rgb(247, 240, 240)',
  },
  dateText: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'LilitaOne-Regular',
  },
  placeholderText: {
    fontSize: 16,
    color: 'rgba(186, 182, 182, 0.75)',
    fontFamily: 'LilitaOne-Regular',
  },
  buttonSInscrire: {
    backgroundColor: '#00CC99',
  },
});