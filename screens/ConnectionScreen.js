import { Button, StyleSheet, Text, View } from 'react-native';

export default function ConnectionScreen({ navigation }) {
 return (
   <View style={styles.container}>
     <Text>Connection Screen</Text>
     <Button
       title="Go to SignIn"
       onPress={() => navigation.navigate('SignIn')}
     />
     <Button
       title="Go to SignUp"
       onPress={() => navigation.navigate('SignUp')}
     />
   </View>
 );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2ecc71',
      alignItems: 'center',
      justifyContent: 'center',
    },
})