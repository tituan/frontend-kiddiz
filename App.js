import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HomeScreen from "./screens/HomeScreen";
import ConnectionScreen from "./screens/ConnectionScreen";
import SignUpScreen from "./screens/SignupScreen";
import SignInScreen from "./screens/SigninScreen";
import AddArticlesScreen from "./screens/AddArticlesScreen";
import ProfilScreen from "./screens/ProfilScreen";
// import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

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
            iconName = "user";
          } else if (route.name === "Messagerie") {
            iconName = "envelope";
          } else if (route.name === "Vendre") {
            iconName = "plus";
          } else if (route.name === "Home") {
            iconName = "home";
          }

          return <FontAwesome name={iconName} size={35} color={color} />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "#F0F0F0",
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 13,
          fontFamily: 'Arial',
          fontWeight: 300,
        },
        tabBarStyle: {
          backgroundColor: '#E6C12E', // Vert avec opacité 0.5
          height: 85,
          borderTopColor: 'black',
          borderTopWidth: 1,
          paddingBottom: 20,
          paddingTop:10,
        
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
      <Tab.Screen name="Vendre" component={AddArticlesScreen} />
      {/* {/* <Tab.Screen name="Favoris" component={FavorisScreen} />
      <Tab.Screen name="Messagerie" component={MessagerieScreen} /> */}
      <Tab.Screen name="Profil" component={ProfilScreen} /> 
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
