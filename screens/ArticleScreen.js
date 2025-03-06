import { StyleSheet, View, ScrollView, FlatList, ActivityIndicator, Text, Button} from 'react-native';
import React, { useEffect, useState } from "react";
import HeaderNavigation from './components/HeaderNavigation'; 
import { LinearGradient } from 'expo-linear-gradient'
import WelcomeHome from './components/WelcomeHome'
import Article from './components/Article';
import ButtonBig from './components/ButtonBig';


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
       
             <View style={styles.row}> 
             
             
                <Text>{article.title}</Text>
                <Text>{article.likesCount}</Text>
                <Text>{article.pictures}</Text>
                <Text>{article.productDescription}</Text>
                <Text>{article.category}</Text>
                <Text>{article.price}</Text>

                <Text>{article.itemType}</Text>
                <Text>{article.condition}</Text>

                <Text>{article.firstname}</Text>

                
                
                


                <ButtonBig style={styles.buttonAchater} text="Acheter l'article" />
             </View>
             {/* Need some Style this is for the seller screen acces */}
             <Button style={styles.buttonSeller} title="vendeur" onPress={() => navigation.navigate("SellerScreen", { article: article.user })} ></Button>
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
        shadowColor: "#000", // Couleur de l'ombre
        shadowOffset: { width: 0, height: 3 }, // Décalage vertical de l'ombre
        shadowOpacity: 0.9, // Opacité de l'ombre
        shadowRadius: 4, // Flou de l'ombre
        elevation: 5, // Ajoute l'ombre sur Android
    
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
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonAchater: {
        backgroundColor: '#EDDC5F',
    },

})