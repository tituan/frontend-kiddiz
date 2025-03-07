import { StyleSheet, View, ScrollView, FlatList, ActivityIndicator, Text, Button, Image} from 'react-native';
import React, { useEffect, useState } from "react";
import HeaderNavigation from './components/HeaderNavigation'; 
import { LinearGradient } from 'expo-linear-gradient'
import ButtonBig from './components/ButtonBig';
import ButtonHalf from './components/ButtonHalf';
import { FontAwesome } from '@expo/vector-icons';
import ButtonProfil from './components/ButtonProfil';

export default function ArticleScreen({ navigation, route }) {
    // const [articles, setArticles] = useState([]);
    // const [loading, setLoading] = useState(true);
    const { article } = route.params;

    // console.log(article)
    
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
       
             <View style={styles.mainContainer}> 
             
             <View style={styles.titreContainer}>
                    <Text style={styles.titre}>{article.title}</Text>
                    <FontAwesome name="heart" size={20} color={"red"} style={styles.like}/>
                    <Text style={styles.likesCount}>{article.likesCount}</Text>
             </View>

            <View style={styles.photoContainer}>
                 <Image source={{ uri: article.pictures[0] }} style={styles.articleImage} />
            </View>

            <View style={styles.descriptionContainer}>
                <Text style={styles.titreDescription}>{article.title}</Text>
                <Text style={styles.textDescription}>{article.productDescription}</Text>
                <Text style={styles.textCategorie}>Categorie: {article.category}</Text>
                <Text style={styles.textType} >Type: {article.itemType}</Text>
                <Text style={styles.textCondition}>Etat: {article.condition}</Text>
                <Text style={styles.textPrice}>Prix: {article.price}€</Text>
            </View>
                <View style={styles.buttonContainer}>
                <ButtonBig style={styles.buttonAchaterArticle} text="Acheter l'article" />
                </View>
            
                <Text>{article.firstname}</Text>

                <View style={styles.buttonSeller}>
                <ButtonProfil style={styles.buttonSeller} text="Acheter l'article" sellerFirstName={article.user.firstname}  onPress={() => navigation.navigate("SellerScreen", { article: article.user })}/>
                </View>

                <Image style={styles.map} source={require('../assets/carte.jpg')}/>

                <View style={styles.buttonHalfContainer}>
                <ButtonHalf style={styles.buttonOffre} text="Faire une offre" />
                <ButtonHalf style={styles.buttonAchater} text="Acheter" />
                </View>

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
    contentContainer: {
        flexGrow: 1,
        
    },
    header: {
        padding: 20,
        borderBottomColor: '#00000',
        borderBottomWidth: 1,
        paddingBottom: 20,
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.9, 
        shadowRadius: 4, 
        elevation: 5, 
         bottomTop: 50,
    },
    titreContainer:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:30,
        marginBottom:15,
        
    },
    titre:{
        fontSize: 30,
        fontFamily: 'LilitaOne-Regular',
        position: 'absolute', 
        left : "4%",
    
    },

    like:{
        fontSize: 20,
        fontFamily: 'RopaSans-Regular',
        left : 350,
        
    },
    likesCount:{
        fontSize: 20,
        fontFamily: 'RopaSans-Regular',
        left : 360,
    },

    photoContainer:{
        width: '100%',
        padding: 20,
        marginBottom: 30,
    },

    articleImage:{
        width:'100%',
        height:250,
    },
    

    descriptionContainer:{
        padding: 20,
        backgroundColor : '#F095B4',
        width: '100%',
    },
    titreDescription:{
        fontFamily: 'LilitaOne-Regular',
        fontSize: 22,
        marginBottom: 5,
        

    },
    textDescription:{
        fontFamily: 'RopaSans-Regular',
        fontSize: 24,
        marginBottom: 5,

    },
    textCategorie:{
        fontFamily: 'RopaSans-Regular',
        fontSize: 19,
        marginBottom: 5,
    },
    textType:{
        fontFamily: 'RopaSans-Regular',
        fontSize: 19,
        marginBottom: 5,

    },
    textCondition:{
        fontFamily: 'RopaSans-Regular',
        fontSize: 19,
        marginBottom: 5,
        

    },
    textPrice: {
        fontFamily: 'LilitaOne-Regular',
        fontSize: 20,
        marginBottom: 5,
        fontSize: 20,
        marginBottom: 5,
        position: 'absolute', 
        bottom: 10, 
        right: 10, 
    },
    buttonContainer:{
        padding: 20,
    },
    buttonAchaterArticle: {
        backgroundColor: '#EDDC5F',
    
    },
    map:{
        height:200,
        width:'100%'
    },

    buttonHalfContainer :{
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonOffre:{
        width: '48%',
        borderColor: "black",
        backgroundColor: "#EDDC5F",
    },
    buttonAchater:{
        width: '48%',
        borderColor: "black",
        backgroundColor: "#00CC99",
    },

})