import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddArticleScreen() {
  const title = 'AddArticleScreen';

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontFamily: 'LilitaOne-Regular',
    color: "#FDBB2D",
    textShadowColor: 'black',
    textShadowOffset: { width: 4, height: 6 },
    textShadowRadius: 3,
    marginBottom: 20,
  },
});