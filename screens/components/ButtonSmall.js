import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';



function ButtonSmall({ text, onPress, style }) {
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
          style={[styles.buttonBig, style]} 
          onPress={onPress}
          activeOpacity={0.7}
        >
          <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
      );
    }


export default ButtonSmall;

const styles = StyleSheet.create({
  buttonBig: {
    borderWidth: 1,
    borderColor: "#000000",
    width: '15%',
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,

    // Ombre sur iOS
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 }, 
    shadowOpacity: 0.4,
    shadowRadius: 4,

    // Ombre sur Android
    elevation: 5, 
   
  },
  text: {
    color: "#ffffff", 
    fontWeight: "bold",
    fontFamily: 'LilitaOne-Regular',
    fontSize : 20,
    textShadowColor: 'black', 
    textShadowOffset: { width: 1, height:3 }, 
    textShadowRadius: 1, 
    }
});