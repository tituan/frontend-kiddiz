import React, { useEffect, } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { FontAwesome } from '@expo/vector-icons';




function ButtonProfil({ sellerFirstName, sellerLastName, onPress, style }) {
  
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
  

  return (
    <TouchableOpacity
      style={[styles.buttonBig, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      
      <View style={styles.profil}>
        <View style={styles.cardProfil}>
          <View style={styles.idBox}>
            <View style={styles.iconProfil}>
              <View style={styles.iconProfilInitial}>
                <Text style={styles.iconProfilLetter}> {sellerFirstName?.charAt(0).toUpperCase() || '?'}</Text>
              </View>
            </View>
            <View style={styles.infoUser}>
              <View>
                <Text style={styles.firstName}>{sellerFirstName} {sellerLastName}</Text>
                <View style={styles.starContainer}> 
                       <FontAwesome name="star" size={20} color={"gold"} />
                       <FontAwesome name="star" size={20} color={"gold"} />
                       <FontAwesome name="star" size={20} color={"gold"} />
                       <FontAwesome name="star" size={20} color={"gold"} />
                       <FontAwesome name="star" size={20} color={"gold"} />
                       <Text> 4.5 </Text>
                </View>
                <Text> Paris (75017) </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ButtonProfil;

const styles = StyleSheet.create({
  buttonBig: {
    
    width: '100%',
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  profil: {
    paddingHorizontal: 20,
  },
  cardProfil: {
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  iconProfilInitial: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: "#00000",
    borderRadius: '50%',
    backgroundColor: '#00CC99',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  iconProfilLetter: {
    color: '#00000',
    fontFamily: 'LilitaOne-Regular',
    fontSize: 60,
    marginRight:7,
    
  },
  iconProfil: {
    width: '35%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstName: {
    fontFamily: 'LilitaOne-Regular',
    fontSize: 30,
  },
  starContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
},
  idBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoUser: {
    width: '65%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textAbonnes: {
    color: "black",
    fontFamily: 'RopaSans-Regular',
    fontSize: 18,
    marginBottom: 4,
  },
  textVente: {
    color: "black",
    fontFamily: 'RopaSans-Regular',
    fontSize: 18,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  buttonContacter: {
    width: '48%',
    borderColor: "black",
    backgroundColor: "#EDDC5F",
  },
  buttonAbonner: {
    width: '48%',
    borderColor: "black",
    backgroundColor: "#00CC99",
  },
});