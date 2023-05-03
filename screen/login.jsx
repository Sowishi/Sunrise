import { Image, ScrollView, StatusBar, Text, View } from "react-native";
import Input from "../components/input";
import Button from "../components/button";
import SelectDropdown from "react-native-select-dropdown";
import { useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { showToast } from "../components/toast";
import Loader from "../components/loader";
import { LinearGradient } from "expo-linear-gradient";

const Login = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [schoolID, setSchoolID] = useState("");
  const [password, setPassword] = useState("");

  const authenticate = () => {
    if (schoolID.length === 0) {
      showToast("error", "School ID must not be empty");
    } else if (password.length === 0) {
      showToast("error", "Password must not be empty");
    } else {
      setLoading(true);
      const userRef = collection(db, "users");
      onSnapshot(userRef, (snapshot) => {
        let hasUser = false;
        snapshot.forEach((doc) => {
          const user = doc.data();
          if (user.schoolID === schoolID && user.password === password) {
            navigation.navigate("home", { currentUser: user });
            setLoading(false);
            hasUser = true;
          }
        });
        if (!hasUser) {
          showToast("error", "Incorrect Password or SchoolID");
        }
        setLoading(false);
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {loading && <Loader />}
      <View
        style={{
          flex: 0.7,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 25,
          backgroundColor: "white",
          position: "relative",
        }}
      >
        <Image
          style={{ zIndex: 99, position: "absolute" }}
          source={require("../assets/laco-removebg-preview.png")}
          resizeMode="contain"
        />
        <LinearGradient
          colors={["#DDA033", "#0D97AC"]}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            right: 0,
            top: -20,
            opacity: 0.4,
          }}
        ></LinearGradient>
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
          LOG IN TO OUR LIBRARY SYSTEM
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
        <ScrollView
          style={{ marginTop: 20, marginHorizontal: 30 }}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <View style={{ marginVertical: 10 }}>
            <Input label="School ID" event={(text) => setSchoolID(text)} />
          </View>
          <View style={{ marginVertical: 10 }}>
            <Input
              label="Password"
              event={(text) => setPassword(text)}
              secured={true}
            />
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Button
              event={authenticate}
              text={"Log in"}
              bgColor={"#0D97AC"}
              icon={"login"}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Login;
