import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ButtonBig from './components/ButtonBig';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { useDispatch } from 'react-redux';
import { signUpUser } from '../reducers/users';
import ButtonIcon from './components/ButtonIcon';

// Env variable for BACKEND
const urlBackend = process.env.EXPO_PUBLIC_API_URL;

// Schéma de validation avec yup
const schema = yup.object().shape({
  firstname: yup.string().required('Prénom requis'),
  lastname: yup.string().required('Nom requis'),
  email: yup.string().email('Email invalide').required('Email requis'),
  dateOfBirth: yup
    .date()
    .typeError('Date de naissance invalide')
    .required('Date de naissance requise')
    .max(new Date(), 'La date de naissance ne peut pas être dans le futur'),
  password: yup.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères').required('Mot de passe requis'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Les mots de passe ne correspondent pas').required('Confirmation du mot de passe requise'),
  conditionUtilisation: yup.bool().oneOf([true], 'Vous devez accepter les conditions d\'utilisation'),
  publicy: yup.bool().oneOf([true], 'Vous devez accepter les conditions de confidentialité'),
});

// Composant personnalisé pour la case à cocher
const CustomCheckBox = ({ label, value, onChange }) => {
  return (
    <TouchableOpacity onPress={() => onChange(!value)} style={styles.checkboxContainer}>
      <Icon
        name={value ? 'check-box' : 'check-box-outline-blank'}
        size={24}
        color={value ? 'white' : '#000'}
      />
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

export default function SignUpScreen({ navigation }) {

  const dispatch = useDispatch();
  const [showDatePicker, setShowDatePicker] = useState(false); // État pour afficher/masquer le DatePicker

  // Chargement de la police
  const [loaded, error] = useFonts({
    'LilitaOne-Regular': require('../assets/fonts/LilitaOne-Regular.ttf'),
    'RopaSans-Regular': require('../assets/fonts/RopaSans-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  // Initialisation de react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      dateOfBirth: null,
      password: '',
      confirmPassword: '',
      conditionUtilisation: false,
      publicy: false,
    },
  });

  // Fonction pour envoyer les données au serveur
  const handleSignUp = async (values) => {
    try {
      // Convertir la date de naissance en format ISO
      const formattedValues = {
        ...values,
        dateOfBirth: values.dateOfBirth ? new Date(values.dateOfBirth).toISOString() : null,
      };

      console.log(values.dateOfBirth);

      const response = await fetch(`${urlBackend}users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (data.result) {
        console.log('Utilisateur inscrit avec succès :', data);
        dispatch(signUpUser({
          firstname: data.userResponse.firstname,
          lastname: data.userResponse.lastname,
          email: data.userResponse.email,
          dateOfBirth: data.userResponse.dateOfBirth,
          token: data.userResponse.token,
          status: data.userResponse.status,
        }));
        Alert.alert("Bienvenue sur Kiddiz");
        // redirection vers la home
        navigation.navigate('Home');
      } else {
        console.log('Une erreur s\'est produite lors de l\'inscription :', data.error);
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
    }
  };

  const onSubmit = (data) => {
    handleSignUp(data);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        colors={['#22c1c3', '#fdba2d']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.container}
      >
        <ButtonIcon style={styles.buttonBack}  name="arrow-left"  onPress={() => navigation.navigate('Connection')}/>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <SafeAreaView style={styles.innerContainer}>
            <Text style={styles.title}>Kiddiz</Text>

            {/* Champ Prénom */}
            <Controller
              control={control}
              name="firstname"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <TextInput
                    placeholder="Prénom"
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                  {errors.firstname && <Text style={styles.errorText}>{errors.firstname.message}</Text>}
                </>
              )}
            />

            {/* Champ Nom */}
            <Controller
              control={control}
              name="lastname"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <TextInput
                    placeholder="Nom"
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                  {errors.lastname && <Text style={styles.errorText}>{errors.lastname.message}</Text>}
                </>
              )}
            />

            {/* Champ Email */}
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

            {/* Champ Date de naissance */}
            <Controller
              control={control}
              name="dateOfBirth"
              render={({ field: { onChange, value } }) => (
                <>
                  <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
                    <Text style={[value ? styles.dateText : styles.placeholderText, { fontFamily: 'RopaSans-Regular' }, { opacity: 0.7 }]}>
                      {value ? new Date(value).toLocaleDateString() : 'Date de naissance'}
                    </Text>
                  </TouchableOpacity>
                  {errors.dateOfBirth && <Text style={styles.errorText}>{errors.dateOfBirth.message}</Text>}
                  {showDatePicker && (
                    <DateTimePicker
                      value={value ? new Date(value) : new Date()}
                      mode="date"
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      onChange={(event, selectedDate) => {
                        setShowDatePicker(false); // Masquer le DatePicker après la sélection
                        if (selectedDate) {
                          onChange(selectedDate); // Mettre à jour la valeur dans react-hook-form
                        }
                      }}
                    />
                  )}
                </>
              )}
            />

            {/* Champ Mot de passe */}
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <TextInput
                    placeholder="Mot de passe"
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry
                  />
                  {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
                </>
              )}
            />

            {/* Champ Confirmation du mot de passe */}
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <TextInput
                    placeholder="Confirmer le mot de passe"
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry
                  />
                  {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}
                </>
              )}
            />

            {/* Case à cocher pour les conditions d'utilisation */}
            <Controller
              control={control}
              name="conditionUtilisation"
              render={({ field: { onChange, value } }) => (
                <CustomCheckBox
                  label="J’accepte les conditions d’utilisation"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            {errors.conditionUtilisation && <Text style={styles.errorText}>{errors.conditionUtilisation.message}</Text>}

            {/* Case à cocher pour les conditions de confidentialité */}
            <Controller
              control={control}
              name="publicy"
              render={({ field: { onChange, value } }) => (
                <CustomCheckBox
                  label="J’accepte les conditions de confidentialité"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            {errors.publicy && <Text style={styles.errorText}>{errors.publicy.message}</Text>}

            {/* Bouton d'inscription */}
            <ButtonBig style={styles.buttonSignUp} text="S'inscrire" onPress={handleSubmit(onSubmit)} />
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
    
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop:100,
  },
  
  buttonBack: {
    position: 'absolute',
    top: '7%', 
    left: '5%',
    backgroundColor: '#F095B4',
    
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
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,

  },
  checkboxLabel: {
    fontSize: 14,
    marginLeft: 10,
    fontFamily: 'RopaSans-Regular',
  },
  buttonSignUp: {
    backgroundColor: '#00CC99',
  
  },
  dateText: {
    fontSize: 16,
    color: '#000',
  },
  placeholderText: {
    fontSize: 16,
    color: '#888',
  },
});
