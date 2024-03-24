import { View, Text, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import Button from "../components/button";
import { LinearGradient } from "expo-linear-gradient";
import LogoComponent from "../components/logoComponent";
import LineComponent from "../components/line";
import TitleComponent from "../components/titleComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useSmokeContext } from "../utils/appContext";
import LottieView from "lottie-react-native";

const Landing = ({ navigation }) => {
  const { updateAuth } = useSmokeContext();

  useEffect(() => {
    async function loadData() {
      const value = await AsyncStorage.getItem("user");
      const auth = JSON.parse(value);
      if (auth) {
        updateAuth(auth);
        navigation.navigate("main");
      }
    }
    loadData();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor={"#F7A200"} style="light" />

      <LinearGradient
        colors={["#F7A200", "#FCF2F6", "#EEF6FE"]}
        style={{
          flex: 1,
          paddingHorizontal: 15,
          paddingVertical: 30,
        }}
      >
        <View style={{ flex: 1 }}>
          <LottieView
            style={{
              width: "100%",
              height: "100%",
            }}
            autoPlay
            source={require("../assets/spaceship-up.json")}
          />
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 0.5,
          }}
        >
          <Text style={{ fontSize: 25, letterSpacing: 10, fontWeight: "bold" }}>
            SUNRISE
          </Text>
          <Text style={{ textAlign: "center", fontSize: 10 }}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta
            cupiditate ut, rerum deserunt nesciunt et facilis accusantium fugit
            eius at?
          </Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <Button
              icon="login"
              text="Continue"
              bgColor={"#F70000"}
              navigation={navigation}
              event={() => navigation.navigate("login")}
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default Landing;
