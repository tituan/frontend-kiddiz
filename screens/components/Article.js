import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, StyleSheet, Image, View } from "react-native";
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { FontAwesome } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native'; 

function Article({ onPress, style, item}) {
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
    if (item.usersLikers && item.usersLikers.includes(userToken)) {
      setIsLiked(true);
    }
  }, [item, userToken]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  // Gestion du like
  const toggleLike = async () => {
    try {
      const response = await fetch("http://192.168.100.209:3000/favorites", {
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

  return (
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
  );
}

export default Article;

const styles = StyleSheet.create({
  articleContainer: {
    borderWidth: 1,
    borderColor: "#00000",
    width: '48%',
    height: 240,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    backgroundColor: '#00CC99',
    padding: 5,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  imageContainer: {
    position: 'relative',
  },
  imageWrapper: {
    width: 165,
    height: 170,
    overflow: 'hidden',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
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
    paddingHorizontal: 5,
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
  }
});
