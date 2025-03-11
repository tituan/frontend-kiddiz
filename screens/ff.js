import React, { useEffect, useState, useRef } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import ButtonBig from './components/ButtonBig';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector , useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import RadioButton from './components/RadioButton'; 
import { useFocusEffect } from '@react-navigation/native';
import {loginUser} from '../reducers/users'

 // Env variable for BACKEND
 const urlBackend = process.env.EXPO_PUBLIC_API_URL;
//  const dispatch= useDispatch()

      const schema = yup.object().shape({
        title: yup
          .string()
          .max(40, 'Le titre ne doit pas dépasser 40 caractères')
          .required('Le titre est requis'),
        productDescription: yup
          .string()
          .max(250, 'La description ne doit pas dépasser 250 caractères')
          .required('La description est requise'),
        category: yup
          .string()
          .required('Sélectionnez une catégorie'), // Une seule catégorie sélectionnée
        itemType: yup
          .string()
          .required('Sélectionnez un type'), // Un seul type sélectionné
        condition: yup
          .string()
          .required('Sélectionnez un état'), // Un seul état sélectionné
        price: yup
          .number()
          .positive('Le prix doit être un nombre positif')
          .required('Le prix est requis'),
        pictures: yup
          .string()
          .required('Une photo est requise'),
        iban: yup
          .string()
          .matches(/^[A-Z0-9]{15,34}$/, `L'IBAN doit contenir uniquement des lettres majuscules et des chiffres, avec une longueur comprise entre 15 et 34 caractères`)
          .required(`L'IBAN est requis`),
      })

// const userId = '67c70f09d7eb098b650dece3';
const categories = ['0-1 an', '1-3 ans', '3-6 ans', '6-12 ans'];
const types = ['Puériculture', 'Loisir', 'Jouet'];
const conditions = ['Très bon état', 'Bon état', 'État moyen', 'Neuf'];

const AddArticlesScreen = ({ navigation }) => {

  // action de refresh scrollView (useFocusEffect,useRef,ref={scrollViewRef})
  const scrollViewRef = useRef(null);
      useFocusEffect(
          React.useCallback(() => {
           
            if (scrollViewRef.current) {
              scrollViewRef.current.scrollTo({ y: 0, animated: true });
            }
          }, [])
        );

const userToken = useSelector(state => state.user.value.token);
const userIban = useSelector(state => state.user.value.iban);
console.log("iban du user", userIban)
console.log(userToken)

const { control, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
  resolver: yupResolver(schema),
  defaultValues: { iban: userIban || "" }, // ✅ Assurer que l'IBAN est bien initialisé
});

