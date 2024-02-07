import { View, Text, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import Button from "../components/button";
import { LinearGradient } from "expo-linear-gradient";
import LogoComponent from "../components/logoComponent";
import LineComponent from "../components/line";
import TitleComponent from "../components/titleComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useSmokeContext } from "../utils/smokeContext";

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
      <StatusBar backgroundColor={"#f16b00"} style="light" />
      <LinearGradient
        colors={["#FC6736", "#0C2D57"]}
        style={{
          flex: 1.5,
          paddingHorizontal: 15,
          paddingVertical: 30,
        }}
      >
        <View style={{ marginTop: 50 }}>
          <TitleComponent title={"SINFERNO"} noBG={true} />
          <Text
            style={{
              textAlign: "center",
              marginVertical: 10,
              color: "white",
            }}
          >
            Solar Innovated Network for Fire Emergency Response and Notification
            Optimization with IoT- based systems.
          </Text>
        </View>

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
              text="Go to login!"
              bgColor={"#0B60B0"}
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
              bgColor={"#232D3F"}
              navigation={navigation}
              event={() => navigation.navigate("register")}
              icon={"account-arrow-up"}
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default Landing;
