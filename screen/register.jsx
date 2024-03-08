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
import { showToast } from "../components/toast";
import { auth, database, db } from "../firebase";
import Loader from "../components/loader";
import { Ionicons } from "@expo/vector-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { child, get, onValue, push, ref, on } from "firebase/database";
import LogoComponent from "../components/logoComponent";
import LineComponent from "../components/line";
import TitleComponent from "../components/titleComponent";

const Register = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const usersRef = ref(database, "/users");

  const handleRegister = async () => {
    if (email.length <= 0) {
      showToast("error", "Invalid Email!");
      return;
    }

    if (password.length <= 0) {
      showToast("error", "Password is empty!");
      return;
    }

    const emailExist = await checkIfUserExists(email);
    if (emailExist) {
      showToast("error", "Email Already exist!");
    } else {
      push(usersRef, { email: email, password: password, uid: 23 }).then(
        (res) => {
          showToast("success", "You can now login!");
          navigation.navigate("login");
        }
      );
    }
  };

  const checkIfUserExists = async (email) => {
    let isEmail = false;

    onValue(usersRef, (snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.val();
        if (data.email == email) {
          console.log(data.email, email);
          isEmail = true;
        }
      });
    });
    return isEmail;
  };

  return (
    <>
      {loading && <Loader />}

      <View style={{ flex: 1, backgroundColor: "#FAF5FC" }}>
        <StatusBar backgroundColor={"#4C3488"} style="light" />
        <LogoComponent />
      </View>
      <TitleComponent title={"Register"} titleColor={"black"} />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <LineComponent />
      </View>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          backgroundColor: "#FAF5FC",
        }}
      >
        <View
          style={{
            marginTop: 30,
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
            onChangeText={(text) => setPassword(text)}
            placeholder="Password"
            style={{
              flex: 1,
              paddingVertical: 9,
              paddingHorizontal: 10,
            }}
          />
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
            text="Register"
            bgColor={"#0B60B0"}
            navigation={navigation}
            event={handleRegister}
          />
        </View>
      </View>
    </>
  );
};

export default Register;
