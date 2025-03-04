import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HomeScreen from "./screens/HomeScreen";
import ConnectionScreen from "./screens/ConnectionScreen";
import SignUpScreen from "./screens/SignupScreen";
import SignInScreen from "./screens/SigninScreen";
// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

// redux imports
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/users';


const store = configureStore({
  reducer: { user },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Profil") {
            iconName = "location-arrow";
          } else if (route.name === "Messagerie") {
            iconName = "map-pin";
          } else if (route.name === "AddArticles") {
            iconName = "map-pin";
          } else if (route.name === "Home") {
            iconName = "map-pin";
          }

          return <FontAwesome name={"home"} size="45" color={color} />;
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#335561",
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 13,
          fontFamily: 'Arial',
          fontWeight: 300,
        },
        tabBarStyle: {
          backgroundColor: 'rgba(34,193,195,1)', // Vert avec opacité 0.5
          height: 85,
          borderTopColor: 'black',
          borderTopWidth: 2,
        
          // Pour iOS
          shadowColor: 'black',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.25,
          shadowRadius: 3,
        
          // Pour Android
          elevation: 5,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      {/* <Tab.Screen name="Favoris" component={FavorisScreen} />
      <Tab.Screen name="AddArticles" component={AddArticlesScreen} />
      <Tab.Screen name="Messagerie" component={MessagerieScreen} />
      <Tab.Screen name="Profil" component={ProfilScreen} /> */}
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Connection" component={ConnectionScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
          </Stack.Navigator>
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
