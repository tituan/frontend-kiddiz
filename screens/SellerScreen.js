import { StyleSheet, View, ScrollView, Text, ActivityIndicator,Image } from 'react-native';
import HeaderNavigation from './components/HeaderNavigation'; 
import { LinearGradient } from 'expo-linear-gradient'
import Article from './components/Article';
import { useFonts } from 'expo-font';
import ButtonBig from './components/ButtonBig'
import ButtonHalf from './components/ButtonHalf';

export default function SellerScreen({ navigation }) {

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
    gutyarn        >
                <HeaderNavigation onPress={() => navigation.navigate("Connection")}/>  
            </LinearGradient> 
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.profil}>
                        <View style={styles.cardProfil}>
                             <View style={styles.idBox}>  
                            
                               <Image style={styles.iconProfil} source={require('../assets/icon-profil.jpg')}/> 

                                <View style={styles.infoUser}>
                                <Text style={styles.firstName} > Coffreajouet </Text>
                                <Text> ⭐️ ⭐️ ⭐️ ⭐️ ⭐️  4.5 </Text>
                                <Text> Paris (75017) </Text>
                                    
                                </View>

                             </View>
                             <Text style={styles.textAbonnes}> Nombre d'abonnés 150 </Text>
                             <Text style={styles.textVente} > Nombre de vente réalisées 50 </Text>
                         </View>
                   
                    <View style={styles.buttonContainer}>
                        <ButtonHalf style={styles.buttonContacter} text="Contacter"/>
                        <ButtonHalf style={styles.buttonAbonner} text="S'abonner"/>
                    </View>

                    <Text style={styles.titre}> 12 Articles en vente </Text>
                    <Text style={styles.titre}> Categorie </Text>
                    <ButtonBig style={styles.buttonCategorie} text="Tous"/>
                </View>


                <Text style={styles.titre}> Articles en vente </Text>
                <View style={styles.row}> 
                    {/* <Article style={styles.articleContainer}/> */}
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
        // borderWidth: 1,
        // borderColor: "red",
        height: '70%',
        width: '100%',
        padding: 20,
        
    },
    cardProfil:{
        // borderWidth: 1,
        // borderColor: "blue",
        height: '45%',
        width: '100%',
    },
    iconProfil:{
        // borderWidth: 1,
        // borderColor: "orange",
        height: '100%',
        width: '35%',
        
    },
    firstName:{
        fontFamily: 'LilitaOne-Regular',
        fontSize: 30,
        
    },
    idBox:{
        // borderWidth: 1,
        // borderColor: "orange",
        height: '70%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        
    },
    infoUser:{
        // borderWidth: 1,
        // borderColor: "purpul",
        height: '100%',
        width: '65%',
       
    },
    textAbonnes:{
        color: "black",
        fontFamily: 'RopaSans-Regular',
        fontSize: 18,
        marginBottom:4,
    },
    textVente:{
        color: "black",
        fontFamily: 'RopaSans-Regular',
        fontSize: 18,
    },

    
    buttonContainer :{
        // borderWidth: 1,
        // borderColor: "green",
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
        fontSize: 25, 
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

    buttonCategorie:{
        alignItems: 'left',
        paddingLeft: 15,
    },
    
    contentContainer: {
        flexGrow: 1,
    },
});