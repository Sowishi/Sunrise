//Other Imports
import Toast from "react-native-toast-message";
import { MyProvider } from "./utils/appContext";

//Navigator

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

//Icons

import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

//Screens

import Login from "./screen/login";
import Home from "./screen/home";
import Control from "./screen/control";
import Landing from "./screen/landing";
import Register from "./screen/register";
import About from "./screen/about";

export default function App() {
  const Stack = createStackNavigator();
  const Tab = createMaterialTopTabNavigator();

  function MainScreen() {
    return (
      <Tab.Navigator
        tabBarBounces={true}
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
          name="Joystick"
          component={Control}
          options={{
            tabBarIcon: () => (
              <MaterialIcons name="control-camera" size={24} color="#001F47" />
            ),
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
