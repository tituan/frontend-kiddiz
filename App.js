import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HomeScreen from "./screens/HomeScreen";
import ConnectionScreen from "./screens/ConnectionScreen";
import SignUpScreen from "./screens/SignupScreen";
import SignInScreen from "./screens/SigninScreen";
import AddArticlesScreen from "./screens/AddArticlesScreen";
import ModifyArticleScreen from "./screens/ModifyArticleScreen";
import MyArticlesScreen from "./screens/MyArticlesScreen";
import ProfilScreen from "./screens/ProfilScreen";
import FavorisScreen from "./screens/FavorisScreen";
import ArticleScreen from "./screens/ArticleScreen";
import MessagerieScreen from "./screens/MessagerieScreen";
import SellerScreen from "./screens/SellerScreen";
import { useSelector } from "react-redux";
import { StyleSheet } from "react-native";
import TransactionsScreen from "./screens/TransactiosScreen";

// Redux
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/users';

const store = configureStore({
  reducer: { user },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ✅ TabNavigator bien défini
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Profil") iconName = "user";
          else if (route.name === "Messagerie") iconName = "envelope";
          else if (route.name === "Vendre") iconName = "plus";
          else if (route.name === "Home") iconName = "home";
          else if (route.name === "Favoris") iconName = "heart";

          return <FontAwesome name={iconName} size={35} color={color} />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "#F0F0F0",
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 13,
          fontFamily: 'Arial',
          fontWeight: "300",
        },
        tabBarStyle: {
          backgroundColor: '#E6C12E',
          height: 85,
          borderTopColor: 'black',
          borderTopWidth: 1,
          paddingBottom: 20,
          paddingTop: 10,
          shadowColor: 'black',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.25,
          shadowRadius: 3,
          elevation: 5,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favoris" component={FavorisScreen} />
      <Tab.Screen name="Vendre" component={AddArticlesScreen} />
      <Tab.Screen name="Messagerie" component={MessagerieScreen} /> 
      <Tab.Screen name="Profil" component={ProfilScreen} /> 
    </Tab.Navigator>
  );
};

// ✅ MainNavigator avec TabNavigator défini dans Stack
const MainNavigator = () => {
  const userToken = useSelector((state) => state.user.value.token);
  console.log("Token utilisateur :", userToken);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* HomeScreen seul si pas de token */}
      {!userToken ? (
        <Stack.Screen name="Home" component={HomeScreen} />
      ) : (
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      )}

      <Stack.Screen name="Connection" component={ConnectionScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="Vendre" component={AddArticlesScreen} />
            <Stack.Screen name="Modifier" component={ModifyArticleScreen} />
      <Stack.Screen name="Favoris" component={FavorisScreen} />
            <Stack.Screen name="MesArticles" component={MyArticlesScreen} />
      <Stack.Screen name="SellerScreen" component={SellerScreen} />
      <Stack.Screen name="ArticleScreen" component={ArticleScreen} />
      <Stack.Screen name="TransactionsScreen" component={TransactionsScreen} />

      {/* ✅ Ajouter TabNavigator ici pour qu'il soit accessible */}
      <Stack.Screen name="Tabs" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