const ibanValue = watch("iban"); // 👀 Suivre la valeur en temps réel
console.log("Valeur actuelle de l'IBAN :", ibanValue);

  const [image, setImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedCondition, setSelectedCondition] = useState(null);
 const dispatch = useDispatch()




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

  const handleRadioSelection = (value, setSelected, fieldName) => {
    setSelected(value); // Mettre à jour l'élément sélectionné
    setValue(fieldName, value); // Mettre à jour la valeur dans react-hook-form
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
        formData.append('iban', data.iban)
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
      
      console.log("Redux mis à jour avec l'IBAN :", data.iban);
      // Envoyer les données au backend
    const response = await fetch(`${urlBackend}articles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data', // Utiliser multipart/form-data pour les fichiers
        },
        body: formData,
      });

      const result = await response.json();
      dispatch(loginUser({ iban: data.iban }));
      // console.log(result)
      if (response.ok) {
        Alert.alert('Succès', 'L\'article a été publié avec succès.');
        reset(); // Réinitialiser tous les champs du formulaire
        setImage(null); // Réinitialiser l'image
        setSelectedCategory(null); // Réinitialiser la catégorie sélectionnée
        setSelectedType(null); // Réinitialiser le type sélectionné
        setSelectedCondition(null); // Réinitialiser l'état sélectionné
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

        {/* Tranche d'âge */}
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

        {/* Type */}
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

        {/* État de l'article */}
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

        {!userIban && (
      <View style={styles.ibanContainer}>
        <Text style={styles.labelCategorie}>IBAN :</Text>
        <Controller
  control={control}
  name="iban"
  defaultValue=""
  render={({ field: { onChange, onBlur, value } }) => (
    <TextInput
      style={styles.input}
      placeholder="Votre IBAN"
      onBlur={onBlur}
      onChangeText={(text) => {
        console.log("IBAN saisi :", text); // ✅ Vérifier si l'IBAN est bien mis à jour
        onChange(text);
      }}
      value={value || ""}
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
});

export default AddArticlesScreen;







const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const User = require("../models/User");
const Article = require("../models/Article");

router.put("/buy/buy/buy", async (req, res) => {
    try {
        // Vérifier que tous les champs requis sont présents
        if (!checkBody(req.body, ["number", "line1", "postalCode", "city", "token", "articleId"])) {
            return res.status(400).json({ result: false, error: "Missing or empty fields" });
        }

        const { number, line1, line2, postalCode, city, token, articleId } = req.body;

        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ token: token });
        if (!user) {
            return res.status(404).json({ result: false, error: "User not found" });
        }

        // Vérifier si l'article existe et récupérer le vendeur avec ses informations
        const article = await Article.findById(articleId).populate("user", "firstname lastname email iban");
        if (!article) {
            return res.status(404).json({ result: false, error: "Article not found" });
        }

        const seller = article.user; // Le vendeur
        if (!seller) {
            return res.status(404).json({ result: false, error: "Seller not found" });
        }

        // Vérifier si l'article est toujours en stock
        if (article.availableStock === 0) {
            return res.status(400).json({ result: false, error: "Article out of stock" });
        }

        // ✅ Mettre à jour l'adresse de l'acheteur
        user.address = {
            number,
            line1,
            line2: line2 || "", // Optionnel
            zipCode: postalCode,
            city
        };

        // ✅ Ajouter l'article acheté dans `articlesBought`
        if (!user.articlesBought.includes(articleId)) {
            user.articlesBought.push(articleId);
        }
        await user.save();

        // ✅ Mettre à jour `availableStock` de l'article à `0`
        article.availableStock = 0;
        article.boughtBy = user._id;
        await article.save();

        // ✅ Envoi des e-mails
        await sendEmailToSeller(seller, user, article);
        await sendEmailToBuyer(user, seller, article);

        // ✅ Réponse au client
        res.json({
            result: true,
            message: "Achat validé. Adresse mise à jour, stock modifié et e-mails envoyés.",
            user: {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                address: user.address,
                articlesBought: user.articlesBought
            },
            article: {
                _id: article._id,
                title: article.title,
                availableStock: article.availableStock,
                boughtBy: article.boughtBy
            }
        });

    } catch (error) {
        console.error("Erreur lors de l'achat :", error);
        res.status(500).json({
            result: false,
            message: "An error has occurred.",
            error: error.message,
        });
    }
});

/**
 * ✅ Envoie un e-mail au vendeur pour lui indiquer que son article a été acheté.
 */
async function sendEmailToSeller(seller, buyer, article) {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER, // Ton email Gmail
            pass: process.env.GMAIL_PASS // Ton mot de passe d'application Gmail
        }
    });

    let mailOptions = {
        from: process.env.GMAIL_USER,
        to: seller.email,
        subject: "Votre article a été vendu !",
        html: `
            <h2>Félicitations ${seller.firstname} ${seller.lastname} !</h2>
            <p>Votre article <strong>${article.title}</strong> a été acheté par :</p>
            <p><strong>Nom :</strong> ${buyer.firstname} ${buyer.lastname}<br>
               <strong>Email :</strong> ${buyer.email}<br>
               <strong>Adresse :</strong> ${buyer.address.number} ${buyer.address.line1}, ${buyer.address.city} ${buyer.address.zipCode}</p>
            <p>Vous recevrez un virement sur votre compte bancaire (${seller.iban}) une fois le paiement effectué.</p>
            <p>Merci d'expédier l'article dès que le paiement est confirmé.</p>
        `
    };

    await transporter.sendMail(mailOptions);
}

/**
 * ✅ Envoie un e-mail à l'acheteur avec une facture et l'IBAN du vendeur.
 */
async function sendEmailToBuyer(buyer, seller, article) {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER, // Ton email Gmail
            pass: process.env.GMAIL_PASS // Ton mot de passe d'application Gmail
        }
    });

    const totalPrice = (article.price + 3.99).toFixed(2);

    let mailOptions = {
        from: process.env.GMAIL_USER,
        to: buyer.email,
        subject: "Confirmation d'achat et paiement requis",
        html: `
            <h2>Merci pour votre achat, ${buyer.firstname} ${buyer.lastname} !</h2>
            <p>Vous avez acheté l'article suivant :</p>
            <img src="${article.pictures[0]}" alt="Image de l'article" width="200"/>
            <p><strong>Article :</strong> ${article.title}<br>
               <strong>Description :</strong> ${article.description}<br>
               <strong>Prix :</strong> ${article.price}€<br>
               <strong>Livraison :</strong> 3.99€<br>
               <strong>Total :</strong> ${totalPrice}€</p>
            <p>Merci de procéder au paiement via virement bancaire sur le compte du vendeur :</p>
            <p><strong>IBAN du vendeur :</strong> ${seller.iban}</p>
            <p>Une fois le paiement effectué, l'article vous sera expédié.</p>
        `
    };

    await transporter.sendMail(mailOptions);
}

module.exports = router;
