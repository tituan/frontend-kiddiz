import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import ButtonBig from './components/ButtonBig';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';

const schema = yup.object().shape({
  title: yup.string().max(40, 'Le titre ne doit pas dépasser 40 caractères').required('Le titre est requis'),
  productDescription: yup.string().max(250, 'La description ne doit pas dépasser 250 caractères').required('La description est requise'),
  category: yup.array().min(1, 'Sélectionnez au moins une catégorie'),
  itemType: yup.array().min(1, 'Sélectionnez au moins un type'),
  condition: yup.array().min(1, 'Sélectionnez au moins un état'),
  price: yup.number().positive('Le prix doit être un nombre positif').required('Le prix est requis'),
  pictures: yup.string().required('Une photo est requise'),
});

// const userId = '67c70f09d7eb098b650dece3';
const categories = ['0-1 an', '1-3 ans', '3-6 ans', '6-12 ans'];
const types = ['Puériculture', 'Loisir', 'Jouet'];
const conditions = ['Très bon état', 'Bon état', 'État moyen', 'Neuf'];

const AddArticlesScreen = ({ navigation }) => {

const userToken = useSelector(state => state.user.value.token);
console.log(userToken)
  const { control, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const [image, setImage] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState('');
  const [selectedTypes, setSelectedTypes] = useState('');
  const [selectedConditions, setSelectedConditions] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission refusée', 'Vous devez autoriser l\'accès à la galerie.');
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setValue('pictures', result.assets[0].uri); // Mettre à jour le champ "pictures"
    }
  };

  const toggleSelection = (value, list, setList, fieldName) => {
    const newSelection = list.includes(value)
      ? list.filter(item => item !== value)
      : [...list, value];
    setList(newSelection);
    setValue(fieldName, newSelection);
  };

  const onSubmit = async (data) => {
    try {
      // Créer un objet FormData
      const formData = new FormData();
      // Ajouter les champs du formulaire
      formData.append('title', data.title);
      formData.append('productDescription', data.productDescription);
      formData.append('category', data.category); // Convertir en JSON si le backend attend un tableau
      formData.append('itemType', data.itemType); // Convertir en JSON si le backend attend un tableau
      formData.append('condition', data.condition); // Convertir en JSON si le backend attend un tableau
      formData.append('price', data.price.toString()); // Convertir en chaîne si nécessaire
      formData.append('articleCreationDate', new Date().toISOString());
        formData.append('token', userToken)
      // Ajouter l'image
      if (image) {
        const fileExtension = image.split('.').pop(); // Extraire l'extension du fichier
        const fileName = `photo.${fileExtension}`; // Nom du fichier

        formData.append('pictures', {
          uri: image,
          name: fileName,
          type: `image/${fileExtension}`,
        });
      }

      // Envoyer les données au backend
      const response = await fetch('http://192.168.100.209:3000/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data', // Utiliser multipart/form-data pour les fichiers
        },
        body: formData,
      });

      const result = await response.json();
      console.log(result)

      if (response.ok) {
        Alert.alert('Succès', 'L\'article a été publié avec succès.');
        navigation.goBack();
      } else {
        Alert.alert('Erreur', result.error || 'Une erreur est survenue lors de la publication de l\'article.');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de la publication de l\'article.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Mettre en ligne un article</Text>

        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Text style={styles.imagePickerText}>Sélectionner une photo</Text>
          )}
        </TouchableOpacity>
        {errors.pictures && <Text style={styles.errorText}>{errors.pictures.message}</Text>}

        <Controller
          control={control}
          name="title"
          defaultValue=""
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Titre de l'article (max 40 caractères)"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              maxLength={40}
            />
          )}
        />
        {errors.title && <Text style={styles.errorText}>{errors.title.message}</Text>}

        <Controller
          control={control}
          name="productDescription"
          defaultValue=""
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Description de l'article (max 250 caractères)"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              maxLength={250}
            />
          )}
        />
        {errors.productDescription && <Text style={styles.errorText}>{errors.productDescription.message}</Text>}

        <Text>Tranche d'âge :</Text>
        {categories.map(cat => (
          <TouchableOpacity key={cat} onPress={() => toggleSelection(cat, selectedCategories, setSelectedCategories, 'category')}>
            <Text>{selectedCategories.includes(cat) ? '☑' : '☐'} {cat}</Text>
          </TouchableOpacity>
        ))}
        {errors.category && <Text style={styles.errorText}>{errors.category.message}</Text>}

        <Text>Type :</Text>
        {types.map(type => (
          <TouchableOpacity key={type} onPress={() => toggleSelection(type, selectedTypes, setSelectedTypes, 'itemType')}>
            <Text>{selectedTypes.includes(type) ? '☑' : '☐'} {type}</Text>
          </TouchableOpacity>
        ))}
        {errors.itemType && <Text style={styles.errorText}>{errors.itemType.message}</Text>}

        <Text>État de l'article :</Text>
        {conditions.map(cond => (
          <TouchableOpacity key={cond} onPress={() => toggleSelection(cond, selectedConditions, setSelectedConditions, 'condition')}>
            <Text>{selectedConditions.includes(cond) ? '☑' : '☐'} {cond}</Text>
          </TouchableOpacity>
        ))}
        {errors.condition && <Text style={styles.errorText}>{errors.condition.message}</Text>}

        <Controller
          control={control}
          name="price"
          defaultValue=""
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Prix"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="numeric"
            />
          )}
        />
        {errors.price && <Text style={styles.errorText}>{errors.price.message}</Text>}

        <ButtonBig text="Publier l'article" style={styles.submitButton} onPress={handleSubmit(onSubmit)} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingTop: 30,
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
  imagePicker: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginVertical: 10,
  },
  imagePickerText: {
    fontSize: 16,
    color: '#999',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  errorText: {
    color: '#ff4d4d',
    fontSize: 14,
    marginBottom: 10,
    fontFamily: 'RopaSans-Regular',
  },
  submitButton: {
    backgroundColor: '#00CC99',
    marginTop: 20,
  },
});

export default AddArticlesScreen;