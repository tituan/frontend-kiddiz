import React from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import HeaderNavigation from './components/HeaderNavigation'; 
import ButtonBig from './components/ButtonBig';



const schema = yup.object().shape({
  firstname: yup.string().required('Le prénom est requis'),
  lastname: yup.string().required('Le nom est requis'),
  address1: yup.string().required('L’adresse est requise'),
  address2: yup.string().optional(),
  postalCode: yup.string().matches(/^\d{4}$/, 'Le code postal doit contenir 4 chiffres').required('Le code postal est requis'),
  city: yup.string().required('La ville est requise'),
});

export default function InvoiceScreen({ navigation, route }) {
  const { article } = route.params;
  const user = useSelector(state => state.user.value);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstname: user.firstname,
      lastname: user.lastname,
      address1: '',
      address2: '',
      postalCode: '',
      city: '',
    },
  });

  const onSubmit = async (data) => {
    const requestData = { 
        ...data, 
        articleId: article.id, 
        seller: article.user 
    };

    try {
        const response = await fetch('https://api.ton-backend.com/achat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Réponse du serveur:', responseData);

        // Ici tu peux gérer la navigation après la confirmation de l'achat
        // navigation.navigate('ConfirmationScreen', { orderData: responseData });

    } catch (error) {
        console.error('Erreur lors de l\'envoi des données:', error);
    }
};


  return (
    <View style={styles.container}>
      <LinearGradient
            colors={['rgba(34,193,195,1)', 'rgba(253,187,45,1)']} // Couleurs du dégradé
            start={{ x: 0, y: 1 }} // Point de départ du dégradé (0,1 = bas)
            end={{ x: 0, y: 0 }} // Point d'arrivée du dégradé (0,0 = haut)
            style={styles.header}
        >
            <HeaderNavigation onPress={() => navigation.navigate("Connection")}/>  
        </LinearGradient> 

      <View style={styles.articleContainer}>
        <Image source={{ uri: article.pictures[0] }} style={styles.articleImage} />
        <View style={styles.articleInfo}>
          <Text style={styles.articleTitle}>{article.title}</Text>
          <Text style={styles.articlePrice}>{article.price}€</Text>
        </View>
      </View>

      <View style={styles.formContainer}>
        {['firstname', 'lastname', 'address1', 'address2', 'postalCode', 'city'].map((field, index) => (
          <View key={index}>
            <Controller
              control={control}
              name={field}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType={field === 'postalCode' ? 'numeric' : 'default'}
                />
              )}
            />
            {errors[field] && <Text style={styles.errorText}>{errors[field].message}</Text>}
          </View>
        ))}
        <ButtonBig 
                        style={styles.buttonSendForm} 
                        text="Acheter l'article" 
                        onPress={handleSubmit(onSubmit)} 
                        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonSendForm: {
    backgroundColor: '#00CC99',
    marginBottom: 0,
    color: '#000000',
},
  articleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  articleImage: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
  articleInfo: {
    flex: 1,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  articlePrice: {
    fontSize: 16,
    color: '#E94C65',
  },
  formContainer: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
