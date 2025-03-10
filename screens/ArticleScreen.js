import { StyleSheet, View, ScrollView, FlatList, ActivityIndicator, Text, Button, Image} from 'react-native';
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import HeaderNavigation from './components/HeaderNavigation'; 
import { LinearGradient } from 'expo-linear-gradient'
import ButtonBig from './components/ButtonBig';
import ButtonHalf from './components/ButtonHalf';
import { FontAwesome } from '@expo/vector-icons';
import ButtonProfil from './components/ButtonProfil';

export default function ArticleScreen({ navigation, route }) {
    const userToken = useSelector(state => state.user.value.token);
    console.log(userToken)
    const { article } = route.params;
    const sellerArticleToken = article.user.token
    // console.log(article.user.token)
    
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
                <View style={styles.titreContainerLikes}>
                    <FontAwesome name="heart" size={20} color={"red"} style={styles.like}/>
                    <Text style={styles.likesCount}>{article.likesCount}</Text>
                </View>
             </View>

            <View style={styles.photoContainer}>
                 <Image source={{ uri: article.pictures[0] }} style={styles.articleImage} />
            </View>

            <View style={styles.descriptionContainer}>
                <View style={styles.boxTitle}>
                    <Text style={styles.titreDescription}>{article.title}</Text>
                    <Text style={styles.textPrice}>{article.price}€</Text>
                </View>
                <View style={styles.boxText}>
                    <Text style={styles.textType}>{article.itemType}</Text>
                    <Text style={styles.textType}>{article.category}</Text>
                    <Text style={styles.textType}>{article.condition}</Text>
                </View>
                <Text style={styles.textDescription}>Description : {article.productDescription}</Text>
                {userToken !== sellerArticleToken && (
                    <View style={styles.buttonContainer}>
                       <ButtonBig 
                        style={styles.buttonAcheterArticle} 
                        text="Acheter l'article" 
                        />
                    </View>
                )}
            </View>
            {userToken === sellerArticleToken ? (
                <View style={styles.containerBtnSeller}>
                    <ButtonBig style={styles.buttonModify} text="Modifier votre article" />
                    <ButtonBig style={styles.buttonDelete} text="Supprimer votre article" />
                </View>
            ) : (
                <>
                    <Text>{article.firstname}</Text>
                    <View style={styles.buttonSeller}>
                        <ButtonProfil 
                            style={styles.buttonSeller} 
                            text="Voir le profil du vendeur" 
                            sellerFirstName={article.user.firstname}  
                            onPress={() => navigation.navigate("SellerScreen", { article: article.user })}
                        />
                    </View>
                    <Image style={styles.map} source={require('../assets/carte.jpg')}/>
                    <View style={styles.buttonHalfContainer}>
                        <ButtonHalf style={styles.buttonOffre} text="Faire une offre" />
                        <ButtonHalf style={styles.buttonAchater} text="Acheter" />
                    </View>
                </>
            )}
             </View>
        </ScrollView>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fffff',
      marginBottom: 20,
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
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop:30,
        marginBottom:10,
        paddingHorizontal: 20,
    },
    titreContainerLikes: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    titre:{
        fontSize: 30,
        fontFamily: 'LilitaOne-Regular',
    },
    like:{
        fontSize: 20,
        fontFamily: 'RopaSans-Regular',
        marginRight: 10,
    },
    likesCount:{
        fontSize: 20,
        fontFamily: 'RopaSans-Regular',
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
        paddingVertical: 25,
        paddingHorizontal: 20,
        backgroundColor : '#00CC99',
        width: '100%',
        marginBottom: 15,
    },
    boxTitle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    boxText: {
       display: 'flex',
       flexDirection: 'row',
       alignItems: 'center',
       marginBottom: 20,
    },
    titreDescription:{
        fontFamily: 'LilitaOne-Regular',
        fontSize: 24,
        width: '80%',
    },
    textDescription:{
        fontFamily: 'RopaSans-Regular',
        fontSize: 20,
    },
    textCategorie:{
        fontFamily: 'RopaSans-Regular',
        fontSize: 20,
    },
    textType:{
        fontFamily: 'RopaSans-Regular',
        fontSize: 20,
        alignSelf: "flex-start",
        backgroundColor: 'white',
        paddingHorizontal: 10,
        borderRadius: 5,
        paddingVertical: 7,
        marginRight: 10,
    },
    textCondition:{
        fontFamily: 'RopaSans-Regular',
        fontSize: 20,
    },
    textPrice: {
        fontFamily: 'LilitaOne-Regular',
        fontSize: 20,
        width: '20%',
        textAlign: 'center',
        padding: 5,
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 5,
        backgroundColor: '#EDDC5F',
    },
    buttonContainer:{
        padding: 20,
    },
    buttonAcheterArticle: {
        backgroundColor: '#EDDC5F',
        marginBottom: 0,
        color: '#000000',
    },
    containerBtnSeller: {
        width: '100%',
        padding: 20,
    },
    map:{
        height:200,
        width:'100%',
    },
    buttonHalfContainer:{
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonOffre:{
        width: '48%',
        borderColor: "black",
        backgroundColor: "#00CC99",
    },
    buttonAchater:{
        width: '48%',
        borderColor: "#000000",
        backgroundColor: "#EDDC5F",
    },
    buttonModify: {
        backgroundColor: '#F095B4',
    },
    buttonDelete: {
        backgroundColor: '#E94C65',
    },
})