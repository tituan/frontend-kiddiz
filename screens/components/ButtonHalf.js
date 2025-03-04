import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';

function ButtonHalf({ text, onPress, style }) {
  const [loaded, error] = useFonts({
      'LilitaOne-Regular': require('../../assets/fonts/LilitaOne-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
        SplashScreen.hideAsync();
        }
    }, [loaded, error]);

if (!loaded && !error) {
    return null;
} 

return (
    <TouchableOpacity
        style={[styles.buttonHalf, style]} 
        onPress={onPress}
        activeOpacity={0.7}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}
export default ButtonHalf;

const styles = StyleSheet.create({
  buttonHalf: {
    borderWidth: 2,
    borderColor: "#000000",
    width: '80%',
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    backgroundColor: '#F095B4',

    // Ombre sur iOS
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 }, 
    shadowOpacity: 0.4,
    shadowRadius: 4,

    // Ombre sur Android
    elevation: 5, 

  },
  text: {
    color: "#ffff", 
    fontFamily: 'LilitaOne-Regular',
    fontSize : 18,
    textShadowColor: 'black', 
    textShadowOffset: { width: 1, height:3 }, 
    textShadowRadius: 1, 
    }
});

