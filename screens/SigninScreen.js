import React, { useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginUser } from '../reducers/users';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import ButtonBig from './components/ButtonBig'

// Définition du schéma de validation avec yup
const schema = yup.object().shape({
  email: yup
    .string()
    .email('Adresse email invalide')
    .required('Email est requis'),
  password: yup
    .string()
    .min(5, 'Le mot de passe doit contenir au moins 6 caractères')
    .required('Mot de passe est requis'),
});

const SignInScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [fontsLoaded] = useFonts({
    'LilitaOne-Regular': require('../assets/fonts/LilitaOne-Regular.ttf'),
    'RopaSans-Regular': require('../assets/fonts/RopaSans-Regular.ttf'),
  });

  // Masquer l'écran de chargement jusqu'à ce que la police soit prête
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Afficher un écran de chargement si les polices ne sont pas encore prêtes
  if (!fontsLoaded) {
    return null;
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Fonction pour envoyer les données au serveur
  const handlePost = async (values) => {
    try {
      const response = await fetch('http://192.168.100.209:3000/users/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (data.result) {
        console.log('Connexion réussie:', data);
        dispatch(loginUser({
          firstname: data.userData.firstname,
          lastname: data.userData.lastname,
          email: data.userData.email,
          dateOfBirth: data.userData.dateOfBirth,
          token: data.userData.token,
          status: data.userData.status
        }));
        // navigation.replace("TabNavigator");
        navigation.navigate("TabNavigator");
        // navigation.replace("TabNavigator");
        // Vous pouvez ajouter une navigation ou une autre action ici
      } else {
        console.log('Erreur de connexion:', data.message);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des données :", error);
    }
  };

  const onSubmit = (data) => {
    handlePost(data);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        colors={['#22c1c3', '#fdba2d']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.container}
      >
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.innerContainer}>
          <Text style={styles.title}>Se connecter</Text>
          <Text style={styles.description}>Veuillez entrer vos informations pour vous connecter.</Text>

          <Controller
            control={control}
            name="email"
            defaultValue=""
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Entrez votre email"
                placeholderTextColor="#999"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

          <Controller
            control={control}
            name="password"
            defaultValue=""
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Entrez votre mot de passe"
                placeholderTextColor="#999"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
              />
            )}
          />
          {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

          <ButtonBig style={styles.submitButton} text="Connectez-vous" onPress={handleSubmit(onSubmit)}/>

        </KeyboardAvoidingView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // buttonSInscrire
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
    fontFamily: 'LilitaOne-Regular',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'RopaSans-Regular',
  },
  input: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
    fontFamily: 'RopaSans-Regular',
    height: 50,
  },
  errorText: {
    color: '#ff4d4d',
    fontSize: 14,
    marginBottom: 10,
    fontFamily: 'RopaSans-Regular',
  },
  submitButton: {
    backgroundColor: '#00CC99',
  },
});

export default SignInScreen;



