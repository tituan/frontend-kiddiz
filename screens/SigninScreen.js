import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Définition du schéma de validation avec yup
const schema = yup.object().shape({
  email: yup
    .string()
    .email('Adresse email invalide')
    .required('Email est requis'),
  password: yup
    .string()
    .min(5, 'Le mot de passe doit contenir au moins 5 caractères')
    .required('Mot de passe est requis'),
});

const SignInScreen = ({navigation}) => {

  const handlePost = async (values) => {
    try {
      // Envoyer la requête POST avec fetch
      const response = await fetch('http://192.168.100.209:3000/users/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      // Convertir la réponse en JSON
      const data = await response.json();

      // Vérifier si la requête a réussi
      if (data.result) {
        console.log('Données envoyées avec succès :', data);
      } else {
        console.log("Une erreur s'est produite lors de l'envoi du formulaire.");
      }
      
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire :', error);
    }
    
  }

  // Initialisation du hook useForm avec la résolution du schéma yup
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Fonction appelée lors de la soumission du formulaire
  const onSubmit = data => {
    console.log(data);
    handlePost(data);
    // Vous pouvez ici appeler votre API pour la connexion, etc.
  };

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <Controller
        control={control}
        name="email"
        defaultValue=""
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Entrez votre email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}

      <Text>Mot de passe</Text>
      <Controller
        control={control}
        name="password"
        defaultValue=""
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Entrez votre mot de passe"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}
      <Button title="Se connecter" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SignInScreen;
