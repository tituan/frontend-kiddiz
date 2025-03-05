import { StyleSheet, View, ScrollView, FlatList, ActivityIndicator,} from 'react-native';
import React, { useEffect, useState } from "react";
import HeaderNavigation from './components/HeaderNavigation'; 
import { LinearGradient } from 'expo-linear-gradient'
import WelcomeHome from './components/WelcomeHome'
import Article from './components/Article';


export default function HomeScreen({ navigation }) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log(articles)

    useEffect(() => {
        // Remplace l'URL par celle de ton backend
        const fetchArticles = async () => {
        try {
            const response = await fetch("http://192.168.1.134:3000/articles/popular");
            const data = await response.json();
            setArticles(data.article); // Stocke les articles dans l'état
        } catch (error) {
            console.error("Erreur lors de la récupération des articles:", error);
        } finally {
            setLoading(false); // Arrête le chargement
        }
        };

        fetchArticles();
    }, []);

    if (loading) {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
        );
      }

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
        <WelcomeHome navigation={navigation}/>  
             <View style={styles.row}> 
                {articles.map((item, i) => (
                   <Article key={item.id} item={item} />
                ))}
                {/* <Article style={styles.articleContainer}/>
                <Article style={styles.articleContainer}/>
                <Article style={styles.articleContainer}/>
                <Article style={styles.articleContainer}/>
                <Article style={styles.articleContainer}/>
                <Article style={styles.articleContainer}/>
                <Article style={styles.articleContainer}/>
                <Article style={styles.articleContainer}/>
                <Article style={styles.articleContainer}/> */}
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

})


// import React, { useEffect, useState } from "react";
// import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";

// const ArticlesScreen = () => {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Remplace l'URL par celle de ton backend
//     const fetchArticles = async () => {
//       try {
//         const response = await fetch("https://ton-backend.com/api/articles");
//         const data = await response.json();
//         setArticles(data); // Stocke les articles dans l'état
//       } catch (error) {
//         console.error("Erreur lors de la récupération des articles:", error);
//       } finally {
//         setLoading(false); // Arrête le chargement
//       }
//     };

//     fetchArticles();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#007AFF" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={articles}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.article}>
//             <Text style={styles.title}>{item.title}</Text>
//             <Text style={styles.content}>{item.content}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: "#fff",
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   article: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   content: {
//     fontSize: 14,
//     color: "#555",
//   },
// });

// export default ArticlesScreen;
