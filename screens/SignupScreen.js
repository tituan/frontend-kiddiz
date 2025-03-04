import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonBig from './components/ButtonBig';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

// Importation de react-hook-form et yup
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Schéma de validation avec yup
const schema = yup.object().shape({
  firstName: yup.string().required('Prénom requis'),
  lastName: yup.string().required('Nom requis'),
  email: yup.string().email('Email invalide').required('Email requis'),
  birthday: yup
    .date()
    .nullable()
    .required('Date de naissance requise'),
  password: yup.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères').required('Mot de passe requis'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Les mots de passe ne correspondent pas')
    .required('Confirmation du mot de passe requise'),
});

export default function ConnectionScreen({ navigation }) {
  const title = 'Kiddiz';
  // État pour gérer l'affichage du DateTimePicker
  const [showPicker, setShowPicker] = useState(false);

  // Chargement de la police
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
  

  // Initialisation de react-hook-form avec yupResolver
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      birthday: null, // On initialise à null pour forcer la sélection
      password: '',
      confirmPassword: '',
    },
  });

  // Fonction de soumission du formulaire
  const onSubmit = (data) => {
    handleSignUp(data);
  };

  const handleSignup = async (values) => {
    try {

      const response = await fetch('http://192.168.100.209:3000/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
  
      const data = await response.json();
      
      if (data.result) {
        console.log('Utilisateur inscrit avec succès :', data);
      } else {
        console.log("Une erreur s'est produite lors de l'inscription.");
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
    }
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
            

            {/* First Name */}
            <Controller
              control={control}
              name="firstName"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <TextInput
                    placeholder="First Name"
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                  {errors.firstName && <Text style={styles.errorText}>{errors.firstName.message}</Text>}
                </>
              )}
            />

            {/* Last Name */}
            <Controller
              control={control}
              name="lastName"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <TextInput
                    placeholder="Last Name"
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                  {errors.lastName && <Text style={styles.errorText}>{errors.lastName.message}</Text>}
                </>
              )}
            />

            {/* Email */}
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <TextInput
                    placeholder="Email"
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
                </>
              )}
            />

            {/* Birthday */}
            <Controller
              control={control}
              name="birthday"
              render={({ field: { onChange, value } }) => (
                <>
                  <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.input}>
                    <Text style={value ? styles.dateText : styles.placeholderText}>
                      {value ? new Date(value).toLocaleDateString() : 'Birthday'}
                    </Text>
                  </TouchableOpacity>
                  {errors.birthday && <Text style={styles.errorText}>{errors.birthday.message}</Text>}
                  {showPicker && (
                    <DateTimePicker
                      value={value ? new Date(value) : new Date()}
                      mode="date"
                      display="spinner"
                      onChange={(event, selectedDate) => {
                        onChange(selectedDate || value);
                        setShowPicker(false);
                      }}
                    />
                  )}
                </>
              )}
            />

            {/* Password */}
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <TextInput
                    placeholder="Password"
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry={true}
                  />
                  {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
                </>
              )}
            />

            {/* Confirm Password */}
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <TextInput
                    placeholder="Confirm Password"
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry={true}
                  />
                  {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}
                </>
              )}
            />

            {/* Bouton d'inscription */}
            {/* Pour tester, vous pouvez aussi remplacer ButtonBig par le composant Button de react-native */}
         
              <ButtonBig style={styles.buttonSInscrire} text="S'inscrire" onPress={handleSubmit(onSubmit)} onPress={() => navigation.navigate('Home')}/>
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
    fontSize: 40,
    marginTop: -90,
    marginBottom: 30,
    fontFamily: 'LilitaOne-Regular',
    color: "white",
    textShadowColor: 'black',
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 3,
  },
  // bodyText: {
  //   fontSize: 23,
  //   fontFamily: 'LilitaOne-Regular',
  //   marginBottom: 30,
  //   color: '#E94C65',
  //   textShadowColor: 'black',
  //   textShadowOffset: { width: 2, height: 2 },
  //   textShadowRadius: 1,
  // },
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
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: -20,
    marginBottom: 20,
    textAlign: 'center',
  },
});
