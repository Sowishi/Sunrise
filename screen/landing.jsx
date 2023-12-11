import { View, Text, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import Button from "../components/button";
import { LinearGradient } from "expo-linear-gradient";

const Landing = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar />
      <View
        style={{
          flex: 1,
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
          flex: 1.5,
          paddingHorizontal: 10,
          marginTop: 20,
          backgroundColor: "white",
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 40, fontWeight: "bold" }}>
          Title of the app
        </Text>
        <Text
          style={{
            textAlign: "center",
            marginVertical: 10,
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
          distinctio, quas officiis ratione nisi veritatis quod ab voluptatibus
          qui accusantium. Sunt neque harum recusandae iste temporibus tempora
          velit praesentium quae.
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
      </View>
    </View>
  );
};

export default Landing;
