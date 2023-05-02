import Landing from './screen/landing';
import Register from './screen/register';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';



import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screen/login';

export default function App() {

  const Stack = createStackNavigator()

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name='landing' component={Landing} />
          <Stack.Screen  name="register" component={Register} />
          <Stack.Screen  name="login" component={Login} />

        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
    
  );
}

