import { StyleSheet, View, ScrollView, Text, ActivityIndicator } from 'react-native';
import HeaderNavigation from './components/HeaderNavigation'; 
import { LinearGradient } from 'expo-linear-gradient'
import Article from './components/Article';
import { useFonts } from 'expo-font';
import ButtonBig from './components/ButtonBig'
import ButtonHalf from './components/ButtonHalf';

export default function ProfilScreen({ navigation }) {

    const [fontsLoaded] = useFonts({
        'LilitaOne-Regular': require('../assets/fonts/LilitaOne-Regular.ttf'),
        'RopaSans-Regular': require('../assets/fonts/RopaSans-Regular.ttf'),
    });
    if (!fontsLoaded) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['rgba(34,193,195,1)', 'rgba(253,187,45,1)']} // Couleurs du dégradé
                start={{ x: 0, y: 1 }} // Point de départ du dégradé (0,1 = bas)
                end={{ x: 0, y: 0 }} // Point d'arrivée du dégradé (0,0 = haut)
                style={styles.header}
    gut        >
                <HeaderNavigation onPress={() => navigation.navigate("Connection")}/>  
            </LinearGradient> 
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.profil}>
                        <View style={styles.cardProfil}>
                             <View style={styles.idBox}>  

                                <View style={styles.infoUser}>
                                <Text> Paul-Loup </Text>
                                <Text> Chatin </Text>
                                <Text> Star </Text>
                                <Text> Paris (75017) </Text>
                                    
                                </View>

                             </View>
                             <Text> Nombre d'abonnés 150 </Text>
                             <Text> Nombre de vente réalisées 50 </Text>
                         </View>
                   
                    <View style={styles.buttonContainer}>
                        <ButtonHalf style={styles.buttonContacter} text="Contacter"/>
                        <ButtonHalf style={styles.buttonAbonner} text="S'abonner"/>
                    </View>

                    <Text style={styles.titre}> 12 Articles en vente </Text>
                    <Text style={styles.titre}> Categorie </Text>
                    <ButtonBig style={styles.submitButton} />
                </View>


                <Text style={styles.titre}> Articles en vente </Text>
                <View style={styles.row}> 
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
        borderBottomWidth: 1,
        paddingBottom: 20,
    },
    profil: {
        borderWidth: 1,
        borderColor: "red",
        height: '70%',
        width: '100%',
        padding: 20,
    },
    cardProfil:{
        borderWidth: 1,
        borderColor: "blue",
        height: '45%',
        width: '100%',
    },
    idBox:{
        borderWidth: 1,
        borderColor: "orange",
        height: '70%',
        width: '100%',
    },
    infoUser:{borderWidth: 1,
        borderColor: "purpul",
        height: '100%',
        width: '50%',},

    buttonContainer :{
        borderWidth: 1,
        borderColor: "green",
        height: '15%',
        width: '100%',
        flexDirection: 'row',  
        justifyContent: 'space-between',  
        alignItems: 'center',
    },

    buttonContacter:{
        height: '90%',
        width: '48%',
        borderColor: "black",
        backgroundColor: "#EDDC5F",
    },
    buttonAbonner:{
        height: '90%',
        width: '48%',
        borderColor: "black",
        backgroundColor: "#00CC99",
    },
    titre: {
        color: "black",
        fontFamily: 'LilitaOne-Regular',
        fontSize: 30, 
        padding:10,
        
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
});