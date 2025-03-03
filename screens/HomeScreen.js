import { Button, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen({ navigation }) {
 return (
   <View style={styles.container}>
     <Text>Home Screen</Text>
     <Button
       title="Go to Connection"
       onPress={() => navigation.navigate('Connection')}
     />
   </View>
 );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#3498db',
      alignItems: 'center',
      justifyContent: 'center',
    },
})