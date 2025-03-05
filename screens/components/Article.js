import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, StyleSheet, Image, View, ImageBackground } from "react-native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { FontAwesome } from '@expo/vector-icons';

function Article({ text, onPress, style, item }) {
  const [loaded, error] = useFonts({
    'LilitaOne-Regular': require('../../assets/fonts/LilitaOne-Regular.ttf'),
    'RopaSans-Regular': require('../../assets/fonts/RopaSans-Regular.ttf'),
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

      <View style={styles.imageWrapper} >
        <Image source={{uri: `${item.pictures[0]}` }} style={styles.image} resizeMode="contain" />
      </View>

        <TouchableOpacity style={styles.heartIcon} onPress={toggleLike}>
          <FontAwesome name="heart" size={20} color={isLiked ? "red" : "#b2bec3"} />
          <Text>{item.likesCount}</Text>
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
    borderColor: "#fffff",
    width: '48%',
    height: 240,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    backgroundColor: '#00CC99',
    padding: 5,

    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,

    // Shadow for Android
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
  },
  image: {
    width: '100%',
    height: '100%',
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