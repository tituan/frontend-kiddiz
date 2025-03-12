import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";



function ButtonIcon({ text, onPress, style, name, color }) {
    return (
        <TouchableOpacity
          style={[styles.buttonSquare, style]} 
          onPress={onPress}
          activeOpacity={0.7}
        >
          <FontAwesome name={name} size={22} color="white" />
        </TouchableOpacity>
    );
}


export default ButtonIcon;

const styles = StyleSheet.create({
  buttonSquare: {
    borderWidth: 1,
    borderColor: "#000000",
    height: 45,
    width: 45,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 }, 
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5, 
   
  }
});