import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, StyleSheet, Image, View, Alert } from "react-native";
import { useFonts } from 'expo-font';
import { useSelector, } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { FontAwesome } from '@expo/vector-icons';

const urlBackend = process.env.EXPO_PUBLIC_API_URL;

function Article({ onPress, style, item, showModifyButton = false, isFavorite = false, onRefresh }) {
  const navigation = useNavigation();
  const userToken = useSelector(state => state.user.value.token);

  const [fontsLoaded, fontError] = useFonts({
    'LilitaOne-Regular': require('../../assets/fonts/LilitaOne-Regular.ttf'),
    'RopaSans-Regular': require('../../assets/fonts/RopaSans-Regular.ttf'),
  });

  const [isLiked, setIsLiked] = useState(isFavorite);


  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    if (item.usersLikers && userToken) {
      const hasLiked = item.usersLikers.some(user => user.token === userToken);
      setIsLiked(hasLiked);
    }
  }, [item.usersLikers, userToken]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

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

    if (item.user.token === userToken) {
      console.log("Vous ne pouvez pas liker votre propre article");
      return;
    }

    try {
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
        if (onRefresh) onRefresh();
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
            <Text style={styles.likeCounter}>{item.likesCount}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{item.title}</Text>
            <Text style={styles.textType}>{item.condition}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.textPrix}>{item.price} €</Text>
          </View>
        </View>
      </TouchableOpacity>
      {showModifyButton && (
        <TouchableOpacity style={styles.btnModify} onPress={handleModify}>
          <Text style={styles.btnModifyText}>modifier</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default Article;

const styles = StyleSheet.create({
  mainContainer: {
    width: '48%',
  },
  articleContainer: {
    borderWidth: 1,
    borderColor: "#00000",
    width: '100%',
    height: 240,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: '#00CC99',
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
    marginBottom: 3,
  },
  textType: {
    color: "black",
    fontFamily: 'RopaSans-Regular',
    fontSize: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'start',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginBottom: 10,
    width: '100%',
  },
  priceContainer: {
    padding: 5,
    height: 27,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 5,
    backgroundColor: '#EDDC5F',
    width: '30%',
  },
  textContainer: {
    width: '70%',
  },
  textPrix: {
    fontSize: 12,
    fontFamily: 'LilitaOne-Regular',
  },
  modifyButtonContainer: {
    position: 'absolute',
    bottom: -30,
    left: '50%',
    transform: [{ translateX: -50 }],
    zIndex: 1,
  },
  modifyButton: {
    width: 100,
    height: 40,
    backgroundColor: '#fdba2d',
  },
  btnModify: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 4,
    backgroundColor: '#f095B4',
    borderRadius: 5,
    borderBlockColor: 'black',
    borderWidth: 1,
    textAlign: 'center',
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
   
  },
  btnModifyText: {
    color: 'white',
  },
});
