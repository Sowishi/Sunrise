import Landing from "./screen/landing";
import Register from "./screen/register";
import "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./screen/login";
import Home from "./screen/home";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Thermal from "./screen/thermal";

export default function App() {
  const Stack = createStackNavigator();
  const Tab = createMaterialTopTabNavigator();

  function MainScreen() {
    return (
      <Tab.Navigator tabBarPosition="bottom">
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Thermal" component={Thermal} />
      </Tab.Navigator>
    );
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="landing" component={Landing} />
          <Stack.Screen name="register" component={Register} />
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="main" component={MainScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}
