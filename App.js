import Landing from './screen/landing';
import Register from './screen/register';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screen/login';
import Home from './screen/home';
import Qrcode from './screen/qrcode';
import QrcodeScanner from './screen/qrcode-scanner';
import AddBorrowedBooks from './screen/addBorrowedBooks';
import ViewAll from './screen/viewAll';
import ViewBook from './screen/viewBook';
import ScanBook from './screen/scan-book';

export default function App() {

  const Stack = createStackNavigator()

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name='landing' component={Landing} />
          <Stack.Screen  name="register" component={Register} />
          <Stack.Screen  name="login" component={Login} />
          <Stack.Screen  name="home" component={Home} />
          <Stack.Screen  name="qrcode" component={Qrcode} />
          <Stack.Screen  name="qrcode-scanner" component={QrcodeScanner} />
          <Stack.Screen  name="add-borrowed-books" component={AddBorrowedBooks} />
          <Stack.Screen  name="view-all" component={ViewAll} />
          <Stack.Screen  name="scan-book" component={ScanBook} />

          <Stack.Screen  name="view-book" component={ViewBook} />

        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
    
  );
}

