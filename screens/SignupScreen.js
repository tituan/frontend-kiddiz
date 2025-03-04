import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ButtonBig from './components/ButtonBig';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Remplacez CheckBox par une icône
import { useDispatch } from 'react-redux';
import { signUpUser } from '../reducers/users';

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
        color={value ? '#22c1c3' : '#000'}
      />
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

export default function SignUpScreen({ navigation }) {
   const dispatch = useDispatch();

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

  // Initialisation de react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors },
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

      console.log(values.dateOfBirth)

      const response = await fetch('http://192.168.100.209:3000/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedValues),
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
          status: data.userResponse.status
        }));
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
                  <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.input}>
                    <Text style={value ? styles.dateText : styles.placeholderText}>
                      {value ? new Date(value).toLocaleDateString() : 'Date de naissance'}
                    </Text>
                  </TouchableOpacity>
                  {errors.dateOfBirth && <Text style={styles.errorText}>{errors.dateOfBirth.message}</Text>}
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
  input: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
    fontFamily: 'LilitaOne-Regular',
    height: 50,
  },
  errorText: {
    color: '#ff4d4d',
    fontSize: 14,
    marginBottom: 10,
    fontFamily: 'LilitaOne-Regular',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkboxLabel: {
    fontSize: 14,
    marginLeft: 10,
    fontFamily: 'LilitaOne-Regular',
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
