import { View, Text, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import Button from "../components/button";
import { LinearGradient } from "expo-linear-gradient";
import LogoComponent from "../components/logoComponent";
import LineComponent from "../components/line";
import TitleComponent from "../components/titleComponent";
import LottieView from "lottie-react-native";
import { useSmokeContext } from "../utils/smokeContext";

const About = ({ navigation }) => {
  const { smoke, updateData } = useSmokeContext();

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar
        backgroundColor={smoke ? "#B40001" : "#f16b00"}
        style="light"
      />
      <LinearGradient
        colors={["#FC6736", "#0C2D57"]}
        style={{
          flex: 1.5,
          paddingHorizontal: 15,
          paddingVertical: 30,
        }}
      >
        <View style={{ marginTop: 50 }}>
          <TitleComponent title={"Sinferno VPHS"} noBG={true} />
          <Text
            style={{
              textAlign: "center",
              marginVertical: 10,
              color: "white",
            }}
          >
            Solar Innovated Network for Fire Emergency Response and Notification
            Optimization with IoT- based systems
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
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LottieView
            autoPlay
            style={{
              width: 350,
              height: 400,
              borderWidth: 1,
            }}
            source={require("../assets/team.json")}
          />
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Button
            navigation={navigation}
            event={() => navigation.navigate("login")}
            icon="login"
            text="Log out"
            bgColor={"#0B60B0"}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

export default About;
