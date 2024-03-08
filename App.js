import Landing from "./screen/landing";
import Register from "./screen/register";
import "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./screen/login";
import Home from "./screen/home";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Entypo } from "@expo/vector-icons";
import About from "./screen/about";
import { MyProvider } from "./utils/appContext";

export default function App() {
  const Stack = createStackNavigator();
  const Tab = createMaterialTopTabNavigator();

  function MainScreen() {
    return (
      <Tab.Navigator
        tabBarPosition="bottom"
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "white",
          },
          tabBarIndicatorStyle: {
            backgroundColor: "#f16b00",
            height: 3,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: () => <Entypo name="home" size={24} color="#001F47" />,
            tabBarShowLabel: false,
          }}
        />

        <Tab.Screen
          name="About"
          component={About}
          options={{
            tabBarIcon: () => <Entypo name="info" size={24} color="#001F47" />,
            tabBarShowLabel: false,
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <>
      <MyProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="landing" component={Landing} />
            <Stack.Screen name="register" component={Register} />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="main" component={MainScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </MyProvider>

      <Toast />
    </>
  );
}
