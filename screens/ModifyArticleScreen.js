import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import ButtonBig from './components/ButtonBig';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import RadioButton from './components/RadioButton';
import { useRoute } from '@react-navigation/native';

const urlBackend = process.env.EXPO_PUBLIC_API_URL;

const schema = yup.object().shape({
  title: yup.string().max(40, 'Le titre ne doit pas dépasser 40 caractères').required('Le titre est requis'),
  productDescription: yup.string().max(250, 'La description ne doit pas dépasser 250 caractères').required('La description est requise'),
  category: yup.string().required('Sélectionnez une catégorie'),
  itemType: yup.string().required('Sélectionnez un type'),
  condition: yup.string().required('Sélectionnez un état'),
  price: yup.number().positive('Le prix doit être un nombre positif').required('Le prix est requis'),
  pictures: yup.string().required('Une photo est requise'),
});

const categories = ['0-1 an', '1-3 ans', '3-6 ans', '6-12 ans'];
const types = ['Puériculture', 'Loisir', 'Jouet'];
const conditions = ['Très bon état', 'Bon état', 'État moyen', 'Neuf'];

const ModifyArticleScreen = ({ navigation }) => {
  const route = useRoute();
  const { articleId } = route.params
  const userToken = useSelector(state => state.user.value.token);

  const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [image, setImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [article, setArticle] = useState(null);

  // BOUTON RETURN TEMPORAIRE
  const handleGoBack = () => {
    navigation.goBack(); // Retourne à l'écran précédent
  };
  // FIN PARTIE BOUTOU RETOUR TEMPORAIRE

  useEffect(() => {

    const fetchArticle = async () => {

      try {
        const response = await fetch(`${urlBackend}articles/get-by/id/${articleId}`);
        const data = await response.json();

        if (response.ok) {

          setArticle(data);

          setValue('title', data.article.title); // setValue est une fonction fournie par la bibliothèque React Hook Form : (nomDuChamp, nouvelleValeur)
          setValue('productDescription', data.article.productDescription); // Pré-remplir le champ "productDescription"
          setValue('category', data.article.category);
          setValue('itemType', data.article.itemType);
          setValue('condition', data.article.condition);
          setValue('price', data.article.price.toString());
          setImage(data.article.pictures[0]);
          setValue('pictures', data.article.pictures[0]);

          // Mettre à jour les états locaux pour les boutons radio
          setSelectedCategory(data.article.category);
          setSelectedType(data.article.itemType);
          setSelectedCondition(data.article.condition);

        } else {
          Alert.alert('Erreur', 'Impossible de récupérer l\'article.');
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (articleId) {
      fetchArticle();
    }
  }, [articleId]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setValue('pictures', result.assets[0].uri);
    }
  };

  const handleRadioSelection = (value, setSelected, fieldName) => {
    setSelected(value);
    setValue(fieldName, value);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('token', userToken);
      formData.append('title', data.title);
      formData.append('productDescription', data.productDescription);
      formData.append('category', data.category);
      formData.append('itemType', data.itemType);
      formData.append('condition', data.condition);
      formData.append('price', data.price.toString());

      if (image && image !== data.pictures[0]) {
        const fileExtension = image.split('.').pop();
        const fileName = `photo.${fileExtension}`;
        formData.append('pictures', {
          uri: image,
          name: fileName,
          type: `image/${fileExtension}`,
        });
      }

      const response = await fetch(`${urlBackend}articles/${articleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Succès', 'L\'article a été modifié avec succès.');
        navigation.goBack();
      } else {
        Alert.alert('Erreur', result.error || 'Une erreur est survenue lors de la modification de l\'article.');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de la modification de l\'article.');
      console.error(error);
    }
  };

  if (!article && articleId) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Article non trouvé</Text>
        <TouchableOpacity onPress={handleGoBack}><Text>Retour</Text></TouchableOpacity>
      </View>
    );
  }

  // fonction de suppression de l'article (met availableStock à 0)
  const handleDelete = async () => {
    try {
      const response = await fetch(`${urlBackend}articles/stock/${articleId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: userToken }),
      });

      const data = await response.json();

      if (!data.result) {
        Alert.alert("Erreur", data.error || "Impossible de supprimer l'article.");
        return;
      }
  
      Alert.alert("Succès", "L'article a bien été supprimé !");
      navigation.goBack();

    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      Alert.alert("Erreur", "Une erreur s'est produite.");
    }
  };

  // Modale de confirmation de suppression qui lancera handleDelete si l'utilisateur clique sur "oui"
  const confirmDelete = () => {
    Alert.alert(
      "Confirmation", 
      "Êtes-vous sûr de vouloir supprimer votre article ?", 
      [
        {
          text: "Non",
          style: "cancel", // Ferme l'alerte sans rien faire
        },
        {
          text: "Oui",
          onPress: () => handleDelete(), // Lance la suppression si l'utilisateur confirme
        },
      ]
    );
  };

  return (
      <LinearGradient
        colors={['#22c1c3', '#fdba2d']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.containerLinear}
      >
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <Text style={styles.title}>Modifiez votre article !</Text>
            <TouchableOpacity onPress={handleGoBack}><Text>Retour</Text></TouchableOpacity>

            <Text style={styles.labelCategorie}>Ajouter votre photo :</Text>
            <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
              {image ? (
                <Image source={{ uri: image }} style={styles.image} />
              ) : (
                <Text style={styles.imagePickerText}>Sélectionner une photo</Text>
              )}
            </TouchableOpacity>
            {errors.pictures && <Text style={styles.errorText}>{errors.pictures.message}</Text>}

            <Text style={styles.labelCategorie}>Titre de l'article :</Text>
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

            <Text style={styles.labelCategorie}>Description :</Text>
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

            <Text style={styles.labelCategorie}>Tranche d'âge :</Text>
            {categories.map(cat => (
              <RadioButton
                key={cat}
                label={cat}
                selected={selectedCategory === cat}
                onPress={() => handleRadioSelection(cat, setSelectedCategory, 'category')}
              />
            ))}
            {errors.category && <Text style={styles.errorText}>{errors.category.message}</Text>}

            <Text style={styles.labelCategorie}>Type :</Text>
            {types.map(type => (
              <RadioButton
                key={type}
                label={type}
                selected={selectedType === type}
                onPress={() => handleRadioSelection(type, setSelectedType, 'itemType')}
              />
            ))}
            {errors.itemType && <Text style={styles.errorText}>{errors.itemType.message}</Text>}

            <Text style={styles.labelCategorie}>État de l'article :</Text>
            {conditions.map(cond => (
              <RadioButton
                key={cond}
                label={cond}
                selected={selectedCondition === cond}
                onPress={() => handleRadioSelection(cond, setSelectedCondition, 'condition')}
              />
            ))}
            {errors.condition && <Text style={styles.errorText}>{errors.condition.message}</Text>}

            <Text style={styles.labelCategorie}>Prix de l'article :</Text>
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

            <ButtonBig text="Modifier l'article" style={styles.submitButton} onPress={handleSubmit(onSubmit)} />
            <ButtonBig text="Supprimer l'article" style={styles.deleteButton} onPress={confirmDelete} />
          </ScrollView>
        </View>
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
    labelCategorie: {
      fontSize: 22,
      fontFamily: 'LilitaOne-Regular',
      marginBottom: 5,
      marginTop: 10,
    },
    imagePicker: {
      width: '100%',
      height: 300,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 8,
      backgroundColor: 'white',
      marginVertical: 10,
    },
    imagePickerText: {
      fontSize: 22,
      color: '#00000',
      fontFamily: 'RopaSans-Regular',
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
    deleteButton: {
      backgroundColor: 'red',
      marginTop: 20,
    }
  });

  export default ModifyArticleScreen;