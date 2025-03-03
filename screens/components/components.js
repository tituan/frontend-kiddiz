import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

// 

function ButtonBig({ text, onPress, style }) {
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

const styles = StyleSheet.create({
  buttonBig: {
    borderWidth: 2,
    borderColor: "#000000",
    width: 350,
    height: 50,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  text: {
    color: "#ffffff", 
    fontWeight: "bold",
  }
});

export default ButtonBig;