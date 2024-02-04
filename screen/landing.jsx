import { View, Text, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import Button from "../components/button";
import { LinearGradient } from "expo-linear-gradient";
import LogoComponent from "../components/logoComponent";

const Landing = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <LinearGradient
        colors={["#0F0F0F", "#005B41", "#008170"]}
        style={{
          flex: 1.5,
          paddingHorizontal: 15,
          paddingVertical: 30,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 40,
            fontWeight: "bold",
          }}
        >
          Smoke Detector
        </Text>
        <Text
          style={{
            textAlign: "center",
            marginVertical: 10,
            color: "white",
          }}
        >
          Experience peace of mind with our Smoke Detector — providing early
          warnings for swift actions. Safeguard your space with advanced
          detection technology, ensuring a rapid response to potential fire
          hazards. Your safety is our priority
        </Text>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <View
            style={{ backgroundColor: "#008170", width: "80%", height: 5 }}
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
              text="Go to login!"
              bgColor={"#144F61"}
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
      </LinearGradient>
    </View>
  );
};

export default Landing;
