import { Image, ScrollView, StatusBar, Text, View } from "react-native";
import Input from "../components/input";
import Button from "../components/button";
import SelectDropdown from "react-native-select-dropdown";
import { useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { showToast } from "../components/toast";
import Loader from "../components/loader";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [schoolID, setSchoolID] = useState("");
  const [password, setPassword] = useState("");

  const authenticate = () => {
    if (schoolID.length === 0) {
      showToast("error", "School ID must not be empty");
    } else if (schoolID.length === 0) {
      showToast("error", "Password must not be empty");
    } else {
      setLoading(true);
      const userRef = collection(db, "users");
      onSnapshot(userRef, (snapshot) => {
        snapshot.forEach((doc) => {
          const user = doc.data();
          if (user.schoolID === schoolID && user.password === password) {
            console.log(user);
            setLoading(false);
          }
        });
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {loading && <Loader />}
      <StatusBar backgroundColor={"white"} />
      <View
        style={{
          flex: 0.7,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 25,
          backgroundColor: "white",
        }}
      >
        <Image
          style={{ backgroundColor: "white" }}
          source={require("../assets/laco.png")}
          resizeMode="contain"
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
            <Input label="Password" event={(text) => setPassword(text)} />
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
