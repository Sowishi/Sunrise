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
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import Loader from "../components/loader";
import { Ionicons } from "@expo/vector-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const register = () => {
  //   const userRef = collection(db, "users");
  //   onSnapshot(userRef, (snapshot) => {
  //     const IDS = [];
  //     snapshot.forEach((doc) => {
  //       const user = doc.data();
  //       IDS.push(user.schoolID);
  //     });
  //     setIDS(IDS);
  //   });

  //   if (schoolID.length === 0) {
  //     showToast("error", "School ID must not be empty!");
  //   } else if (IDS.includes(schoolID)) {
  //     showToast("error", "School ID already registered");
  //   } else if (firstName.length === 0) {
  //     showToast("error", "First name must not be empty!");
  //   } else if (lastName.length === 0) {
  //     showToast("error", "Last name must not be empty!");
  //   } else if (gender.length === 0) {
  //     showToast("error", "Please select a gender!");
  //   } else if (course.length === 0) {
  //     showToast("error", "Please select a course!");
  //   } else if (yearLevel.length === 0) {
  //     showToast("error", "Please specify your year level!");
  //   } else if (password.length === 0) {
  //     showToast("error", "Password must not be empty!");
  //   } else if (password.length <= 5) {
  //     showToast("error", "Password must be greater than 5 characters!");
  //   } else if (password2.length === 0) {
  //     showToast("error", "Re-enter password is empty");
  //   } else if (password2 !== password) {
  //     showToast("error", "Your password did not match!");
  //   } else {
  //     setLoading(true);
  //     const data = {
  //       schoolID: schoolID,
  //       firstName: firstName,
  //       middleName,
  //       middleName,
  //       lastName,
  //       lastName,
  //       gender: gender,
  //       course: course,
  //       yearLevel: yearLevel,
  //       password: password,
  //       createdAt: serverTimestamp(),
  //       role: "client",
  //     };
  //     const userRef = collection(db, "users");
  //     addDoc(userRef, data).then(() => {
  //       setLoading(false);
  //       showToast("success", "Successfully Registered");
  //       navigation.navigate("login");
  //     });
  //   }
  // };

  const handleRegister = () => {
    console.log(email, password);
    try {
      createUserWithEmailAndPassword(auth, email.trim(), password.trim()).then(
        (res) => {
          showToast("success", "Successfully Registered!");
          navigation.navigate("login");
        }
      );
    } catch (error) {
      showToast("error", error.toString());
    }
  };

  return (
    <>
      {loading && <Loader />}

      <View style={{ flex: 1 }}>
        <StatusBar />
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
      </View>
      <Text
        style={{
          textAlign: "center",
          fontSize: 30,
          fontWeight: "bold",
          marginHorizontal: 20,
        }}
      >
        Register Now!
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
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          marginTop: 30,
        }}
      >
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
            bgColor={"#144F61"}
            navigation={navigation}
            event={handleRegister}
          />
        </View>
      </View>
    </>
  );
};

export default Register;
