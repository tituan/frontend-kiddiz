import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, StyleSheet, Image, View } from "react-native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { FontAwesome } from '@expo/vector-icons';

function Article({ text, onPress, style }) {
  const [loaded, error] = useFonts({
    'LilitaOne-Regular': require('../../assets/fonts/LilitaOne-Regular.ttf'),
  });

  const [isLiked, setIsLiked] = useState(false);  

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  
  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <TouchableOpacity style={[styles.articleContainer, style]} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/peluche.jpg')} style={styles.image} />
        <TouchableOpacity style={styles.heartIcon} onPress={toggleLike}>
          <FontAwesome name="heart" size={24} color={isLiked ? "red" : "black"} />
        </TouchableOpacity>
      </View>

      <View style={styles.rowContainer}>
        <View>
          <Text style={styles.text}>Article</Text>
          <Text style={styles.text}>Etat</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.textPrix}>48€</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default Article;

const styles = StyleSheet.create({
  articleContainer: {
    borderWidth: 2,
    borderColor: "#000000",
    width: '48%',
    height: 240,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    backgroundColor: '#4478A9',

    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,

    // Shadow for Android
    elevation: 5,
  },
  imageContainer: {
    position: 'relative',
    
  },
  image: {
    width: 160,
    height: 160,
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  heartIcon: {
    position: 'absolute',
    bottom: 20,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    width: 30,
    height: 30,
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
  text: {
    color: "#ffffff",
    fontWeight: "bold",
    fontFamily: 'LilitaOne-Regular',
    fontSize: 20,
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',
  },
  priceContainer: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 10,
    backgroundColor: '#EDDC5F',
  },
  textPrix: {
    fontSize: 18,
    fontFamily: 'LilitaOne-Regular',
  }
});