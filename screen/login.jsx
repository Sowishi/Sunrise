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
import { auth, db } from "../firebase";
import { showToast } from "../components/toast";
import Loader from "../components/loader";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    try {
      signInWithEmailAndPassword(auth, email.trim(), password.trim()).then(
        (res) => {
          navigation.navigate("home");
        }
      );
    } catch (error) {
      showToast("error", error.toString());
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {loading && <Loader />}
      <View
        style={{
          flex: 0.8,
          backgroundColor: "#f16b00",
          borderBottomLeftRadius: 150,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: 150, height: 150 }}
          source={require("../assets/logo.png")}
        />
      </View>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 10,
          backgroundColor: "white",
          paddingTop: 15,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 30,
            fontWeight: "bold",
            marginHorizontal: 20,
          }}
        >
          LOG IN TO OUR SMOKE DETECTOR
        </Text>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <View
            style={{ backgroundColor: "#FEB648", width: "80%", height: 5 }}
          ></View>
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
              borderRadius: 3,
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
              borderRadius: 3,
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
            bgColor={"#144F61"}
            navigation={navigation}
            event={handleLogin}
          />
        </View>
      </View>
    </View>
  );
};

export default Login;
