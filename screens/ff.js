import React, { useEffect, useState, useRef } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import ButtonBig from './components/ButtonBig';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import RadioButton from './components/RadioButton'; 
import { useFocusEffect } from '@react-navigation/native';

 // Env variable for BACKEND
 const urlBackend = process.env.EXPO_PUBLIC_API_URL;

const AddArticlesScreen = ({ navigation }) => {
  const scrollViewRef = useRef(null);
  useFocusEffect(
      React.useCallback(() => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }
      }, [])
    );

  const user = useSelector(state => state.user.value);
  const userToken = user.token;

  const schema = yup.object().shape({
    //   title: yup.string()
    //     .max(40, 'Le titre ne doit pas dépasser 40 caractères')
    //     .required('Le titre est requis'),
    //   productDescription: yup.string()
    //     .max(250, 'La description ne doit pas dépasser 250 caractères')
    //     .required('La description est requise'),
    //   category: yup.string()
    //     .required('Sélectionnez une catégorie'),
    //   itemType: yup.string()
    //     .required('Sélectionnez un type'),
    //   condition: yup.string()
    //     .required('Sélectionnez un état'),
    //   price: yup.number()
    //     .positive('Le prix doit être un nombre positif')
    //     .required('Le prix est requis'),
    //   pictures: yup.string()
    //     .required('Une photo est requise'),
      iban: yup.string().when([], {
        is: () => !user.iban || user.iban.trim() === '',
        then: (schema) => schema.required('L’IBAN est requis')
          .matches(/^([A-Z]{2}\d{2}[A-Z0-9]{11,30})$/, 'Format IBAN invalide'),
        otherwise: (schema) => schema.optional(),
      }),
  });

  const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log("Form submitted", data);
  };

  return (
    <LinearGradient
      colors={['#22c1c3', '#fdba2d']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={styles.containerLinear}
    >
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={styles.container}>
          <ScrollView ref={scrollViewRef} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.title}>Vendez votre article !</Text>
            {!user.iban && (
      <View style={styles.ibanContainer}>
        <Text style={styles.labelCategorie}>IBAN :</Text>
        <Controller
          control={control}
          name="iban"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Votre IBAN"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.iban && <Text style={styles.errorText}>{errors.iban.message}</Text>}
      </View>
    )}
            <ButtonBig text="Publier l'article" style={styles.submitButton} onPress={handleSubmit(onSubmit)} />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
    containerLinear: {
        flex: 1,
    },
    contentContainer: {
        padding: 20,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        paddingTop: 60,
        marginBottom: 40,
        color: 'white',
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
        height: 50,
    },
    labelCategorie: {
        fontSize: 22,
        marginBottom: 5,
        marginTop: 10,
    },
    errorText: {
        color: '#ff4d4d',
        fontSize: 14,
        marginBottom: 10,
    },
    submitButton: {
        backgroundColor: '#00CC99',
        marginTop: 20,
    },
});

export default AddArticlesScreen;
