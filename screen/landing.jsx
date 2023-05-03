import { View, Text, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import Button from "../components/button";
import { LinearGradient } from "expo-linear-gradient";

const Landing = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar />
      <View style={{ flex: 1, position: "relative" }}>
        <Image
          style={{ width: "100%", height: "100%" }}
          source={require("../assets/landing.jpg")}
        />
        <LinearGradient
          colors={["#DDA033", "#0D97AC"]}
          style={{
            position: "absolute",
            width: 250,
            height: 250,
            borderRadius: 150,
            right: -50,
            top: -20,
            opacity: 0.4,
          }}
        ></LinearGradient>
      </View>
      <View
        style={{ flex: 1, paddingHorizontal: 10, backgroundColor: "white" }}
      >
        <Text style={{ textAlign: "center", fontSize: 40, fontWeight: "bold" }}>
          A new way to borrow books{" "}
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
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <Button
              icon="login"
              text="Log In"
              bgColor={"#0D97AC"}
              navigation={navigation}
              event={() => navigation.navigate("login")}
            />
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <Button
              text="Register"
              bgColor={"#E2532F"}
              navigation={navigation}
              event={() => navigation.navigate("register")}
              icon={"account-arrow-up"}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Landing;
