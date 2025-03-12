import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, ScrollView, ActivityIndicator, Text, TouchableOpacity, Linking } from 'react-native';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { useIsFocused } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HeaderNavigation from './components/HeaderNavigation'; 
import ButtonBig from './components/ButtonBig';

const urlBackend = process.env.EXPO_PUBLIC_API_URL;

export default function FAQScreen({ navigation }) {
    const [articles, setArticles] = useState([]);
    const [openQuestionIndex, setOpenQuestionIndex] = useState(null);

    const scrollViewRef = useRef(null);
    const isFocused = useIsFocused();

    const userToken = useSelector(state => state.user.value.token);

    const [loaded, error] = useFonts({
        'LilitaOne-Regular': require('../assets/fonts/LilitaOne-Regular.ttf'),
        'RopaSans-Regular': require('../assets/fonts/RopaSans-Regular.ttf'),
    });

    // Action de scroll au focus
    useEffect(() => {
        if (isFocused && scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }
    }, [isFocused]);


    const toggleQuestion = (index) => {
        setOpenQuestionIndex(openQuestionIndex === index ? null : index);
    };

    const faqData = [
        {
            question: "1. Comment fonctionne l’application ?",
            answer: "Notre application permet aux particuliers d’acheter et de vendre des jouets d’occasion en toute simplicité...",
        },
        {
            question: "2. Comment mettre un jouet en vente ?",
            answer: "Clique sur 'Vendre un jouet', ajoute des photos, une description, fixe ton prix et publie ton annonce...",
        },
        {
            question: " 3. Comment se passent les paiements ?",
            answer: " Les paiements sont sécurisés et gérés via notre plateforme. L’acheteur paie directement sur l’application, et le vendeur reçoit l’argent une fois la transaction finalisée.",
        },
        {
            question: " 4. Comment sont gérés les frais de livraison ? ",
            answer: " L’acheteur paie généralement les frais de livraison, qui sont calculés en fonction du poids et de la taille du colis. Une étiquette prépayée peut être générée directement via l’application pour simplifier l’envoi. ",
        },
        {
            question: " 5. Puis-je proposer une remise en main propre ? ",
            answer: " Oui ! Lors de la mise en vente, tu peux indiquer si tu acceptes une remise en main propre. Les acheteurs proches de chez toi pourront alors venir récupérer leur jouet directement. ",
        },
        {
            question: " 6. Que faire si je ne reçois pas mon achat ?",
            answer: " Si tu n’as pas reçu ton colis dans le délai prévu, tu peux signaler un problème via l’application. Si le vendeur ne fournit pas de preuve d’envoi, l’argent te sera remboursé. ",
        },
        {
            question: " 7. Que faire si le jouet reçu ne correspond pas à l’annonce ? ",
            answer: " Si l’article est endommagé ou ne correspond pas à la description, tu peux ouvrir un litige dans les 48 heures suivant la réception pour demander un remboursement. ",
        },
        {
            question: " 8. Quels types de jouets puis-je vendre ? ",
            answer: " Tu peux vendre des jouets d’occasion en bon état, comme des jeux de société, des figurines, des peluches, ou encore des jouets éducatifs. Les jouets cassés ou dangereux ne sont pas autorisés. ",
        },
        
    ];



    const openMailApp = () => {
        const email = 'kiddizproject25@gmail.com';
        const subject = 'Sujet de votre message';
        const body = 'Écrivez ici votre message: ';
    
        const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
        Linking.openURL(url).catch(err => console.error('Erreur lors de l\'ouverture de l\'application mail:', err));
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['rgba(34,193,195,1)', 'rgba(253,187,45,1)']}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={styles.header}
            >
                <HeaderNavigation onPress={() => navigation.navigate("Connection")} />
            </LinearGradient>
            <ScrollView ref={scrollViewRef} contentContainerStyle={styles.contentContainer}>
                <View style={styles.container}>
                    {faqData.map((item, index) => (
                        <View key={index}>
                            <TouchableOpacity onPress={() => toggleQuestion(index)} style={styles.questionContainer}>
                                <Text style={styles.question}>{item.question}</Text>
                                <FontAwesome
                                    name={openQuestionIndex === index ? "chevron-up" : "chevron-down"}
                                    size={14}
                                    color="white"
                                    style={styles.icon}
                                />
                            </TouchableOpacity>
                            {openQuestionIndex === index && (
                                <Text style={styles.answer}>{item.answer} </Text>
                            )}
                        </View>
                    ))}
                </View>
                <ButtonBig style={styles.buttonContact} text="Nous contacter" onPress={openMailApp} />
            </ScrollView>
            
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 20,
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.9,
        shadowRadius: 4,
        elevation: 5,
    },
    questionContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        backgroundColor: '#00CC99',
        
    },
    question: {  
        fontFamily: 'RopaSans-Regular',
        fontSize: 18,
        fontWeight: 'bold',
        color:'white',
        paddingVertical: 5,
    },
    answer: {  
        fontFamily: 'RopaSans-Regular',
        fontSize: 18,
        padding: 20,
    },
    icon: {
        marginLeft: 10,
    },
    buttonContact: {
        backgroundColor: '#4478A9',
        marginTop: 30,
        marginBottom: 40,
        paddingHorizontal: 10, 
        alignSelf: 'center', 
        maxWidth: 350, 
      },
});