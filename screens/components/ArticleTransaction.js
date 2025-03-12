import React from "react";
import { TouchableOpacity, Text, StyleSheet, View, Image} from "react-native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';



function ArticleTransaction({ onPress, style, }) {
  const [loaded, error] = useFonts({
      'LilitaOne-Regular': require('../../assets/fonts/LilitaOne-Regular.ttf'),
      'RopaSans-Regular': require('../../assets/fonts/RopaSans-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
        SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    } 

    // if (!item) {
    //     return null; 
    //   }

    return (
        <TouchableOpacity
          style={[styles.buttonContainer, style]} 
          onPress={onPress}
          activeOpacity={0.7}
        >
            <View style={styles.articleContainer}>
                <View style={styles.imageContainer}>
                    <Image source={require ('../../assets/peluche.jpg')} style={styles.image} />
                </View>
                <View>
                    <View style={styles.textContainer}> 
                         <Text style={styles.textTitre}>Ours en peluche </Text>
                         <Text style={styles.textPrix}> 8 € </Text>
                    </View>
                    <View>
                        <Text style={styles.textNom}> Jean </Text>
                    </View>
                </View>
            </View>

            
          
        </TouchableOpacity>
      );
    }


export default ArticleTransaction;

const styles = StyleSheet.create({
    buttonContainer: {
    borderWidth: 1,
    borderColor: "#000000",
    width: '100%',
    height:70,
    borderRadius: 10,
    justifyContent: "center",
    marginVertical: 3,
    padding:15,
    backgroundColor:'white',  
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 }, 
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5, 
  },

  articleContainer:{
    flexDirection: 'row',
    alignItems: 'center',

  },

  imageContainer:{
    width: '25%',
  },

  image:{
    height: 60,
    width :60,
    borderRadius:50,
  },

  textContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textTitre: {
    fontFamily: 'RopaSans-Regular',
    fontSize: 20,
  },
  textPrix: {
    fontFamily: 'RopaSans-Regular',
    fontSize: 20,
  },
  textNom:{
    fontFamily: 'RopaSans-Regular',
    fontSize: 16,
  },
 
});