import { StyleSheet, View, ScrollView} from 'react-native';
import HeaderNavigation from './components/HeaderNavigation'; 
import { LinearGradient } from 'expo-linear-gradient'
import WelcomeHome from './components/WelcomeHome'
import ButtonBig from './components/ButtonBig';
import Article from './components/ArticleComponent';

export default function HomeScreen({ navigation }) {

    return (
    <View style={styles.container}>
        <LinearGradient
        colors={['rgba(34,193,195,1)', 'rgba(253,187,45,1)']} // Couleurs du dégradé
        start={{ x: 0, y: 1 }} // Point de départ du dégradé (0,1 = bas)
        end={{ x: 0, y: 0 }} // Point d'arrivée du dégradé (0,0 = haut)
        style={styles.header}
        >
            <HeaderNavigation onPress={() => navigation.navigate("Connection")}/>  
            
        </LinearGradient> 
        
        <ScrollView contentContainerStyle={styles.contentContainer}>
        <WelcomeHome/>  
             <View style={styles.row}> 
                <Article style={styles.articleContainer}/>
                <Article style={styles.articleContainer}/>
                <Article style={styles.articleContainer}/>
                <Article style={styles.articleContainer}/>
                <Article style={styles.articleContainer}/>
                <Article style={styles.articleContainer}/>
                <Article style={styles.articleContainer}/>
                <Article style={styles.articleContainer}/>
                <Article style={styles.articleContainer}/>
                <Article style={styles.articleContainer}/>
             </View>
        </ScrollView>
        
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fffff',
    },
    header: {
        padding: 20,
        borderBottomColor: '#00000',
        borderBottomWidth: 2,
        paddingBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        flexWrap: 'wrap',
        alignItems: 'center', 
        width: '100%', 
        padding: 20, 
    },
    article: {
        width: '48%', 
    },
    contentContainer: {
        flexGrow: 1,
    },

})