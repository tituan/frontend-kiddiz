import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, StyleSheet, Image, View } from "react-native";
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { FontAwesome } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native'; 

 // Env variable for BACKEND
 const urlBackend = process.env.EXPO_PUBLIC_API_URL;

function Article({ onPress, style, item, showModifyButton = false }) {
  const navigation = useNavigation();  
  const userToken = useSelector(state => state.user.value.token);

  // Chargement des polices
  const [fontsLoaded, fontError] = useFonts({
    'LilitaOne-Regular': require('../../assets/fonts/LilitaOne-Regular.ttf'),
    'RopaSans-Regular': require('../../assets/fonts/RopaSans-Regular.ttf'),
  });

  // État du like et du compteur
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(item.likesCount);

  // Masquer l'écran de splash après le chargement des polices
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Vérifier si l'utilisateur a déjà liké l'article
  useEffect(() => {
    if (item.usersLikers && userToken) { // Vérifie que les données sont disponibles
      console.log("Vérification du like...");
      console.log("userToken:", userToken);
      console.log("item.usersLikers:", item.usersLikers);

      const hasLiked = item.usersLikers.some(user => user.token === userToken);
      console.log("hasLiked:", hasLiked);

      if (hasLiked) {
        setIsLiked(true);
      } else {
        setIsLiked(false); // Réinitialise isLiked si l'utilisateur n'a pas liké
      }
    }
  }, [item.usersLikers, userToken]); // Déclenche le useEffect à chaque changement de usersLikers ou userToken

  if (!fontsLoaded && !fontError) {
    return null;
  }

  // Gestion du like
  const toggleLike = async () => {
    if (!userToken) {
      Alert.alert("Connexion requise", "Vous devez être connecté pour aimer un article.");
      return;
    }
  
    if (!item.id) {
      console.error("Erreur: articleId est invalide", item);
      Alert.alert("Erreur", "Impossible d'aimer cet article, ID invalide.");
      return;
    }
  
    try {
      console.log("Envoi de la requête avec articleId :", item.id); // Log pour vérifier
  
      const response = await fetch(`${urlBackend}favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: userToken,
          articleId: item.id,
        }),
      });

  const data = await response.json();

  if (data.result) {
    setIsLiked(!isLiked);
    setLikesCount(prevCount => (isLiked ? prevCount - 1 : prevCount + 1));
  } else {
    console.error("Erreur API:", data.error);
  }
} catch (error) {
  console.error("Erreur lors de la requête:", error);
}
  };
  const handleClick = () => {
    console.log('click');
    console.log(item);
    navigation.navigate("ArticleScreen", { article: item });
  };
  // Redirige vers ModifyArticleScreen avec l'ID de l'article
  const handleModify = () => {
    navigation.navigate("Modifier", { articleId: item.id }); 
  };

  return (
    <View style={styles.mainContainer}>
    <TouchableOpacity style={[styles.articleContainer, style]} onPress={handleClick}>
      <View style={styles.imageContainer}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: item.pictures[0] }} style={styles.image} resizeMode="cover" />
        </View>

    <TouchableOpacity style={styles.heartIcon} onPress={toggleLike}>
      <FontAwesome name="heart" size={20} color={isLiked ? "red" : "#b2bec3"} />
      <Text style={styles.likeCounter}>{likesCount}</Text>
    </TouchableOpacity>
  </View>

      <View style={styles.rowContainer}>
        <View>
          <Text style={styles.text}>{item.title}</Text>
          <Text style={styles.textType}>{item.condition}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.textPrix}>{item.price} €</Text>
        </View>
      </View>
    </TouchableOpacity>
    {showModifyButton && ( 
        <TouchableOpacity onPress={handleModify}>
          <Text>modifier</Text>
        </TouchableOpacity>
    )}
    </View>
  );
}

export default Article;

const styles = StyleSheet.create({
  mainContainer:{
    width: '48%',
  },
  articleContainer: {
    borderWidth: 1,
    borderColor: "#00000",
    width: '100%',
    height: 240,
    borderRadius: 10,
    // justifyContent: "center",
    marginVertical: 10,
    backgroundColor: '#00CC99',
    // padding: 5,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
  },
  imageWrapper: {
    width: '100%',
    height: 180,
    overflow: 'hidden',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  heartIcon: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 20,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#000000",
  },
  likeCounter: {
    marginLeft: 3,
  },
  text: {
    color: "black",
    fontFamily: 'RopaSans-Regular',
    fontSize: 12,
    textShadowColor: 'white',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    marginBottom: 3,
  },
  textType: {
    color: "black",
    fontFamily: 'RopaSans-Regular',
    fontSize: 10,
    textShadowColor: 'white',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginBottom: 10,
    width: '100%',
  },
  priceContainer: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 5,
    backgroundColor: '#EDDC5F',
  },
  textPrix: {
    fontSize: 12,
    fontFamily: 'LilitaOne-Regular',
  },
  modifyButtonContainer:{
    position: 'absolute',
    bottom: -30, // Positionne le bouton en dessous de la carte
    left: '50%', // Centre le bouton horizontalement
    transform: [{ translateX: -50 }], // Ajuste le centrage
    zIndex: 1, // Assure que le bouton reste au-dessus des autres éléments
  },
  modifyButton:{
    width: 100, // Largeur du bouton
    height: 40, // Hauteur du bouton
    backgroundColor: '#fdba2d', // Couleur de fond du bouton
  }
});

