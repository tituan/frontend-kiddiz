import React from 'react';
import { View, Text, TextInput, Image, StyleSheet, Alert, ScrollView,KeyboardAvoidingView,Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import HeaderNavigation from './components/HeaderNavigation'; 
import ButtonBig from './components/ButtonBig';
import { useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';


const schema = yup.object().shape({
  firstname: yup.string().required('Le prénom est requis'),
  lastname: yup.string().required('Le nom est requis'),
  number: yup.string().required('Le numéro de rue est requis'),
  address1: yup.string().required('L’adresse est requise'),
  address2: yup.string().optional(),
  postalCode: yup.string().matches(/^\d{4,5}$/, 'Le code postal doit contenir 4 ou 5 chiffres').required('Le code postal est requis'),
  city: yup.string().required('La ville est requise'),
});

export default function InvoiceScreen({ navigation, route }) {

   
    const scrollViewRef = useRef(null);
        useFocusEffect(
            React.useCallback(() => {
             
              if (scrollViewRef.current) {
                scrollViewRef.current.scrollTo({ y: 0, animated: true });
              }
            }, [])
          );

  const { article } = route.params;
  console.log("CECI EST UN ARTICLE : " + JSON.stringify(article, null, 2));
  const user = useSelector(state => state.user.value);
  const urlBackend = process.env.EXPO_PUBLIC_API_URL;

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstname: user.firstname || '',
      lastname: user.lastname || '',
      number: '',
      address1: '',
      address2: '',
      postalCode: '', 
      city: '',
    },
  });

  
  const onSubmit = async (data) => {
   
    const requestBody = {
      number: data.number,  
      line1: data.address1,
      line2: data.address2,
      postalCode: data.postalCode,
      city: data.city,
      token: user.token,
      articleId: article.id
    };

    console.log("Données envoyées au backend :", requestBody); 

    try {
      const response = await fetch(`${urlBackend}articles/buy/buy/buy`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      console.log("Réponse du backend :", result);

      if (response.ok) {
        Alert.alert('Succès', 'Félicitations !!! L\'article a été acheté avec succès. Consultez votre boite mail pour le paiement.');
        navigation.goBack();
      } else {
        Alert.alert('Erreur', result.error || 'Une erreur est survenue lors de l\'achat.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi des données:', error);
      Alert.alert('Erreur', 'Problème de connexion au serveur.');
    }
    navigation.navigate('HomeScreen', { screen: 'Home' });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(34,193,195,1)', 'rgba(253,187,45,1)']}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.header}
      >
        <HeaderNavigation onPress={() => navigation.navigate("Connection")} />
      </LinearGradient>

      <View style={styles.articleContainer}>
        <Image source={{ uri: article.pictures[0] }} style={styles.articleImage} />
        <View style={styles.articleInfo}>
          <Text style={styles.articleTitle}>{article.title}</Text>
          <Text style={styles.articlePrice}>{article.price}€</Text>
          <Text>Frais de livraison: 3.99€</Text>
        </View>
      </View>
      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.contentContainer}>
      <View style={styles.formContainer}>
       
        {['firstname', 'lastname', 'number' , 'address1', 'address2', 'postalCode', 'city'].map((field, index) => (
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
        </ScrollView>
    </View>
    </KeyboardAvoidingView>
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
    width: '100%',
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
    height: 50,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
