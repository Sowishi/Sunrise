import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  View,
  TextInput,
} from "react-native";
import Input from "../components/input";
import Button from "../components/button";
import SelectDropdown from "react-native-select-dropdown";
import { useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, database, db } from "../firebase";
import { showToast } from "../components/toast";
import Loader from "../components/loader";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import LogoComponent from "../components/logoComponent";
import LineComponent from "../components/line";
import TitleComponent from "../components/titleComponent";
import { useSmokeContext } from "../utils/appContext";

const Login = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { updateAuth } = useSmokeContext();

  const handleLogin = () => {
    let userFound = false;
    if (email.length <= 0 || password.length <= 0) {
      showToast("error", "email or password must not be empty");
    } else {
      onValue(ref(database, "/users"), (snapshot) => {
        snapshot.forEach((doc) => {
          const data = doc.val();
          if (data.email == email && data.password == password) {
            updateAuth({ ...data, id: doc.key });
            showToast("success", "login successfully!");
            navigation.navigate("main");
            userFound = true;
            return;
          }
        });
        if (!userFound) {
          showToast("error", "Invalid email or password!");
        }
      });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FAF5FC" }}>
      {loading && <Loader />}

      <LogoComponent />
      <StatusBar backgroundColor={"#1F91E4"} style="light" />
      <View
        style={{
          flex: 1.2,
          paddingHorizontal: 10,
          backgroundColor: "#FAF5FC",
          paddingTop: 15,
        }}
      >
        <TitleComponent titleColor={"black"} title={"Log in to SUNRICE"} />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <LineComponent />
        </View>
        <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 3,
              paddingHorizontal: 10,
              backgroundColor: "white",
              borderRadius: 10,
            }}
          >
            <Ionicons name="mail" size={24} color="#999999" />
            <TextInput
              onChangeText={(text) => setEmail(text)}
              placeholder="Email"
              style={{
                flex: 1,
                paddingVertical: 9,
                paddingHorizontal: 10,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 3,
              paddingHorizontal: 10,
              marginTop: 20,
              backgroundColor: "white",
              borderRadius: 10,
            }}
          >
            <Ionicons name="key" size={24} color="#999999" />
            <TextInput
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
              placeholder="Password"
              style={{
                flex: 1,
                paddingVertical: 9,
                paddingHorizontal: 10,
              }}
            />
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 30,
          }}
        >
          <Button
            icon="login"
            text="Login"
            bgColor={"#F70000"}
            navigation={navigation}
            event={handleLogin}
          />

          <Button
            text="Register"
            bgColor={"#344854"}
            navigation={navigation}
            event={() => navigation.navigate("register")}
          />
        </View>
      </View>
    </View>
  );
};

export default Login;
